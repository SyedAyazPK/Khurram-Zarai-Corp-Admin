import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useDispatch, useSelector } from "react-redux";
import {
  closeViewDialog,
  openViewDialog,
  selectViewDialogState,
} from "app/store/orderSlice";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {
  Divider,
  FormControl,
  FormLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import FuseSvgIcon from "@fuse/core/FuseSvgIcon";

/**
 * Form Validation Schema
 */
const schema = yup.object().shape({});

const defaultValues = {
  billing: "",
};

export default function OrderViewDialog({ dataObject }) {
  const dispatch = useDispatch();
  const open = useSelector(selectViewDialogState);

  const { control, formState, handleSubmit, reset, setValue } = useForm({
    mode: "onChange",
    defaultValues: {
      street: "",
      email: "",
      phone: "",
    },
    resolver: yupResolver(schema),
  });

  const { isValid, dirtyFields, errors, setError } = formState;

  function onSubmit(data) {
    console.log("data", data);
  }

  const handleClickOpen = () => {
    dispatch(openViewDialog());
  };

  const handleClose = () => {
    dispatch(closeViewDialog());
  };

  const dummy = ["a", "b", "c"];

  React.useEffect(() => {
    setValue("email", dataObject?.guestInfo?.email || dataObject?.User?.email);
    setValue("phone", dataObject?.guestInfo?.phone || dataObject?.User?.phone);
    setValue("street", dataObject?.guestInfo?.street || "");
  }, [dataObject]);

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        maxWidth="sm"
        fullWidth
      >
        <div className="flex w-full justify-end items-end p-24">
          <FuseSvgIcon
            className="text-48 cursor-pointer mr-8"
            size={24}
            color="action"
          >
            material-twotone:print
          </FuseSvgIcon>
          <FuseSvgIcon
            className="text-48 cursor-pointer"
            size={24}
            color="action"
            onClick={handleClose}
          >
            material-twotone:close
          </FuseSvgIcon>
        </div>

        <DialogTitle
          id="alert-dialog-title"
          className="text-center items-center flex justify-center"
        >
          {"Order #"}
          {dataObject.id}
        </DialogTitle>
        <DialogContent className="w-full">
          <DialogContentText id="alert-dialog-description" color="text.primary">
            <form
              name="registerForm"
              noValidate
              className="flex flex-col w-full mt-8"
              onSubmit={handleSubmit(onSubmit)}
            >
              <div className="border-1 rounded p-16">
                {/* <Controller
                  name="street"
                  control={control}
                  render={({ field }) => (
                    <FormControl fullWidth className="">
                      <FormLabel
                        className="font-medium text-14"
                        component="legend"
                      >
                        Billing Address
                      </FormLabel>
                      <TextField
                        {...field}
                        className=" mb-8  "
                        autoFocus
                        type="text"
                        error={!!errors.billing}
                        helperText={errors?.billing?.message}
                        variant="outlined"
                        fullWidth
                      />
                    </FormControl>
                  )}
                /> */}
                <Controller
                  name="street"
                  control={control}
                  render={({ field }) => (
                    <FormControl fullWidth className="">
                      <FormLabel
                        className="font-medium text-14"
                        component="legend"
                      >
                        Street Address
                      </FormLabel>
                      <TextField
                        {...field}
                        className=""
                        autoFocus
                        type="text"
                        error={!!errors.shipping}
                        helperText={errors?.shipping?.message}
                        variant="outlined"
                        fullWidth
                      />
                    </FormControl>
                  )}
                />
                <Divider className="my-16" />

                <div className="md:flex w-full justify-between ">
                  <Controller
                    name="email"
                    control={control}
                    render={({ field }) => (
                      <FormControl fullWidth className="md:mr-16">
                        <FormLabel
                          className="font-medium text-14"
                          component="legend"
                        >
                          Email
                        </FormLabel>
                        <TextField
                          {...field}
                          className=" mb-8  "
                          autoFocus
                          type="text"
                          error={!!errors.email}
                          helperText={errors?.email?.message}
                          variant="outlined"
                          fullWidth
                        />
                      </FormControl>
                    )}
                  />
                  <Controller
                    name="phone"
                    control={control}
                    render={({ field }) => (
                      <FormControl fullWidth className="">
                        <FormLabel
                          className="font-medium text-14"
                          component="legend"
                        >
                          Phone
                        </FormLabel>
                        <TextField
                          {...field}
                          className=""
                          autoFocus
                          type="text"
                          error={!!errors.phone}
                          helperText={errors?.phone?.message}
                          variant="outlined"
                          fullWidth
                        />
                      </FormControl>
                    )}
                  />
                </div>
                <div className="md:flex w-full justify-between mb-8">
                  {/* <Controller
                    name='customer'
                    control={control}
                    render={({ field }) => (
                      <FormControl fullWidth className='md:mr-16'>
                        <FormLabel
                          className='font-medium text-14'
                          component='legend'
                        >
                          Customer
                        </FormLabel>
                        <TextField
                          {...field}
                          className=' mb-8  '
                          autoFocus
                          type='text'
                          error={!!errors.customer}
                          helperText={errors?.customer?.message}
                          variant='outlined'
                          fullWidth
                        />
                      </FormControl>
                    )}
                  /> */}
                  {/* <Controller
                    render={({ field }) => (
                      <FormControl fullWidth className=''>
                        <FormLabel
                          className='font-medium text-14'
                          component='legend'
                        >
                          Status
                        </FormLabel>
                        <Select {...field} variant='outlined' fullWidth>
                          <MenuItem value='Proccessing'> Pending</MenuItem>
                          <MenuItem value='Delivered'> Delivered</MenuItem>
                          <MenuItem value='In Process'> In Process</MenuItem>
                          <MenuItem value='Cancelled'> Cancelled</MenuItem>
                        </Select>
                      </FormControl>
                    )}
                    name='orderStatus'
                    control={control}
                  /> */}
                </div>
              </div>

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
                <Typography className="w-full font-semibold uppercase">
                  Region
                </Typography>
              </div>

              {dataObject?.products?.map((it) => {
                const item = it.ProductId;
                return (
                  <div className="flex w-full p-16 align-center justify-center">
                    <Typography className="w-full">{item.title}</Typography>
                    <Typography className="w-full">{item.quantity}</Typography>
                    <Typography className="w-full">{item.price} PKR</Typography>
                    <Typography className="w-full">
                      {it.quantity * (item.discountedPrice || item.price)} PKR
                    </Typography>
                    <Typography className="w-full">Pakistan</Typography>
                  </div>
                );
              })}

              <div className="border-1 rounded p-16 flex flex-col justify-end items-end">
                <div className="flex">
                  <Typography>Items Subtotal:</Typography>
                  <Typography className="font-semibold ml-4">
                    {dataObject?.price}
                  </Typography>
                </div>
                <div className="flex">
                  <Typography>Shipping:</Typography>
                  <Typography className="font-semibold ml-4">
                    {" "}
                    Cash on Delivery
                  </Typography>
                </div>
                <div className="flex">
                  <Typography>Total:</Typography>
                  <Typography className="font-semibold ml-4">
                    {dataObject?.price}
                  </Typography>
                </div>
              </div>

              {/* <Button
                variant="contained"
                color="secondary"
                className="w-full mt-24"
                aria-label="Register"
                disabled={_.isEmpty(dirtyFields) || !isValid}
                type="submit"
                size="large"
              >
                Save
              </Button> */}
            </form>
          </DialogContentText>
        </DialogContent>
      </Dialog>
    </div>
  );
}
