import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";

import { useLazyFilterItemsQuery, useLazyGetItemsQuery } from "@/store/services/shopQuery";

const useFilterProducts = () => {
  const [searchParams] = useSearchParams();
  const [hasFilterParams, setHasFilterParams] = useState(false);
  const [filteredProducts, setFilteredProducts] = useState<Model.Product[]>([]);

  const [triggerIds, triggeredIds] = useLazyFilterItemsQuery();
  const [triggerProducts, triggeredProducts] = useLazyGetItemsQuery();

  useEffect(() => {
    const priceParam = searchParams.get("price");
    const brandParam = searchParams.get("brand");
    const titleParam = searchParams.get("title");

    if (priceParam !== null || brandParam !== null || titleParam !== null) {
      const params: { price?: number; brand?: string; title?: string } = {};

      brandParam && brandParam.length > 0 ? (params.brand = brandParam) : null;
      Number(priceParam) > 0 ? (params.price = Number(priceParam)) : null;
      titleParam && titleParam?.length > 3 ? (params.title = titleParam) : null;

      setTimeout(() => {
        triggerIds({ ...params });
        setHasFilterParams(true);
      }, 500);
    } else {
      setHasFilterParams(false);
    }
  }, [searchParams, triggerIds]);

  useEffect(() => {
    if (triggeredIds.data && triggeredIds.isSuccess) {
      const ids = (triggeredIds.data as { result: string[] }).result;
      triggerProducts({ ids });
    }
  }, [triggeredIds, triggerProducts]);

  useEffect(() => {
    if (triggeredProducts.data && triggeredProducts.isSuccess) {
      const { result: newProduct } = triggeredProducts.data as { result: Model.Product[] };
      if (newProduct) {
        const uniqueProducts = newProduct.filter(
          (product, index, self) => self.findIndex((p) => p.id === product.id) === index,
        );
        setFilteredProducts(uniqueProducts);
      }
    }
  }, [triggeredProducts]);

  return { filteredProducts, isFilterLoading: triggeredProducts.isLoading || triggeredIds.isLoading, hasFilterParams };
};

export default useFilterProducts;