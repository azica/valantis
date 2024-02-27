import { enqueueSnackbar } from "notistack";
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";

import { useGetIdsQuery, useGetItemsQuery } from "@/store/services/shopQuery";

const useFetchProducts = () => {
  const [ids, setIds] = useState<string[]>([]);
  const [products, setProducts] = useState<Model.Product[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [searchParams] = useSearchParams();
  const [page, setPage] = useState(Number(searchParams.get("page")) || 1);

  const fetchProductsIds = useGetIdsQuery({ limit: 51, offset: (page - 1) * 10 });

  useEffect(() => {
    if (fetchProductsIds.data) {
      const { result } = fetchProductsIds.data as { result: string[] };
      setIds(result || []);
    }
    if (fetchProductsIds.error) {
      enqueueSnackbar((fetchProductsIds.error as ErrorResponse).message || "An error occurred while fetching products!", {
        variant: "failure",
        autoHideDuration: 3000,
      });
    }
  }, [fetchProductsIds]);

  useEffect(() => {
    setPage(Number(searchParams.get("page")) || 1);
  }, [searchParams]);

  const fetchedProducts = useGetItemsQuery({ ids });

  useEffect(() => {
    setIsLoading(fetchedProducts.isLoading);
    if (fetchedProducts.isSuccess && fetchedProducts.data) {
      const { result: newProduct } = fetchedProducts.data as { result: Model.Product[] };
      if (newProduct) {
        const uniqueProducts = newProduct.filter(
          (product, index, self) => self.findIndex((p) => p.id === product.id) === index,
        );
        setProducts(uniqueProducts);
        setIsLoading(false);
      }
    }
    if (fetchedProducts.error) {
      enqueueSnackbar((fetchedProducts.error as ErrorResponse)?.message || "An error occurred while fetching products!", {
        variant: "failure",
      });
    }
  }, [fetchedProducts]);

  return {
    products,
    isLoading,
  };
};

export default useFetchProducts;
