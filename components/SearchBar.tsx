"use client"; // Obligatoire car on utilise du state (interactivité)

import { useState } from "react";
import Link from "next/link";

// On définit ce qu'est un article pour TypeScript
interface Article {
  id: string;
  title: string;
  url: string;
}

export default function SearchBar({ articles }: { articles: Article[] }) {
  const [query, setQuery] = useState("");

  // Filtrage en temps réel : on compare le titre avec la saisie (en minuscules)
  const filteredArticles =
    query === ""
      ? []
      : articles
          .filter((article) =>
            article.title.toLowerCase().includes(query.toLowerCase())
          )
          .slice(0, 5); // On limite à 5 résultats pour faire "menu de suggestion"

  return (
    <div className="relative w-full max-w-sm">
      {/* Champ de saisie */}
      <input
        type="text"
        placeholder="Rechercher sur Wikipédia"
        className="w-full border border-gray-300 px-4 py-1.5 focus:outline-none focus:border-blue-500 text-sm"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      {/* Liste des suggestions (s'affiche seulement s'il y a une recherche) */}
      {filteredArticles.length > 0 && (
        <ul className="absolute z-10 w-full bg-white border border-gray-300 mt-1 shadow-lg">
          {filteredArticles.map((article) => (
            <li
              key={article.id}
              className="border-b last:border-none border-gray-100"
            >
              <Link
                href={`/article/${article.url}`}
                className="block px-4 py-2 hover:bg-blue-50 text-sm text-gray-800"
                onClick={() => setQuery("")} // On vide la barre quand on clique
              >
                <span className="font-medium">{article.title}</span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
