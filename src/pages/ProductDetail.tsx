import { useParams } from "react-router-dom";

import Container from "@/layout/Container";

const ProductDetail = () => {
  const params = useParams();
  return (
    <Container>
      <div className="my-10">
        Product Id <span className="font-medium">{params.id}</span>
      </div>
    </Container>
  );
};

export default ProductDetail;
