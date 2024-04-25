import { Controller, useForm } from "react-hook-form";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import _ from "@lodash";
import clsx from "clsx";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import FormHelperText from "@mui/material/FormHelperText";
import { useDispatch, useSelector } from "react-redux";
import {
  closeEditProductDialog,
  getProducts,
  selectEditProductDialogState,
  updateProduct,
} from "app/store/productSlice";
import {
  Autocomplete,
  Avatar,
  Checkbox,
  Dialog,
  DialogContent,
  DialogContentText,
  FormControlLabel,
} from "@mui/material";
import { uploadImage } from "app/store/categorySlice";
import { useEffect, useState } from "react";

/**
 * Form Validation Schema
 */
const schema = yup.object().shape({
  // sku: yup.number().required('You must enter sku'),
  // title: yup.string().required('You must enter product title'),
  // description: yup.string().min(20, 'Must be atleat 20 characters'),
  // shortDescription: yup
  //   .string()
  //   .required('You must enter short description')
  //   .min(20, 'Must be atleat 20 characters'),
  // price: yup.number().required('You must enter price'),
  // discountedPrice: yup
  //   .number('Should be a number')
  //   .nullable(true)
  //   .lessThan(
  //     yup.ref('price'),
  //     'Discounted price cannot be more than regular price'
  //   )
  //   .positive('Price cannot be less than 0')
  //   .transform((v, o) => (o === '' ? null : v)),
});

