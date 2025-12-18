import { createPost } from "@/lib/blog";
import { redirect } from "next/navigation";

// L'action reste la même, mais elle est plus propre
async function handleCreatePost(formData: FormData) {
  "use server";
  await createPost(formData);
  // Redirection vers la liste des articles après création
  redirect("/blog");
}

export default function NewPostPage() {
  return (
    /* Plus besoin de Navbar, Footer ou de la div parente complexe */
    <div className="max-w-4xl mx-auto py-12 w-full">
      <h1 className="text-4xl font-extrabold mb-8 text-blue-600">
        Créer un nouvel article
      </h1>

      <form action={handleCreatePost} className="space-y-6">
        {/* CHAMP TITRE */}
        <div>
          <label
            htmlFor="title"
            className="block text-sm font-medium mb-1 text-zinc-700 dark:text-zinc-300"
          >
            Titre de l'article
          </label>
          <input
            type="text"
            name="title" // Utilisé par createPost
            id="title"
            required
            placeholder="Ex: La Belgique au Moyen-Âge"
            className="w-full p-3 border border-zinc-300 rounded-lg dark:bg-zinc-800 dark:border-zinc-700 text-black dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>

        {/* CHAMP AUTEUR (Corrigé le name) */}
        <div>
          <label
            htmlFor="author"
            className="block text-sm font-medium mb-1 text-zinc-700 dark:text-zinc-300"
          >
            Auteur
          </label>
          <input
            type="text"
            name="author" // DOIT être "author" pour correspondre à form.get("author")
            id="author"
            required
            placeholder="Votre nom"
            className="w-full p-3 border border-zinc-300 rounded-lg dark:bg-zinc-800 dark:border-zinc-700 text-black dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>

        {/* CHAMP CONTENU */}
        <div>
          <label
            htmlFor="content"
            className="block text-sm font-medium mb-1 text-zinc-700 dark:text-zinc-300"
          >
            Contenu
          </label>
          <textarea
            name="content" // Utilisé par createPost
            id="content"
            rows={10}
            required
            placeholder="Écrivez votre article ici..."
            className="w-full p-3 border border-zinc-300 rounded-lg dark:bg-zinc-800 dark:border-zinc-700 text-black dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
          ></textarea>
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-8 py-3 rounded-lg font-bold hover:bg-blue-700 transition shadow-lg active:scale-95"
        >
          Publier l'article
        </button>
      </form>
    </div>
  );
}
