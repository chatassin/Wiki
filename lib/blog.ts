"use server";

import { db } from "@/db";
import { blogTable } from "@/db/schema";
import { eq } from "drizzle-orm";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export async function getPost() {
  return await db.select().from(blogTable);
}

export async function createPost(form: FormData) {
  const title = String(form.get("title"));

  // 1. Génération de l'URL lisible (Slug)
  const cleanUrl = title
    .toLowerCase()
    .trim()
    .normalize("NFD") // Sépare les accents des lettres
    .replace(/[\u0300-\u036f]/g, "") // Supprime les accents
    .replace(/\s+/g, "-") // Remplace les espaces par des tirets
    .replace(/[^\w-]+/g, "") // Supprime tout ce qui n'est pas lettre, chiffre ou tiret
    .replace(/--+/g, "-"); // Évite les doubles tirets

  // 2. On crée l'URL finale
  // Résultat : /blog/article/mon-premier-article
  const finalUrl = `/blog/article/${cleanUrl}`;

  // 3. On insère dans la DB
  await db.insert(blogTable).values({
    // On ne met pas l'ID ici car la DB va utiliser .defaultRandom() toute seule
    title: title,
    content: String(form.get("content")),
    author: String(form.get("author")),
    url: finalUrl, // Ton URL propre et lisible
  });

  redirect((await headers()).get("referer") ?? "/");
}

export async function editPost(form: FormData) {
  await db
    .update(blogTable)
    .set({
      title: String(form.get("title")),
      content: String(form.get("content")),
    })
    .where(eq(blogTable.id, String(form.get("id"))));
  redirect((await headers()).get("referer") ?? "/");
}

export async function deletePost(id: string) {
  await db.delete(blogTable).where(eq(blogTable.id, id));
  redirect((await headers()).get("referer") ?? "/");
}
