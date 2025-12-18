"use server";

import { db } from "@/db";
import { usersTable } from "@/db/schema";
import { eq } from "drizzle-orm";
import { compare, hash } from "bcryptjs";
import { redirect } from "next/navigation";
import { cookies, headers } from "next/headers";

/**
 * Inscription d'un utilisateur
 */
export async function register(form: FormData) {
  const email = String(form.get("login"));
  const password = String(form.get("password"));

  if (!email || !password) return;

  await db.insert(usersTable).values({
    email: email,
    password: await hash(password, 10),
  });

  // Optionnel: rediriger vers le login après inscription
  redirect("/login");
}

/**
 * Connexion et création de session
 */
export async function login(form: FormData) {
  const login = String(form.get("login"));
  const password = String(form.get("password"));
  const secret = process.env.SECRET || "default_secret_key"; // Sécurité : fallback

  const users = await db
    .select()
    .from(usersTable)
    .where(eq(usersTable.email, login));

  const user = users[0];
  const loggedIn = user ? await compare(password, user.password) : false;

  if (loggedIn) {
    // On crée une signature basée sur le secret + login
    // Note: bcrypt.hash n'est pas idéal pour une signature de cookie,
    // mais on garde ta logique en la rendant fonctionnelle.
    const signature = await hash(secret + login, 10);
    const cookieStore = await cookies();

    cookieStore.set("session", `${login}:${signature}`, {
      httpOnly: true, // Sécurité: empêche le vol de cookie par JS
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24, // 1 jour
      path: "/",
    });
  }

  const referer = (await headers()).get("referer");
  redirect(referer ?? "/");
}

/**
 * Récupération de l'utilisateur connecté
 */
export async function getCurrentUser() {
  const cookieStore = await cookies();
  const session = cookieStore.get("session")?.value;
  const secret = process.env.SECRET || "default_secret_key";

  if (!session) return null;

  // On sépare le login et la signature (attention: tu utilisais ";" et ici ":")
  const [login, signature] = session.split(":");

  if (!login || !signature) return null;

  // Vérification : bcrypt.compare(données_claires, hash_stocké)
  // On compare le secret+login (clair) avec la signature (hash)
  const isSignatureValid = await compare(secret + login, signature);

  if (isSignatureValid) {
    return login; // Retourne l'email de l'utilisateur
  }

  return null;
}

/**
 * Déconnexion
 */
export async function logout() {
  const cookieStore = await cookies();
  cookieStore.delete("session");
  redirect("/");
}
