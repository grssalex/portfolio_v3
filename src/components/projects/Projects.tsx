"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Flame, Github, Star, GitFork } from "lucide-react";
import { useEffect, useState } from "react";
import { GitHubCalendar } from "react-github-calendar";
import { useTheme } from "next-themes";

interface Repo {
  id: number;
  name: string;
  description: string;
  html_url: string;
  language: string;
  languages_url: string; // Ajout de l'URL pour fetch les langages
  stargazers_count: number;
  forks_count: number;
  updated_at: string;
  created_at: string;
  topics: string[];
  languages?: string[]; // Pour stocker les 3 langages principaux
}

interface GithubStats {
  public_repos: number;
  followers: number;
  avatar_url: string;
  login: string;
  created_at: string;
}

// Fonction pour déterminer le statut du repo
const getRepoStatus = (createdAt: string, updatedAt: string) => {
  const now = new Date();
  const created = new Date(createdAt);
  const updated = new Date(updatedAt);
  
  const daysSinceCreation = Math.floor((now.getTime() - created.getTime()) / (1000 * 3600 * 24));
  const daysSinceUpdate = Math.floor((now.getTime() - updated.getTime()) / (1000 * 3600 * 24));

  // Nouveau : créé dans les 5 derniers jours
  if (daysSinceCreation <= 5) return { label: "Nouveau", color: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20" };
  
  // Mis à jour : modifié dans les 3 derniers jours (et pas "Nouveau")
  if (daysSinceUpdate <= 3) return { label: "Mis à jour", color: "bg-blue-500/10 text-blue-500 border-blue-500/20" };
  
  return null;
};

const languageColors: Record<string, string> = {
  TypeScript: "#3178c6",
  JavaScript: "#f1e05a",
  Python: "#3572A5",
  HTML: "#e34c26",
  CSS: "#563d7c",
  Vue: "#41b883",
  "Jupyter Notebook": "#DA5B0B",
  Shell: "#89e051",
  Dockerfile: "#384d54",
  Go: "#00ADD8",
  Rust: "#dea584",
  Java: "#b07219",
  C: "#555555",
  "C++": "#f34b7d",
  Ruby: "#701516",
  PHP: "#4F5D95",
  Swift: "#F05138",
  Kotlin: "#A97BFF",
};

export default function Projects() {
  const [repos, setRepos] = useState<Repo[]>([]);
  const [stats, setStats] = useState<GithubStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [showAll, setShowAll] = useState(false);
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    
    // Utiliser un cache local pour éviter le rate limit en dev
    const CACHE_KEY = "github_portfolio_data";
    const CACHE_TIME = 1000 * 60 * 60; // 1 heure
    
    const cachedData = localStorage.getItem(CACHE_KEY);
    if (cachedData) {
      try {
        const { stats: cachedStats, repos: cachedRepos, timestamp } = JSON.parse(cachedData);
        if (Date.now() - timestamp < CACHE_TIME) {
          setStats(cachedStats);
          setRepos(cachedRepos);
          setLoading(false);
          return;
        }
      } catch (e) {
        console.error("Cache parsing error", e);
      }
    }

    const fetchData = async () => {
      try {
        const statsRes = await fetch("https://api.github.com/users/grssalex");
        if (!statsRes.ok) throw new Error("API limit");
        const statsData = await statsRes.json();
        setStats(statsData);

        const reposRes = await fetch("https://api.github.com/users/grssalex/repos?sort=updated&per_page=30");
        if (!reposRes.ok) throw new Error("API limit");
        const reposData = await reposRes.json();

        if (Array.isArray(reposData)) {
          const validRepos = reposData.filter(r => !r.fork);
          
          const reposWithLanguages = await Promise.all(
            validRepos.map(async (repo) => {
              try {
                const langRes = await fetch(repo.languages_url);
                if (!langRes.ok) throw new Error("API limit");
                const langData = await langRes.json();
                const topLanguages = Object.keys(langData)
                  .sort((a, b) => langData[b] - langData[a])
                  .slice(0, 3);
                
                return {
                  ...repo,
                  languages: topLanguages.length > 0 ? topLanguages : (repo.language ? [repo.language] : [])
                };
              } catch {
                return {
                  ...repo,
                  languages: repo.language ? [repo.language] : []
                };
              }
            })
          );
          
          setRepos(reposWithLanguages);
          
          // Sauvegarder dans le cache
          localStorage.setItem(CACHE_KEY, JSON.stringify({
            stats: statsData,
            repos: reposWithLanguages,
            timestamp: Date.now()
          }));
        }
        setLoading(false);
      } catch (err) {
        console.error("Failed to fetch repos", err);
        // Si on a une erreur mais qu'on a du cache expiré, on l'utilise quand même
        if (cachedData) {
          const { stats: cachedStats, repos: cachedRepos } = JSON.parse(cachedData);
          setStats(cachedStats);
          setRepos(cachedRepos);
        } else {
          setError(true);
        }
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // On limite l'affichage à 6 repos par défaut, ou tous si showAll est true
  const displayedRepos = showAll ? repos : repos.slice(0, 6);

  return (
    <section id="projets" className="py-24 border-t border-[#EAEAEA] dark:border-[#222222]">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="mb-12 flex items-end justify-between"
      >
        <div>
          <h2 className="text-2xl font-medium text-[#111111] dark:text-[#EDEDED] mb-2">
            Projets & Dépôts
          </h2>
          <p className="text-[#666666] dark:text-[#888888] font-light">
            Vue d'ensemble de mon activité GitHub.
          </p>
        </div>
        <a
          href="https://github.com/grssalex"
          target="_blank"
          rel="noopener noreferrer"
          className="hidden sm:flex group items-center gap-1 text-sm text-[#666666] dark:text-[#888888] hover:text-[#111111] dark:hover:text-[#EDEDED] transition-colors"
        >
          Voir tout sur GitHub
          <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </a>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        
        {/* Colonne de gauche : Profil & Stats (Plus fine : 3 colonnes) */}
        <motion.div 
          initial={{ opacity: 0, x: -10 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="lg:col-span-3 flex flex-col gap-4"
        >
          <div className="p-5 rounded-2xl bg-[#F9F9F9] dark:bg-[#111111] border border-[#EAEAEA] dark:border-[#222222] flex flex-col sticky top-24">
            <div className="flex items-center gap-4 mb-6">
              {stats?.avatar_url ? (
                <img 
                  src={stats.avatar_url} 
                  alt="GitHub Avatar" 
                  className="w-12 h-12 rounded-full border border-[#EAEAEA] dark:border-[#333333]"
                />
              ) : (
                <div className="w-12 h-12 rounded-full bg-gray-200 dark:bg-gray-800 animate-pulse" />
              )}
              <div>
                <h3 className="text-base font-medium text-[#111111] dark:text-[#EDEDED]">
                  @{stats?.login || "grssalex"}
                </h3>
                <div className="flex items-center gap-1 text-xs text-[#666666] dark:text-[#888888]">
                  <Github className="w-3 h-3" />
                  <span>GitHub</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 mb-6">
              <div className="bg-white dark:bg-[#0A0A0A] p-3 rounded-xl border border-[#EAEAEA] dark:border-[#222222]">
                <h4 className="text-xl font-bold text-[#111111] dark:text-[#EDEDED]">
                  {stats ? stats.public_repos : "-"}
                </h4>
                <p className="text-xs text-[#666666] dark:text-[#888888]">Dépôts</p>
              </div>
              <div className="bg-white dark:bg-[#0A0A0A] p-3 rounded-xl border border-[#EAEAEA] dark:border-[#222222]">
                <h4 className="text-xl font-bold text-[#111111] dark:text-[#EDEDED]">
                  {stats ? new Date().getFullYear() - new Date(stats.created_at).getFullYear() : "-"}
                </h4>
                <p className="text-xs text-[#666666] dark:text-[#888888]">Années d'exp.</p>
              </div>
            </div>
            
            <div className="mt-auto pt-6 border-t border-[#EAEAEA] dark:border-[#222222]">
              <div className="flex items-center justify-between mb-4">
                <p className="text-xs font-medium text-[#111111] dark:text-[#EDEDED]">Activité</p>
              </div>
              <div className="w-full overflow-hidden flex justify-center -ml-2">
                {mounted && (
                  <GitHubCalendar 
                    username="grssalex" 
                    colorScheme={resolvedTheme === "dark" ? "dark" : "light"}
                    fontSize={10}
                    blockSize={8}
                    blockMargin={3}
                  />
                )}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Grille des Repos (Plus large : 9 colonnes, affichage dense) */}
        <div className="lg:col-span-9 flex flex-col gap-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {loading ? (
              [...Array(6)].map((_, i) => (
                <div key={i} className="bg-[#F9F9F9] dark:bg-[#111111] rounded-2xl h-36 animate-pulse border border-[#EAEAEA] dark:border-[#222222]" />
              ))
            ) : error || repos.length === 0 ? (
              <div className="col-span-full flex flex-col items-center justify-center py-12 text-center">
                <p className="text-sm text-[#666666] dark:text-[#888888] mb-3">
                  Impossible de charger les repos pour le moment.
                </p>
                <a
                  href="https://github.com/grssalex"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-medium text-[#111111] dark:text-[#EDEDED] border border-[#EAEAEA] dark:border-[#222222] px-4 py-2 rounded-lg hover:bg-[#F5F5F5] dark:hover:bg-[#111111] transition-colors"
                >
                  Voir sur GitHub
                </a>
              </div>
            ) : (
              displayedRepos.map((repo, index) => {
                const status = getRepoStatus(repo.created_at, repo.updated_at);

                return (
                  <motion.a
                    href={repo.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    key={repo.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: (index % 6) * 0.05 }}
                    className="group flex flex-col p-4 rounded-2xl bg-white dark:bg-[#0A0A0A] border border-[#EAEAEA] dark:border-[#222222] hover:border-[#CCCCCC] dark:hover:border-[#444444] transition-colors relative"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-medium text-sm text-[#111111] dark:text-[#EDEDED] group-hover:text-blue-500 transition-colors truncate pr-2">
                        {repo.name}
                      </h3>
                      {status && (
                        <span className={`text-[10px] px-2 py-0.5 rounded-full border ${status.color} whitespace-nowrap`}>
                          {status.label}
                        </span>
                      )}
                    </div>
                    
                    <p className="text-xs text-[#666666] dark:text-[#888888] font-light line-clamp-2 mb-4 flex-1">
                      {repo.description || "Aucune description."}
                    </p>
                    
                  <div className="flex items-center gap-3 mt-auto pt-3 border-t border-[#EAEAEA]/50 dark:border-[#222222]/50">
                    <div className="flex flex-wrap gap-1.5">
                      {repo.languages?.map((lang) => (
                          <span key={lang} className="flex items-center gap-1.5 text-[10px] font-mono text-[#666666] dark:text-[#888888] bg-[#F5F5F5] dark:bg-[#111111] px-1.5 py-0.5 rounded">
                            <span
                              className="w-2 h-2 rounded-full shrink-0"
                              style={{ backgroundColor: languageColors[lang] || "#8b8b8b" }}
                            />
                            {lang}
                          </span>
                        ))}
                    </div>
                    
                    <div className="flex items-center gap-2 ml-auto text-[#666666] dark:text-[#888888]">
                        {repo.stargazers_count > 0 && (
                          <span className="flex items-center gap-0.5 text-[10px]">
                            <Star className="w-3 h-3" /> {repo.stargazers_count}
                          </span>
                        )}
                        {repo.forks_count > 0 && (
                          <span className="flex items-center gap-0.5 text-[10px]">
                            <GitFork className="w-3 h-3" /> {repo.forks_count}
                          </span>
                        )}
                      </div>
                    </div>
                  </motion.a>
                );
              })
            )}
          </div>

          {/* Bouton "Voir plus" si on a plus de 6 repos */}
          {!loading && repos.length > 6 && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex justify-center mt-4"
            >
              <button
                onClick={() => setShowAll(!showAll)}
                className="px-6 py-2 text-sm font-medium text-[#111111] dark:text-[#EDEDED] bg-white dark:bg-[#0A0A0A] border border-[#EAEAEA] dark:border-[#222222] rounded-full hover:bg-[#F5F5F5] dark:hover:bg-[#111111] transition-colors"
              >
                {showAll ? "Voir moins" : `Voir tous les projets (${repos.length})`}
              </button>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}
