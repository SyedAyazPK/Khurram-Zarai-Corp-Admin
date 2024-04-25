import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useDispatch, useSelector } from "react-redux";
import {
  closeEditDialog,
  editOrder,
  getOrders,
  openEditDialog,
  selectEditDialogState,
} from "app/store/orderSlice";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {
  Avatar,
  Checkbox,
  Divider,
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import FuseSvgIcon from "@fuse/core/FuseSvgIcon";
import moment from "moment";
import { selectCustomers } from "app/store/customerSlice";

/**
 * Form Validation Schema
 */
const schema = yup.object().shape({});

const defaultValues = {
  billing: "",
  tracking: "",
};

export default function OrderEditDialog({ dataObject }) {
  console.log("🚀 ~ OrderEditDialog ~ dataObject:", dataObject);
  const dispatch = useDispatch();
  const open = useSelector(selectEditDialogState);
  const customers = useSelector(selectCustomers);

  const { control, formState, handleSubmit, reset, setValue } = useForm({
    mode: "onChange",
    defaultValues: {
      customer: "",
      status: "",
    },
    resolver: yupResolver(schema),
  });

  const { isValid, dirtyFields, errors, setError } = formState;

  function onSubmit(data) {
    const updatedData = {
      ...data,
    };
    if (Boolean(data.customer?.length)) updatedData.User = data.customer;
    delete updatedData.customer;
    dispatch(editOrder({ ...updatedData, id: dataObject.id }))
      .then(() => dispatch(getOrders()))
      .then(() => handleClose());
  }

  const handleClickOpen = () => {
    dispatch(openEditDialog());
  };

  const handleClose = () => {
    dispatch(closeEditDialog());
  };

  React.useEffect(() => {
    if (dataObject?.User?.id) setValue("customer", dataObject.User.id);
    if (dataObject.status) setValue("status", dataObject.status);
  }, [dataObject]);

  const dummy = ["a", "b", "c"];

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        maxWidth="lg"
        fullWidth
      >
        <div className="flex w-full justify-between p-24">
          <div className="flex flex-col w-full">
            <Typography
              id="alert-dialog-title"
              variant="h5"
              className="font-semibold"
            >
              {"Order #"}
              {dataObject?.id}
            </Typography>
            <Typography className="w-full">
              {moment(dataObject?.createdAt).format("MMM DD, YYYY, hh:mm:ss A")}
            </Typography>
          </div>
          <div className="flex w-full justify-end items-end items-center">
            <Button
              variant="contained"
              color="secondary"
              aria-label="Register"
              style={{ borderRadius: "5px" }}
            >
              Cash on Delivery
            </Button>
            <FuseSvgIcon
              className="text-48 cursor-pointer ml-8"
              size={24}
              color="action"
              onClick={handleClose}
            >
              material-twotone:close
            </FuseSvgIcon>
          </div>
        </div>

        <DialogContent className="w-full">
          <div className="user relative flex flex-row items-center justify-start  pb-14 shadow-0  ">
            <div className="flex items-center justify-start ">
              <Avatar
                sx={{
                  color: "text.primary",
                }}
                className="avatar text-32 font-bold w-56 h-56"
                alt={"John Doe"}
              ></Avatar>
            </div>
            <div className="ml-8">
              <Typography className="username text-14 whitespace-nowrap font-medium">
                {dataObject?.User?.name}
              </Typography>
              <Typography
                className="email text-13 whitespace-nowrap font-medium"
                color="text.secondary"
              >
                {dataObject?.User?.email}
              </Typography>
            </div>
          </div>

          <DialogContentText id="alert-dialog-description" color="text.primary">
            <form
              name="registerForm"
              noValidate
              className="flex flex-col w-full"
              onSubmit={handleSubmit(onSubmit)}
            >
              <div className="md:flex w-full">
                <div className="md:w-2/3 md:mr-48">
                  <Typography
                    id="alert-dialog-title"
                    variant="h5"
                    className="font-semibold mb-16"
                  >
                    {"Info"}{" "}
                  </Typography>
                  <div className="md:flex w-full justify-between mb-8">
                    {dataObject?.User?.id && (
                      <Controller
                        render={({ field }) => (
                          <FormControl fullWidth className="md:mr-16">
                            <FormLabel
                              className="font-medium text-14"
                              component="legend"
                            >
                              Customer
                            </FormLabel>
                            <Select {...field} variant="outlined" fullWidth>
                              {customers?.results?.map((customer) => (
                                <MenuItem value={customer.id}>
                                  {customer.name}
                                </MenuItem>
                              ))}
                            </Select>
                          </FormControl>
                        )}
                        name="customer"
                        control={control}
                      />
                    )}
                    <Controller
                      render={({ field }) => (
                        <FormControl fullWidth className="">
                          <FormLabel
                            className="font-medium text-14"
                            component="legend"
                          >
                            Status
                          </FormLabel>
                          <Select {...field} variant="outlined" fullWidth>
                            {[
                              "partial",
                              "pending",
                              "delivered",
                              "cancelled",
                            ].map((it) => (
                              <MenuItem className="capitalize" value={it}>
                                {" "}
                                {it}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      )}
                      name="status"
                      control={control}
                    />
                  </div>
                  <Typography
                    id="alert-dialog-title"
                    variant="h6"
                    className="font-semibold mt-16"
                  >
                    Summary
                  </Typography>
                  <div className="flex w-full my-16 pt-16 px-16 align-center justify-center ">
                    <Typography className="w-full font-semibold uppercase">
                      Item
                    </Typography>
                    <Typography className="w-full font-semibold uppercase">
                      Quantity
                    </Typography>
                    <Typography className="w-full font-semibold uppercase">
                      Cost
                    </Typography>
                    <Typography className="w-full font-semibold uppercase">
                      Total
                    </Typography>
                  </div>

                  {dataObject?.checkout?.products.map((item) => (
                    <div className="flex w-full p-16 align-center justify-center">
                      <Typography className="w-full">{item.title}</Typography>
                      <Typography className="w-full">
                        {item.quantity}
                      </Typography>
                      <Typography className="w-full">
                        {item.price} PKR
                      </Typography>
                      <Typography className="w-full">
                        {item.price * item.quantity} PKR
                      </Typography>
                    </div>
                  ))}

                  <Divider />

                  <div className="my-16 px-16 ">
                    <div className="flex w-full justify-between ">
                      <Typography>Subtotal</Typography>
                      <Typography className="font-semibold">
                        {dataObject?.checkout?.total}
                      </Typography>
                    </div>
                    <div className="flex py-8 w-full justify-between ">
                      <Typography>Discount</Typography>
                      <Typography className="font-semibold">
                        {dataObject?.checkout?.discount
                          ? dataObject?.checkout?.discount
                          : "--"}
                      </Typography>
                    </div>
                    <div className="flex w-full justify-between ">
                      <Typography>Tax @ 12.5%</Typography>
                      <Typography className="font-semibold">
                        {" "}
                        {dataObject?.checkout?.tax
                          ? dataObject?.checkout?.tax
                          : "--"}
                      </Typography>
                    </div>
                    <div className="flex py-8 w-full justify-between ">
                      <Typography>Shipping</Typography>
                      <Typography className="font-semibold">
                        {" "}
                        {dataObject?.checkout?.shipping
                          ? dataObject?.checkout?.shipping
                          : "--"}
                      </Typography>
                    </div>
                    <div className="flex mt-24 w-full justify-between ">
                      <Typography variant="h6">Total</Typography>
                      <Typography variant="h6" className="font-semibold">
                        {dataObject?.price} PKR
                      </Typography>
                    </div>
                  </div>

                  <Typography
                    id="alert-dialog-title"
                    variant="h6"
                    className="font-semibold mt-16"
                  >
                    Delivery Information
                  </Typography>

                  <div className="md:flex w-full pt-16">
                    <div className="w-full border-l-2">
                      <div className="pl-16">
                        <Typography className="font-semibold">
                          Contact
                        </Typography>
                        <Typography className="">
                          {dataObject?.guestInfo?.name ??
                            dataObject?.User?.name}
                        </Typography>
                        <Typography className="">
                          {dataObject?.guestInfo?.email ??
                            dataObject?.User?.email}
                        </Typography>
                        <Typography className="">
                          {dataObject?.guestInfo?.phone ??
                            dataObject?.User?.phone}
                        </Typography>
                      </div>
                    </div>
                    <div className="w-full border-l-2">
                      <div className="pl-16">
                        <Typography className="font-semibold">
                          Shipping Address
                        </Typography>
                        <Typography className="">
                          {dataObject?.street}
                        </Typography>
                        {/* <Typography className="">
                          {dataObject?.checkout?.province}
                        </Typography> */}
                        <Typography className=""> Pakistan</Typography>
                      </div>
                    </div>
                    <div className="w-full border-l-2">
                      <div className="pl-16">
                        <Typography className="font-semibold">
                          Billing Address
                        </Typography>
                        <Typography className="">
                          {dataObject?.street}
                        </Typography>
                        {/* <Typography className="">
                          {dataObject?.checkout?.province}
                        </Typography> */}
                        <Typography className=""> Pakistan</Typography>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="md:w-1/3">
                  <div className="flex w-full justify-between">
                    <Typography
                      id="alert-dialog-title"
                      variant="h5"
                      className="font-semibold"
                    >
                      {"Track Shipment"}{" "}
                    </Typography>
                    <FuseSvgIcon
                      className="text-48 cursor-pointer ml-8 items-end flex"
                      size={24}
                      color="action"
                      onClick={handleClose}
                    >
                      material-twotone:close
                    </FuseSvgIcon>
                  </div>
                  <div className="my-16">
                    <Controller
                      name="trackingNo"
                      control={control}
                      render={({ field }) => (
                        <FormControl fullWidth className="">
                          <FormLabel
                            className="font-medium text-14"
                            component="legend"
                          >
                            Tracking No
                          </FormLabel>
                          <TextField
                            {...field}
                            className=""
                            autoFocus
                            type="text"
                            error={!!errors.tracking}
                            helperText={errors?.tracking?.message}
                            variant="outlined"
                            fullWidth
                          />
                        </FormControl>
                      )}
                    />
                    <Controller
                      render={({ field }) => (
                        <FormControl fullWidth className="my-8">
                          <FormLabel
                            className="font-medium text-14"
                            component="legend"
                          >
                            Shipping Provider
                          </FormLabel>
                          <Select {...field} variant="outlined" fullWidth>
                            <MenuItem value="TCS">TCS</MenuItem>
                            <MenuItem value="Leopard">Leopard</MenuItem>
                            <MenuItem value="Pak Courier">Pak Courier</MenuItem>
                          </Select>
                        </FormControl>
                      )}
                      name="shippingProvider"
                      control={control}
                    />
                    <Controller
                      render={({ field }) => (
                        <FormControl fullWidth className="">
                          <FormLabel
                            className="font-medium text-14"
                            component="legend"
                          >
                            Shipped On
                          </FormLabel>
                          <Select {...field} variant="outlined" fullWidth>
                            <MenuItem value="10">Ten (10)</MenuItem>
                            <MenuItem value="20">Twenty (20)</MenuItem>
                            <MenuItem value="30">Thirty (30)</MenuItem>
                          </Select>
                        </FormControl>
                      )}
                      name="shippedOn"
                      control={control}
                    />
                    <Controller
                      render={({ field }) => (
                        <FormControl fullWidth className="my-16">
                          <FormLabel
                            className="font-medium text-14"
                            component="legend"
                          >
                            Shipping Status
                          </FormLabel>
                          <Select {...field} variant="outlined" fullWidth>
                            <MenuItem value="Ready to Ship">
                              Ready to Ship
                            </MenuItem>
                            <MenuItem value="Shipped">Shipped</MenuItem>
                            <MenuItem value="in Transit">in Transit</MenuItem>
                          </Select>
                        </FormControl>
                      )}
                      name="shippingStatus"
                      control={control}
                    />
                    <Button
                      variant="contained"
                      color="secondary"
                      className="w-full mt-24"
                      aria-label="Register"
                      disabled={_.isEmpty(dirtyFields) || !isValid}
                      type="submit"
                      size="large"
                      style={{ borderRadius: "10px" }}
                    >
                      Save
                    </Button>
                  </div>
                  <Typography
                    id="alert-dialog-title"
                    variant="h5"
                    className="font-semibold"
                  >
                    {"Print/Download"}{" "}
                  </Typography>

                  <div className="flex flex-col w-full items-start justify-start">
                    <Controller
                      name="invoice"
                      control={control}
                      render={({ field }) => (
                        <FormControl
                          className="items-center"
                          error={!!errors.invoice}
                        >
                          <FormControlLabel
                            label="Invoice"
                            control={<Checkbox size="large" {...field} />}
                          />
                          <FormHelperText>
                            {errors?.invoice?.message}
                          </FormHelperText>
                        </FormControl>
                      )}
                    />
                    <Controller
                      name="packing"
                      control={control}
                      render={({ field }) => (
                        <FormControl
                          className="items-center"
                          error={!!errors.packing}
                        >
                          <FormControlLabel
                            label="Packing Slip"
                            control={<Checkbox size="large" {...field} />}
                          />
                          <FormHelperText>
                            {errors?.packing?.message}
                          </FormHelperText>
                        </FormControl>
                      )}
                    />
                    <Button
                      variant="contained"
                      color="secondary"
                      className="w-full mt-24"
                      aria-label="Register"
                      disabled={_.isEmpty(dirtyFields) || !isValid}
                      type="submit"
                      size="large"
                      style={{ borderRadius: "10px" }}
                    >
                      Download and Print
                    </Button>
                  </div>
                </div>
              </div>
            </form>
          </DialogContentText>
        </DialogContent>
      </Dialog>
    </div>
  );
}
