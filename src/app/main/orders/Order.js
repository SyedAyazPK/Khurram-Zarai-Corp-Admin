import FuseSvgIcon from "@fuse/core/FuseSvgIcon";
import { Grid, Typography } from "@mui/material";
import { getCustomers } from "app/store/customerSlice";
import { getAllOrders, getOrders, selectOrders } from "app/store/orderSlice";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
// import AddOrder from './AddOrder';
import { OrderCard } from "./OrderCard";
import OrderFilters from "./OrderFilters";
import OrderSearch from "./OrderSearch";
import OrderTable from "./OrderTable";

export const Orders = () => {
  const dispatch = useDispatch();
  const orders = useSelector(selectOrders);
  useEffect(() => {
    dispatch(getOrders());
    // dispatch(getAllOrders());
    dispatch(getCustomers());
  }, []);
  const delivered = orders?.results?.filter((order) => {
    return order.status === "delivered";
  });
  const Proccessing = orders?.results?.filter((order) => {
    return order.status === "partial" || order.status === "pending";
  });
  return (
    <div className="my-24 p-32">
      <Grid container spacing={2} className="mb-16">
        <Grid item xs={8} lg={4}>
          <OrderCard title={"Total Orders"} total={orders.results.length} />
        </Grid>
        <Grid item xs={6} lg={4}>
          <OrderCard title={"Delivered Orders"} total={delivered.length} />
        </Grid>
        <Grid item xs={6} lg={4}>
          <OrderCard title={"Proccessing Orders"} total={Proccessing.length} />
        </Grid>
      </Grid>

      <div className="flex justify-end w-full items-center mt-16">
        <OrderSearch />
      </div>
      <div className="flex justify-end w-full items-center mt-16">
        <OrderFilters />
      </div>

      <div className="w-full flex justify-end my-16">{/* <AddOrder /> */}</div>

      <OrderTable />
    </div>
  );
};
