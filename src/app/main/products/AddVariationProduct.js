import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { yupResolver } from '@hookform/resolvers/yup';
import { Controller, useForm } from 'react-hook-form';
import Checkbox from '@mui/material/Checkbox';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';
import * as yup from 'yup';
import _ from '@lodash';
import AvatarGroup from '@mui/material/AvatarGroup';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import FormHelperText from '@mui/material/FormHelperText';
import jwtService from '../../auth/services/jwtService';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import { Autocomplete, FormLabel, MenuItem, Select } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import {
  addProduct,
  getProducts,
  selectAttributes,
  selectProductVariation,
} from 'app/store/productSlice';
import {
  getCategories,
  selectCategories,
  uploadImage,
} from 'app/store/categorySlice';
import { getBrands, selectBrands } from 'app/store/brandSlice';
import { useEffect } from 'react';
import { useState } from 'react';
import { showMessage } from 'app/store/fuse/messageSlice';
import VariationAccordian from './VariationAccordian';

/**
 * Form Validation Schema
 */
const schema = yup.object().shape({
  title: yup.string().required('You must enter product title'),
});

const defaultValues = {
  title: '',
};

export default function AddVariationProduct() {
  const dispatch = useDispatch();
  const categories = useSelector(selectCategories);
  const brands = useSelector(selectBrands);
  const variations = useSelector(selectProductVariation);
  const attributes = useSelector(selectAttributes);

  const [productImage, setProductImage] = useState('');
  const [open, setOpen] = React.useState(false);

  useEffect(() => {
    dispatch(getCategories());
    dispatch(getBrands());
  }, []);

  const { control, formState, handleSubmit, reset } = useForm({
    mode: 'onChange',
    defaultValues,
    resolver: yupResolver(schema),
  });

  const { isValid, dirtyFields, errors, setError } = formState;

  function onSubmit(data) {
    // let attributes = [];

    // Object.entries(data).forEach(([key, value]) => {
    //   variations.find((e) => e.title === key)
    //     ? attributes.push({ [key]: value })
    //     : {
    //         /* same result as above, but a different function return type */
    //       };
    // });

    const updatedData = { ...data, attributes: attributes };
    dispatch(addProduct(updatedData));
    // dispatch(
    //   showMessage({
    //     message: 'Product Added',
    //     autoHideDuration: 2000,
    //     variant: 'success',
    //     anchorOrigin: {
    //       vertical: 'top',
    //       horizontal: 'right',
    //     },
    //   })
    // );
  }

  return (
    <div className='w-full p-24'>
      <Typography className=' title '>Add Variation Product</Typography>
      <Typography className='mb-24'>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod.
      </Typography>

      <VariationAccordian />

      <form
        name='registerForm'
        noValidate
        className='flex flex-col justify-center w-full mt-32'
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className='w-full md:flex my-24'>
          <div className='w-full md:mr-16'>
            <FormLabel className='font-medium text-14' component='legend'>
              Title
            </FormLabel>
            <Controller
              name='title'
              control={control}
              render={({ field }) => (
                <>
                  <TextField
                    {...field}
                    className=' w-full  md:mr-16 mb-16 md:mb-0'
                    // label='Name'
                    autoFocus
                    type='text'
                    error={!!errors.title}
                    helperText={errors?.title?.message}
                    variant='outlined'
                    required
                    fullWidth
                  />
                </>
              )}
            />
          </div>

          <Controller
            render={({ field }) => (
              <FormControl fullWidth required className=''>
                <FormLabel className='font-medium text-14' component='legend'>
                  Brand
                </FormLabel>
                <Select {...field} variant='outlined' fullWidth>
                  {brands?.results?.map((brand) => (
                    <MenuItem value={brand._id} key={brand._id}>
                      {brand.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            )}
            name='brands'
            control={control}
          />
          <Controller
            render={({ field }) => (
              <FormControl fullWidth required className='md:ml-16'>
                <FormLabel className='font-medium text-14' component='legend'>
                  Category
                </FormLabel>
                <Select {...field} variant='outlined' fullWidth>
                  {categories?.results?.map((category) => (
                    <MenuItem value={category._id} key={category._id}>
                      {category.categoryName}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            )}
            name='categories'
            control={control}
          />
        </div>

        <Button
          variant='contained'
          color='secondary'
          className='w-full mt-24'
          aria-label='add'
          disabled={_.isEmpty(dirtyFields) || !isValid}
          type='submit'
          size='large'
        >
          Add Product
        </Button>
      </form>
    </div>
  );
}