function EditProduct({ dataObject }) {
  console.log(
    "🚀 ~ file: EditProduct.js:57 ~ EditProduct ~ dataObject:",
    dataObject
  );
  const dispatch = useDispatch();
  //   const dataObject = useSelector(selectEditProductDialogData);
  const open = useSelector(selectEditProductDialogState);
  const { handleSubmit, register, reset, control, watch, formState } = useForm({
    defaultValues: dataObject,
    mode: "all",
    resolver: yupResolver(schema),
  });
  const [productImage, setProductImage] = useState("");

  const { isValid, dirtyFields, errors, touchedFields } = formState;

  const data = watch();
  console.log("🚀 ~ file: EditProduct.js:72 ~ EditProduct ~ data:", data);

  const handleClose = () => {
    dispatch(getProducts());
    dispatch(closeEditProductDialog());
  };

  useEffect(() => {
    if (dataObject?.images?.length) {
      setProductImage(dataObject?.images?.[0]);
    }
  }, [dataObject]);

  return (
    <div className="flex w-full">
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        maxWidth="md"
        fullWidth
      >
        <DialogContent className="w-full">
          <DialogContentText id="alert-dialog-description" color="text.primary">
            <form
              className="w-full"
              onSubmit={handleSubmit((_data) => {
                if (Boolean(productImage?.length))
                  _data.images = [productImage];
                if (typeof _data.discountedPrice === "string") {
                  _data.discountedPrice = null;
                }
                dispatch(
                  updateProduct({
                    ..._data,
                    Company: _data.Company?.id,
                    Category: _data.Category?.id,
                  })
                ).then(() => handleClose());
              })}
            >
              <Controller
                name="sku"
                control={control}
                render={({ field }) => (
                  <>
                    <TextField
                      {...field}
                      className=" md:w-1/3"
                      label="SKU"
                      autoFocus
                      type="number"
                      error={!!errors.sku}
                      helperText={errors?.sku?.message}
                      variant="outlined"
                      required
                      fullWidth
                    />
                    <FormHelperText>
                      This needs to be unique for each product
                    </FormHelperText>
                  </>
                )}
              />
              <div className="w-full md:flex my-24">
                <Controller
                  name="title"
                  control={control}
                  render={({ field }) => (
                    <>
                      <TextField
                        {...field}
                        className=" md:w-1/3 md:mr-16 mb-16 md:mb-0"
                        label="Name"
                        autoFocus
                        type="text"
                        error={!!errors.title}
                        helperText={errors?.title?.message}
                        variant="outlined"
                        required
                        fullWidth
                      />
                    </>
                  )}
                />
                <Controller
                  name="description"
                  control={control}
                  render={({ field }) => (
                    <>
                      <TextField
                        {...field}
                        className=" md:w-2/3"
                        label="Description"
                        autoFocus
                        type="text"
                        error={!!errors.description}
                        helperText={errors?.description?.message}
                        variant="outlined"
                        fullWidth
                      />
                    </>
                  )}
                />
              </div>
              <div className="w-full md:flex mb-24">
                <FormControl fullWidth>
                  <FormLabel className="font-medium text-14" component="legend">
                    Upload Image
                  </FormLabel>
                  <Avatar src={productImage} />
                  <TextField
                    variant="outlined"
                    fullWidth
                    type={"file"}
                    accept="image/*"
                    onChange={(e) =>
                      dispatch(uploadImage(e.target.files[0])).then((resp) =>
                        setProductImage(resp.payload.data)
                      )
                    }
                  />
                </FormControl>
              </div>
              <Controller
                name="shortDescription"
                control={control}
                render={({ field }) => (
                  <FormControl fullWidth className="md:mb-16">
                    <FormLabel
                      className="font-medium text-14"
                      component="legend"
                    >
                      Short Description
                    </FormLabel>
                    <TextField
                      {...field}
                      className="  "
                      autoFocus
                      type="text"
                      error={!!errors.description}
                      helperText={errors?.description?.message}
                      variant="outlined"
                      fullWidth
                    />
                  </FormControl>
                )}
              />
              <div className="w-full md:flex mb-24">
                <Controller
                  name="price"
                  control={control}
                  render={({ field }) => (
                    <FormControl
                      fullWidth
                      required
                      className="md:w-1/3 md:mr-16"
                    >
                      <FormLabel
                        className="font-medium text-14"
                        component="legend"
                      >
                        Regular Price
                      </FormLabel>
                      <TextField
                        {...field}
                        className="   md:mr-16"
                        autoFocus
                        type="text"
                        error={!!errors.price}
                        helperText={errors?.price?.message}
                        variant="outlined"
                        required
                        fullWidth
                      />
                    </FormControl>
                  )}
                />
                <Controller
                  name="discountedPrice"
                  control={control}
                  render={({ field }) => (
                    <FormControl fullWidth className="md:w-1/3 md:mx-16">
                      <FormLabel
                        className="font-medium text-14"
                        component="legend"
                      >
                        Discounted Price
                      </FormLabel>
                      <TextField
                        {...field}
                        className="  md:mr-16"
                        autoFocus
                        type="text"
                        error={!!errors.discountedPrice}
                        helperText={errors?.discountedPrice?.message}
                        variant="outlined"
                        fullWidth
                      />
                    </FormControl>
                  )}
                />
              </div>

              <div className="md:flex w-full">
                <Controller
                  name="stock"
                  control={control}
                  render={({ field }) => (
                    <>
                      <TextField
                        {...field}
                        className=" md:w-1/3 md:mr-16 mb-16 md:mb-0"
                        label="Stock Quantity"
                        autoFocus
                        type="text"
                        error={!!errors.stock}
                        helperText={errors?.stock?.message}
                        variant="outlined"
                        required
                        fullWidth
                      />
                    </>
                  )}
                />
              </div>

              <Typography className="text-16 font-semibold">Others</Typography>
              <div className="w-full md:flex my-24">
                <Controller
                  name="options.packSize"
                  control={control}
                  render={({ field }) => (
                    <FormControl fullWidth className="md:mr-16">
                      <FormLabel
                        className="font-medium text-14"
                        component="legend"
                      >
                        Title
                      </FormLabel>
                      <TextField
                        {...field}
                        className=""
                        label="E.g Weight"
                        type="text"
                        error={!!errors.othersTitle}
                        helperText={errors?.othersTitle?.message}
                        variant="outlined"
                        fullWidth
                      />
                    </FormControl>
                  )}
                />
                <Controller
                  name="options.packSizeDescription"
                  control={control}
                  render={({ field }) => (
                    <FormControl fullWidth className="md:mr-16">
                      <FormLabel
                        className="font-medium text-14"
                        component="legend"
                      >
                        Description
                      </FormLabel>
                      <TextField
                        {...field}
                        className=""
                        label="E.g 5kg"
                        type="text"
                        error={!!errors.othersDescription}
                        helperText={errors?.othersDescription?.message}
                        variant="outlined"
                        fullWidth
                      />
                    </FormControl>
                  )}
                />
              </div>

              <Button
                variant="contained"
                color="secondary"
                className="w-full mt-24"
                aria-label="add"
                disabled={!isValid}
                type="submit"
                size="large"
              >
                Save Product
              </Button>
            </form>
          </DialogContentText>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default EditProduct;
