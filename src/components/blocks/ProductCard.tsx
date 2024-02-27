import type { FC } from "react";

import { Button, Card } from "flowbite-react";

import ring from "@/assets/images/ring.webp";

const ProductCard: FC<Model.Product> = ({ product, id, brand, price }) => {
  return (
    <Card className="max-w-sm">
      <a href={`shop/${id}`}>
        <h5 className="text-lg font-semibold tracking-tight text-gray-900 dark:text-white">{product}</h5>
      </a>
      <div className="mb-5 mt-2.5 flex items-center flex-1">
        {brand ? (
          <span className="ml-3 mr-2 rounded bg-cyan-100 px-2.5 py-0.5 text-xs font-semibold text-cyan-800 dark:bg-cyan-200 dark:text-cyan-800">
            {brand}
          </span>
        ) : null}
        <span className="ml-3 mr-2 rounded bg-cyan-100 px-2.5 py-0.5 text-xs font-semibold text-cyan-800 dark:bg-cyan-200 dark:text-cyan-800">
          {id}
        </span>
      </div>
      <div className="flex items-center justify-between">
        <span className="text-lg font-medium text-gray-900 dark:text-white">${price}</span>
        <Button> Add to cart</Button>
      </div>
    </Card>
  );
};

export default ProductCard;
