import {
  siClaude,
  siDocker,
  siFastapi,
  siGithubactions,
  siGitlab,
  siGoogle,
  siGooglebigquery,
  siGooglecloud,
  siGooglegemini,
  siLanggraph,
  siLinux,
  siLooker,
  siModelcontextprotocol,
  siN8n,
  siNextdotjs,
  siNginx,
  siNotebooklm,
  siPortainer,
  siPostgresql,
  siPython,
  siRaspberrypi,
  siReact,
  siSap,
  siTailwindcss,
  siTypescript,
  siUptimekuma,
  siWireguard,
} from "simple-icons";

const icons = {
  bigquery: siGooglebigquery,
  claude: siClaude,
  docker: siDocker,
  fastapi: siFastapi,
  gemini: siGooglegemini,
  githubactions: siGithubactions,
  gitlab: siGitlab,
  google: siGoogle,
  googlecloud: siGooglecloud,
  langgraph: siLanggraph,
  linux: siLinux,
  looker: siLooker,
  mcp: siModelcontextprotocol,
  n8n: siN8n,
  nextjs: siNextdotjs,
  nginx: siNginx,
  notebooklm: siNotebooklm,
  portainer: siPortainer,
  postgresql: siPostgresql,
  python: siPython,
  raspberrypi: siRaspberrypi,
  react: siReact,
  sap: siSap,
  tailwind: siTailwindcss,
  typescript: siTypescript,
  uptimekuma: siUptimekuma,
  wireguard: siWireguard,
} as const;

export type TechKey = keyof typeof icons;

export function TechIcon({ name, className = "w-3 h-3" }: { name?: TechKey; className?: string }) {
  if (!name) return null;
  return (
    <svg viewBox="0 0 24 24" className={`${className} shrink-0`} fill="currentColor" aria-hidden="true">
      <path d={icons[name].path} />
    </svg>
  );
}
