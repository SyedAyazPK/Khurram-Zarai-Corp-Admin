import * as React from "react";
import Button from "@mui/material/Button";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";
import Checkbox from "@mui/material/Checkbox";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
import * as yup from "yup";
import _ from "@lodash";

import FormHelperText from "@mui/material/FormHelperText";

import { Autocomplete, FormLabel, MenuItem, Select } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  addProduct,
  getLatestSku,
  getProducts,
  selectLatestSku,
} from "app/store/productSlice";
import {
  getCategories,
  selectCategories,
  uploadImage,
} from "app/store/categorySlice";
import { getBrands, selectBrands } from "app/store/brandSlice";
import { useEffect } from "react";
import { useState } from "react";

/**
 * Form Validation Schema
 */
const schema = yup.object().shape({
  sku: yup.number().required("You must enter sku"),
  title: yup.string().required("You must enter product title"),
  description: yup.string().min(20, "Must be atleat 20 characters"),
  shortDescription: yup
    .string()
    .required("You must enter short description")
    .min(20, "Must be atleat 20 characters"),
  price: yup
    .number()
    .required("You must enter price")
    .positive("Price cannot be less than 0"),
  stock: yup
    .number("Should be a number")
    .positive("Stock cannot be less than 0"),
  discountedPrice: yup
    .number("Should be a number")
    .nullable(true)
    .lessThan(
      yup.ref("price"),
      "Discounted price cannot be more than regular price"
    )
    .positive("Price cannot be less than 0")
    .transform((v, o) => (o === "" ? null : v)),
});

const defaultValues = {
  sku: 0,
  title: "",
  stock: "",
  description: "",
  shortDescription: "",
  price: "",
  Company: "",
  Category: "",
  price: "",
  discountedPrice: "",
  othersTitle: "",
  othersDescription: "",
};

