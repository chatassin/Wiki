"use server";

import { db } from "@/db";
import { blogTable } from "@/db/schema";
import { eq } from "drizzle-orm";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

/**
 * Récupère tous les articles ou un article spécifique par son ID (UUID)
 */
export async function getPost(id?: string) {
  if (id) {
    const results = await db
      .select()
      .from(blogTable)
      .where(eq(blogTable.id, id));
    return results[0] || null;
  }
  return await db.select().from(blogTable);
}

/**
 * Crée un nouvel article avec génération automatique de l'URL
 */
export async function createPost(form: FormData) {
  const title = String(form.get("title"));

  // 1. Génération de l'URL lisible (Slug)
  const cleanUrl = title
    .toLowerCase()
    .trim()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\s+/g, "-")
    .replace(/[^\w-]+/g, "")
    .replace(/--+/g, "-");

  const finalUrl = `/blog/article/${cleanUrl}`;

  // 2. Insertion dans la DB (L'ID UUID est généré automatiquement par la DB)
  await db.insert(blogTable).values({
    title: title,
    content: String(form.get("content")),
    author: String(form.get("author")),
    url: finalUrl,
  });

  redirect((await headers()).get("referer") ?? "/");
}

/**
 * Met à jour un article, incluant le titre, le contenu ET l'auteur
 */
export async function editPost(id: string, form: FormData) {
  await db
    .update(blogTable)
    .set({
      title: String(form.get("title")),
      content: String(form.get("content")),
      author: String(form.get("author")), // Ajout de la modification de l'auteur
    })
    .where(eq(blogTable.id, id)); // Utilisation de l'ID passé en paramètre

  // Redirection vers la page de l'article ou l'accueil
  redirect(`/blog/${id}`);
}

/**
 * Supprime un article par son ID (UUID)
 */
export async function deletePost(id: string) {
  await db.delete(blogTable).where(eq(blogTable.id, id));
  redirect("/blog"); // Redirection vers la liste des articles après suppression
}
