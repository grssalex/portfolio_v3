# Portfolio V3

## Description

Portfolio V3 mon portfolio personnel créé avec Next.js et Tailwind CSS.
( Des petits easter eggs existent pour les curieux )

## Technologies utilisées

- Next.js
- Tailwind CSS
- React
- TypeScript
- Framer Motion
- Lucide React
- Simple Icons

## Déploiement

Chaque push sur `main` déclenche `.github/workflows/deploy.yml` :

1. GitHub Actions vérifie (tsc + eslint) et build le site en export statique (`dist/`).
2. Le build est publié sur la branche `deploy`.
3. Sur le Raspberry Pi, un timer systemd (`portfolio-deploy.timer`, toutes les minutes) compare le commit de `deploy` avec la version en ligne et, s'il a changé, synchronise les fichiers dans `/srv/static/portfolio/dist`, servi par nginx.

Aucun port entrant ni secret n'est nécessaire : le Pi ne fait que lire le dépôt public.