export default function AddProduct() {
  const dispatch = useDispatch();
  const categories = useSelector(selectCategories);
  const brands = useSelector(selectBrands);
  const latestSku = useSelector(selectLatestSku);

  const [productImage, setProductImage] = useState("");
  const [open, setOpen] = React.useState(false);

  useEffect(() => {
    dispatch(getCategories(`limit=100000`));
    dispatch(getBrands());
    dispatch(getLatestSku());
  }, []);

  const { control, formState, handleSubmit, reset, register, setValue } =
    useForm({
      mode: "onChange",
      defaultValues,
      resolver: yupResolver(schema),
    });

  useEffect(() => {
    setValue("sku", latestSku);
  }, [latestSku]);

  const { isValid, dirtyFields, errors, setError } = formState;

  function onSubmit(data) {
    const updatedData = {
      ...data,
    };
    const options = {};
    if (Boolean(data.othersDescription?.length))
      options.packSizeDescription = updatedData.othersDescription;
    if (Boolean(data.othersTitle?.length)) {
      options.packSize = updatedData.othersTitle;
      updatedData.options = options;
    }
    if (Boolean(productImage?.length)) updatedData.images = [productImage];

    delete updatedData.othersTitle;
    delete updatedData.othersDescription;
    // delete updatedData.discountedPrice;

    dispatch(
      addProduct({
        ...updatedData,
        // inventory: data.categories,
      })
    ).then(() => reset(defaultValues));
    // .then(() => dispatch(getProducts()))
  }

  return (
    <div className="w-full p-24">
      <Typography className=" title ">Products</Typography>
      <Typography className="mb-24">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod.
      </Typography>

      <form
        name="registerForm"
        noValidate
        className="flex flex-col justify-center w-full mt-32"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="md:flex">
          <div className="w-full md:mr-16">
            <Controller
              name="sku"
              control={control}
              render={({ field }) => (
                <>
                  <TextField
                    {...field}
                    className="  "
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
          </div>

          <Controller
            name="stock"
            control={control}
            render={({ field }) => (
              <>
                <TextField
                  {...field}
                  className="     mb-16 md:mb-0"
                  label="Stock Quantity"
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
                  required
                />
              </>
            )}
          />
        </div>
        <div className="w-full md:flex mb-24">
          <Controller
            render={({ field }) => (
              <FormControl fullWidth>
                <FormLabel className="font-medium text-14" component="legend">
                  Upload Image
                </FormLabel>
                <TextField
                  {...field}
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
                <FormHelperText>Image Dimension 500 x 500</FormHelperText>
              </FormControl>
            )}
            name="image"
            control={control}
          />

          <Controller
            name="shortDescription"
            control={control}
            render={({ field }) => (
              <FormControl fullWidth className="md:mx-16" required>
                <FormLabel className="font-medium text-14" component="legend">
                  Short Description
                </FormLabel>
                <TextField
                  {...field}
                  className=""
                  autoFocus
                  type="text"
                  error={!!errors.shortDescription}
                  helperText={errors?.shortDescription?.message}
                  variant="outlined"
                  fullWidth
                />
              </FormControl>
            )}
          />
          <Controller
            render={({ field }) => (
              <FormControl fullWidth required className="">
                <FormLabel className="font-medium text-14" component="legend">
                  Brand
                </FormLabel>
                <Select {...field} variant="outlined" fullWidth>
                  {brands?.results?.map((brand) => (
                    <MenuItem value={brand.id} key={brand.id}>
                      {brand.title}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            )}
            name="Company"
            control={control}
          />
        </div>
        <div className="w-full md:flex mb-24">
          <Controller
            render={({ field }) => (
              <FormControl fullWidth required className="md:w-1/3">
                <FormLabel className="font-medium text-14" component="legend">
                  Category
                </FormLabel>
                <Select {...field} variant="outlined" fullWidth>
                  {categories?.results?.map((category) => (
                    <MenuItem value={category.id} key={category.id}>
                      {category.title}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            )}
            name="Category"
            control={control}
          />
          <Controller
            name="price"
            control={control}
            render={({ field }) => (
              <FormControl fullWidth required className="md:w-1/3 md:mx-16">
                <FormLabel className="font-medium text-14" component="legend">
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

          <FormControl fullWidth className="md:w-1/3 ">
            <FormLabel className="font-medium text-14" component="legend">
              Discounted Price
            </FormLabel>
            <TextField
              {...register("discountedPrice")}
              className="  md:mr-16"
              type="text"
              error={!!errors.discountedPrice}
              helperText={errors?.discountedPrice?.message}
              variant="outlined"
              fullWidth
            />
          </FormControl>
        </div>

        {/* <div className='md:flex w-full'>
          <Controller
            name='manageStock'
            control={control}
            render={({ field }) => (
              <FormControl error={!!errors.manageStock}>
                <FormControlLabel
                  label='Manage Stocks'
                  control={<Checkbox size='small' {...field} />}
                />
                <FormHelperText>{errors?.manageStock?.message}</FormHelperText>
              </FormControl>
            )}
          />

          <Controller
            name='stock'
            control={control}
            render={({ field }) => (
              <>
                <TextField
                  {...field}
                  className=' md:w-1/3 md:mr-16 mb-16 md:mb-0'
                  label='Stock Quantity'
                  type='text'
                  error={!!errors.stock}
                  helperText={errors?.stock?.message}
                  variant='outlined'
                  required
                  fullWidth
                />
              </>
            )}
          />
        </div> */}

        <Typography className="text-16 font-semibold">Others</Typography>
        <div className="w-full md:flex my-24">
          <Controller
            name="othersTitle"
            control={control}
            render={({ field }) => (
              <FormControl fullWidth className="md:mr-16">
                <FormLabel className="font-medium text-14" component="legend">
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
            name="othersDescription"
            control={control}
            render={({ field }) => (
              <FormControl fullWidth className="md:mr-16">
                <FormLabel className="font-medium text-14" component="legend">
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
          disabled={_.isEmpty(dirtyFields) || !isValid}
          type="submit"
          size="large"
        >
          Add Product
        </Button>
      </form>
    </div>
  );
}
