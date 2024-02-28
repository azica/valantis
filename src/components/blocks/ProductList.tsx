"use clients";
import { Spinner } from "flowbite-react";
import { useEffect, useState } from "react";

import { useFetchedProducts, useFilterProducts } from "@/shared/hooks";

import ProductCard from "./ProductCard";

const ProductList = () => {
  const [currentProducts, setCurrentProducts] = useState<Model.Product[]>([]);
  const [isLoadingProducts, setIsLoadingProducts] = useState(false);
  const { products, isLoading } = useFetchedProducts();
  const { filteredProducts, isFilterLoading, hasFilterParams } = useFilterProducts();

  useEffect(() => {
    if (hasFilterParams) {
      console.log(hasFilterParams);
      setIsLoadingProducts(isFilterLoading);
      setCurrentProducts(filteredProducts);
    } else {
      setIsLoadingProducts(isLoading);
      setCurrentProducts(products);
    }
  }, [isLoading, products, isFilterLoading, filteredProducts, hasFilterParams]);

  return (
    <div>
      {isLoadingProducts ? (
        <Spinner aria-label="Extra large spinner example" size="xl" className="h-96" />
      ) : currentProducts.length === 0 ? (
        <h2 className="font-semibold text-center text-3xl my-10">Tовара нет в наличии. </h2>
      ) : (
        <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-4 justify-center">
          {currentProducts.map((product) => (
            <ProductCard key={product.id} {...product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductList;
