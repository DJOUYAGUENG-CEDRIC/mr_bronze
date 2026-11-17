import path from "node:path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Un package-lock.json traîne dans le dossier parent (djeson_pro/), ce qui fait
  // croire à Turbopack que la racine du projet est le parent. Résultat : des chemins
  // du type [project]/mr_bronze_prono/node_modules/... et un React Client Manifest
  // incohérent. On force la racine sur ce dossier.
  turbopack: {
    root: path.resolve(),
  },
};

export default nextConfig;
