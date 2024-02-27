import { Spinner } from "flowbite-react";

import { ProductCard, SearchByTitle, FilterByBrand, FilterByPrice } from "@/blocks/index";
import { Container } from "@/layout/index";
import { useFetchedProducts, useFilterProducts } from "@/shared/hooks";
import { Pagination } from "@/ui/index";

const Home = () => {
  const { products, isLoading } = useFetchedProducts();
  const { filteredProducts, isFilterLoading, hasFilterParams } = useFilterProducts();

  return (
    <Container className="text-center py-10">
      <SearchByTitle />
      <FilterByBrand />
      <FilterByPrice />

      {isLoading || isFilterLoading ? (
        <Spinner aria-label="Extra large spinner example" size="xl" className="h-96" />
      ) : null}

      {hasFilterParams && filteredProducts.length === 0 && !isFilterLoading ? (
        <h2 className="font-semibold text-center text-3xl my-10">Tовара нет в наличии. </h2>
      ) : null}

      {products.length === 0 && !isLoading ? (
        <h2 className="font-semibold text-center text-3xl my-10">Tовара нет в наличии. </h2>
      ) : null}

      <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-4 justify-center">
        {hasFilterParams
          ? filteredProducts.map((product) => <ProductCard key={product.id} {...product} />)
          : products.map((product) => <ProductCard key={product.id} {...product} />)}
      </div>

      <Pagination totalPages={100} />
    </Container>
  );
};

export default Home;
