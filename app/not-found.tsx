import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import Logo from "@/public/logo.jsx";

export default function NotFound() {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center px-4 py-16 text-center">
      <div className="mb-8">
        <Logo className="mx-auto h-32 w-32" />
      </div>

      <h1 className="mb-4 text-6xl font-bold text-rincon-primary">404</h1>
      <h2 className="mb-6 text-2xl font-bold">Página no encontrada</h2>

      <p className="mb-8 max-w-md text-lg text-muted-foreground">
        Lo sentimos, la página que estás buscando no existe o ha sido movida.
      </p>

      <div className="flex flex-col gap-4 sm:flex-row">
        <Button
          asChild
          className="bg-rincon-primary hover:bg-rincon-primary/90"
        >
          <Link href="/">Volver al inicio</Link>
        </Button>

        <Button asChild variant="outline">
          <Link href="/menu">
            <Search className="mr-2 h-4 w-4" />
            Ver nuestro menú
          </Link>
        </Button>
      </div>
    </div>
  );
}
