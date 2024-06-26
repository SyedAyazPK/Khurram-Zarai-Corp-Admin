import AddProduct from "./AddProduct";
import AddVariation from "./AddVariation";
import { Products as DeletedProducts } from "./ProductsDeleted";
import AddVariationProduct from "./AddVariationProduct";
import { Products } from "./Products";

const ProductsConfig = {
  settings: {
    layout: {
      config: {
        footer: {
          display: false,
        },
      },
    },
  },
  routes: [
    {
      path: "products",
      element: <Products />,
    },
    {
      path: "deleted-products",
      element: <DeletedProducts />,
    },
    {
      path: "/add-product",
      element: <AddProduct />,
    },
    {
      path: "/add-product-variation",
      element: <AddVariation />,
    },
    {
      path: "/add-variation-product",
      element: <AddVariationProduct />,
    },
  ],
};

export default ProductsConfig;
