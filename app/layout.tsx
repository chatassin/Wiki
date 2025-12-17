import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SearchBar from "@/components/SearchBar";
import { db } from "@/db";
import { blogTable } from "@/db/schema";

export const metadata: Metadata = {
  title: "Mon Wikipédia",
  description: "Clone de Wikipédia avec Next.js et Drizzle",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // On récupère les articles pour la barre de recherche (R du CRUD)
  const articles = await db
    .select({
      id: blogTable.id,
      title: blogTable.title,
      url: blogTable.url,
    })
    .from(blogTable);

  return (
    <html lang="fr">
      <body className="antialiased">
        <div className="flex min-h-screen flex-col bg-white font-sans dark:bg-black text-black dark:text-white">
          {/* La Navbar est commune à toutes les pages */}
          <Navbar />

          {/* On insère la SearchBar juste en dessous ou dans la Navbar */}
          <div className="w-full max-w-5xl mx-auto px-6 pt-4">
            <SearchBar articles={articles} />
          </div>

          {/* Le contenu spécifique de chaque page (Home, Blog, etc.) s'injecte ici */}
          <main className="flex-1 px-6 max-w-5xl mx-auto w-full pt-10">
            {children}
          </main>

          <Footer />
        </div>
      </body>
    </html>
  );
}
