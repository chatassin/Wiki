import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="flex w-full items-center justify-between p-6 border-b border-zinc-100 dark:border-zinc-800">
      <div className="flex flex-col">
        <div className="text-2xl font-bold leading-tight">Wikipédia</div>
        <div className="text-xs text-gray-500 font-normal">
          L'encyclopédie libre
        </div>
      </div>
      <div className="flex gap-6 text-sm font-medium">
        <Link href="/" className="hover:text-blue-600 transition">
          Accueil
        </Link>
        <Link href="/blog/new" className="hover:text-blue-600 transition">
          Création
        </Link>
        <Link href="/signup" className="hover:text-blue-600 transition">
          Créer un compte
        </Link>
        <Link href="/login" className="hover:text-blue-600 transition">
          Se connecter
        </Link>
      </div>
    </nav>
  );
}
