import { SearchByTitle, FilterByBrand, FilterByPrice } from "@/blocks/index";
import ProductList from "@/blocks/ProductList";
import { Container } from "@/layout/index";
import { Pagination } from "@/ui/index";

const Home = () => {
  return (
    <Container className="text-center py-10">
      <SearchByTitle />
      <FilterByBrand />
      <FilterByPrice />
      <ProductList />
      <Pagination totalPages={100} />
    </Container>
  );
};

export default Home;
