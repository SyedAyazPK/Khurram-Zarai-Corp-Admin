import FuseSvgIcon from "@fuse/core/FuseSvgIcon";
import { Grid, Typography } from "@mui/material";
import { getBrands } from "app/store/brandSlice";
import { getCategories } from "app/store/categorySlice";
import { getProducts } from "app/store/productSlice";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import ProductSearch from "./ProductSearch";
import ProductTable from "./ProductTableDeleted";

export const Products = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProducts(`sortBy=sku&isDeleted=true`));
  }, []);
  return (
    <div className="my-24 p-32">
      <div className="flex justify-end w-full items-center">
        <FuseSvgIcon className="text-48" size={16} color="action">
          heroicons-solid:download
        </FuseSvgIcon>
        <Typography className="ml-2">Download</Typography>
      </div>
      <div className="flex justify-end w-full items-center mt-16">
        <ProductSearch />
      </div>
      <Typography className=" title ">Deleted Products</Typography>
      <Typography className="mb-24">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod.
      </Typography>

      <ProductTable />
    </div>
  );
};
