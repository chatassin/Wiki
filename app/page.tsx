import Button from "@/components/Button";

export default function Home() {
  return (
    <div className="flex flex-col gap-4 items-start">
      <p className="text-left text-zinc-600 dark:text-zinc-400 leading-relaxed sm:text-lg font-bold">
        Articles publiés
      </p>

      <div className="flex flex-col gap-3 mt-4 w-full sm:w-auto sm:flex-row">
        <Button href="/blog/new">faire un don</Button>
        <Button href="/contact" variant="outline">
          Signaler
        </Button>
      </div>

      {/* C'est ici que tu pourras mapper tes articles plus tard */}
    </div>
  );
}
