"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Flame, Github } from "lucide-react";
import { useEffect, useState } from "react";
import { GitHubCalendar } from "react-github-calendar";
import { useTheme } from "next-themes";

interface Repo {
  id: number;
  name: string;
  description: string;
  html_url: string;
  language: string;
  stargazers_count: number;
  forks_count: number;
  updated_at: string;
  created_at: string;
}

interface GithubStats {
  public_repos: number;
  followers: number;
  avatar_url: string;
  login: string;
}

export default function Projects() {
  const [repos, setRepos] = useState<Repo[]>([]);
  const [stats, setStats] = useState<GithubStats | null>(null);
  const [loading, setLoading] = useState(true);
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [streak] = useState(12);

  useEffect(() => {
    setMounted(true);
    
    fetch("https://api.github.com/users/grssalex")
      .then((res) => res.json())
      .then((data) => setStats(data))
      .catch(console.error);

    fetch("https://api.github.com/users/grssalex/repos?sort=updated&per_page=6")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setRepos(data.filter(r => !r.fork));
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch repos", err);
        setLoading(false);
      });
  }, []);

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
                  {stats ? stats.followers : "-"}
                </h4>
                <p className="text-xs text-[#666666] dark:text-[#888888]">Abonnés</p>
              </div>
            </div>
            
            <div className="mt-auto pt-6 border-t border-[#EAEAEA] dark:border-[#222222]">
              <div className="flex items-center justify-between mb-4">
                <p className="text-xs font-medium text-[#111111] dark:text-[#EDEDED]">Activité</p>
                <div className="flex items-center gap-1 text-xs text-orange-500">
                  <Flame className="w-3 h-3" /> {streak}j
                </div>
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

        <div className="lg:col-span-9 flex flex-col gap-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {loading ? (
              [...Array(6)].map((_, i) => (
                <div key={i} className="bg-[#F9F9F9] dark:bg-[#111111] rounded-2xl h-36 animate-pulse border border-[#EAEAEA] dark:border-[#222222]" />
              ))
            ) : (
              repos.map((repo, index) => (
                <motion.a
                  href={repo.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  key={repo.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className="group flex flex-col p-4 rounded-2xl bg-white dark:bg-[#0A0A0A] border border-[#EAEAEA] dark:border-[#222222] hover:border-[#CCCCCC] dark:hover:border-[#444444] transition-colors"
                >
                  <h3 className="font-medium text-sm text-[#111111] dark:text-[#EDEDED] group-hover:text-blue-500 transition-colors truncate mb-2">
                    {repo.name}
                  </h3>
                  <p className="text-xs text-[#666666] dark:text-[#888888] font-light line-clamp-2 mb-4 flex-1">
                    {repo.description || "Aucune description."}
                  </p>
                  {repo.language && (
                    <span className="text-[10px] font-mono text-[#666666] dark:text-[#888888]">
                      {repo.language}
                    </span>
                  )}
                </motion.a>
              ))
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
