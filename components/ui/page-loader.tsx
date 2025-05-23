import { Loader2 } from "lucide-react";

export function PageLoader() {
  return (
    <div
      className="flex min-h-[60vh] flex-col items-center justify-center"
      role="status"
      aria-label="Cargando contenido"
    >
      <Loader2 className="h-12 w-12 animate-spin text-rincon-primary" />
      <p className="mt-4 text-lg text-muted-foreground">Cargando...</p>
    </div>
  );
}
