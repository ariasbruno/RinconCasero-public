import { Button } from "@/components/ui/button";

type CategoryProps = {
  categories: string[];
  activeCategory: string;
  onSelectCategory: (category: string) => void;
};

export default function CategoryNavigation({
  categories,
  activeCategory,
  onSelectCategory,
}: CategoryProps) {
  return (
    <div className="container mx-auto overflow-x-auto px-4 py-4">
      <div className="flex min-w-max space-x-2">
        {categories.map((category) => (
          <Button
            key={category}
            variant="ghost"
            onClick={() => onSelectCategory(category)}
            className={`text-sm ${activeCategory === category ? "rounded-none border-b-2 border-primary font-medium text-primary" : "text-muted-foreground"}`}
          >
            {category}
          </Button>
        ))}
      </div>
    </div>
  );
}
