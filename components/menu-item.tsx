import type { MenuItem } from "@/types/menu";

export default function MenuItem({ item }: { item: MenuItem }) {
  let displayName = item.name;
  const prefixesToRemove = [
    "Empanada de ",
    "Empanada ",
    "Pizza de ",
    "Pizza con ",
    "Pizza ",
  ];
  for (const prefix of prefixesToRemove) {
    if (displayName.startsWith(prefix)) {
      displayName = displayName.substring(prefix.length).trim();
      break;
    }
  }

  const basePrice = item.price;
  const appliedDiscount = item.applied_discount_percentage;
  let displayPrice = basePrice;
  let originalPrice = null;

  if (appliedDiscount > 0) {
    originalPrice = basePrice;
    displayPrice =
      Math.round(basePrice * (1 - appliedDiscount / 100) * 100) / 100;
  }

  return (
    <div className="border-0 shadow-sm transition-shadow hover:shadow dark:border-gray-700 dark:bg-gray-800">
      <div className="p-4">
        <div className="mb-2 flex items-start justify-between gap-4">
          <h3 className="text-base font-medium md:text-lg">
            {displayName}
          </h3>
          <div className="flex-shrink-0 text-right">

            {originalPrice !== null ? (
              <>
                <span className="dark:text-rincon-primary-light block whitespace-nowrap font-medium text-primary">
                  $ {displayPrice}
                </span>
                <span className="mr-2 inline whitespace-nowrap text-xs text-rincon-primary">
                  -{appliedDiscount}%
                </span>
                <span className="inline whitespace-nowrap text-xs text-muted-foreground line-through">
                  $ {originalPrice}
                </span>
              </>
            ) : (
              <span className="dark:text-rincon-primary-light block whitespace-nowrap font-medium text-primary">
                $ {displayPrice}
              </span>
            )}
            
          </div>
        </div>
      </div>
    </div>
  );
}
