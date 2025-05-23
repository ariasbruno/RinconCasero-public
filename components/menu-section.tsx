import MenuItem from "./menu-item";
import { Separator } from "@/components/ui/separator";
import type { MenuItem as MenuItemType } from "@/types/menu";

type MenuSectionProps = {
  title: string;
  items: MenuItemType[];
};

export default function MenuSection({ title, items }: MenuSectionProps) {
  if (!items || items.length === 0) {
    return (
      <p className="py-4 text-center text-muted-foreground">
        No hay productos en {title}.
      </p>
    );
  }

  return (
    <section className="py-6">
      {title === "Empanadas" ? (
        <div className="flex justify-between">
          <h2 className="mb-2 text-xl font-semibold text-rincon-primary">
            {title}
          </h2>
          <p>Docena $ 20000</p>
        </div>
      ) : (
        <h2 className="mb-2 text-xl font-semibold text-rincon-primary">
          {title}
        </h2>
      )}
      <Separator className="mb-4" />
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {items.map((item) => (
          <MenuItem key={item.id} item={item} />
        ))}
      </div>
    </section>
  );
}
