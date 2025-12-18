import { getPost, editPost } from "@/lib/blog";
import { notFound } from "next/navigation";

type EditPostPageProps = {
  params: Promise<{ id: string }>;
};

export default async function EditPostPage({ params }: EditPostPageProps) {
  // On récupère l'ID depuis les paramètres de l'URL
  const { id } = await params;

  // On récupère l'article correspondant via l'ID (UUID)
  const post = await getPost(id);

  // Si l'article n'existe pas, on renvoie vers la page 404
  if (!post) {
    notFound();
  }

  // Server Action pour traiter la modification
  async function handleEditAction(formData: FormData) {
    "use server";
    // On appelle la fonction de lib/blog.ts mise à jour
    await editPost(id, formData);
  }

  return (
    <section className="max-w-4xl mx-auto py-12 px-6">
      <div className="mb-10">
        <h1 className="text-4xl font-black text-blue-600 mb-2">
          Modifier l'article
        </h1>
        <p className="text-zinc-500 dark:text-zinc-400">
          ID de l'article : <span className="font-mono text-xs">{id}</span>
        </p>
      </div>

      {/* Le formulaire n'a pas besoin de composants de navigation ici (layout s'en occupe) */}
      <form
        action={handleEditAction}
        className="space-y-8 bg-zinc-50 dark:bg-zinc-900/50 p-8 rounded-2xl border border-zinc-200 dark:border-zinc-800"
      >
        {/* Champ TITRE */}
        <div className="space-y-2">
          <label
            htmlFor="title"
            className="text-sm font-bold uppercase tracking-wider"
          >
            Titre de l'article
          </label>
          <input
            type="text"
            id="title"
            name="title"
            required
            className="w-full p-4 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 focus:ring-2 focus:ring-blue-500 outline-none transition"
          />
        </div>

        {/* Champ AUTEUR (Modifiable comme demandé) */}
        <div className="space-y-2">
          <label
            htmlFor="author"
            className="text-sm font-bold uppercase tracking-wider"
          >
            Nom de l'auteur
          </label>
          <input
            type="text"
            id="author"
            name="author"
            required
            className="w-full p-4 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 focus:ring-2 focus:ring-blue-500 outline-none transition"
          />
        </div>

        {/* Champ CONTENU */}
        <div className="space-y-2">
          <label
            htmlFor="content"
            className="text-sm font-bold uppercase tracking-wider"
          >
            Contenu de l'article
          </label>
          <textarea
            id="content"
            name="content"
            rows={12}
            required
            className="w-full p-4 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 focus:ring-2 focus:ring-blue-500 outline-none transition resize-none"
          ></textarea>
        </div>

        {/* BOUTONS D'ACTION */}
        <div className="flex flex-col sm:flex-row gap-4 pt-4">
          <button
            type="submit"
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-xl shadow-lg shadow-blue-500/20 transition-all active:scale-95"
          >
            Sauvegarder les modifications
          </button>

          <a
            href={`/blog/article/${id}`}
            className="flex-1 bg-zinc-200 dark:bg-zinc-800 hover:bg-zinc-300 dark:hover:bg-zinc-700 text-center py-4 rounded-xl font-bold transition"
          >
            Annuler
          </a>
        </div>
      </form>
    </section>
  );
}
