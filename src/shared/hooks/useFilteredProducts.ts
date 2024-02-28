import { enqueueSnackbar } from "notistack";
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";

import { useLazyFilterItemsQuery, useLazyGetItemsQuery } from "@/store/services/shopQuery";

const useFilterProducts = () => {
  const [searchParams] = useSearchParams();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [hasFilterParams, setHasFilterParams] = useState(false);
  const [filteredProducts, setFilteredProducts] = useState<Model.Product[]>([]);

  const [triggerIds, triggeredIds] = useLazyFilterItemsQuery();
  const [triggerProducts, triggeredProducts] = useLazyGetItemsQuery();

  useEffect(() => {
    const priceParam = searchParams.get("price");
    const brandParam = searchParams.get("brand");
    const productParam = searchParams.get("product");
    const page = searchParams.get("page");

    if (priceParam !== null || brandParam !== null || productParam !== null) {
      setHasFilterParams(true);
    } else {
      setHasFilterParams(false);
    }

    if (priceParam !== null || brandParam !== null || productParam !== null || page !== null) {
      const params: { price?: number; brand?: string; product?: string; offset?: number } = {};

      brandParam && brandParam.length > 0 ? (params.brand = brandParam) : null;
      Number(priceParam) > 0 ? (params.price = Number(priceParam)) : null;
      productParam && productParam?.length > 3 ? (params.product = productParam) : null;
      page ? (params.offset = (Number(page) - 1) * 10) : null;

      triggerIds({ ...params });
    }
  }, [searchParams, triggerIds]);

  useEffect(() => {
    if (triggeredIds.data && triggeredIds.isSuccess) {
      const ids = (triggeredIds.data as { result: string[] }).result;
      setIsLoading(true);
      setTimeout(() => {
        triggerProducts({ ids });
      }, 500);
    }
    if (triggeredIds.error) {
      enqueueSnackbar((triggeredIds.error as ErrorResponse).message || "An error occurred while fetching products!", {
        variant: "failure",
        autoHideDuration: 3000,
      });
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
      setIsLoading(false);
    }
    if (triggeredProducts.error) {
      enqueueSnackbar((triggeredProducts.error as ErrorResponse).message || "An error occurred while fetching products!", {
        variant: "failure",
        autoHideDuration: 3000,
      });
    }
  }, [triggeredProducts]);

  return { filteredProducts, isFilterLoading: isLoading, hasFilterParams };
};

export default useFilterProducts;
