import { ProductDetail, Home, Shop, About } from "@/pages/index";

export const basicPaths = [
  {
    path: "/",
    id: 1,
    element: <Home />,
  },
  {
    path: "shop",
    id: 2,
    element: <Shop />,
    children: [{ id: 2.1, path: "login", element: <Shop /> }],
  },
  {
    path: "shop/:id",
    id: 3,
    element: <ProductDetail />,
  },
  {
    path: "about",
    id: 2,
    element: <About />,
  },
];

export default basicPaths;
