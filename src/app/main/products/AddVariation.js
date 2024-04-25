import * as React from 'react';
import Button from '@mui/material/Button';
import { yupResolver } from '@hookform/resolvers/yup';
import { Controller, useForm } from 'react-hook-form';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import * as yup from 'yup';
import _ from '@lodash';
import { Autocomplete, FormLabel, MenuItem, Select } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { getCategories, selectCategories } from 'app/store/categorySlice';
import { getBrands, selectBrands } from 'app/store/brandSlice';
import { useEffect } from 'react';
import { useState } from 'react';
import { showMessage } from 'app/store/fuse/messageSlice';
import { addAttribute, selectProductVariation } from 'app/store/productSlice';

/**
 * Form Validation Schema
 */
const schema = yup.object().shape({
  title: yup.string().required('You must enter variation title'),
  variations: yup.array().min(1, 'Select at least one.'),
});

const defaultValues = {
  title: '',
  variations: [],
};

const options = [];

export default function AddVariation() {
  const dispatch = useDispatch();
  const variationArrays = useSelector(selectProductVariation);

  const { control, formState, handleSubmit, reset } = useForm({
    mode: 'onChange',
    defaultValues,
    resolver: yupResolver(schema),
  });

  const { isValid, dirtyFields, errors, setError } = formState;

  function onSubmit(data) {
    console.log(data, 'data');
    dispatch(addAttribute(data));

    reset(defaultValues);
  }

  return (
    <div className='w-full p-24'>
      <Typography className=' title '>Add Product Attributes</Typography>
      <Typography className='mb-24'>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod.
      </Typography>

      <form
        name='registerForm'
        noValidate
        className='flex flex-col justify-center w-full mt-32'
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className='w-full   my-24'>
          <Typography className='mb-8 font-medium text-14'>Title</Typography>
          <Controller
            name='title'
            control={control}
            render={({ field }) => (
              <>
                <TextField
                  {...field}
                  className=' md:w-1/3 md:mr-16 mb-16 md:mb-0'
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

        <div className=' mb-16'>
          <Typography className='mb-8 font-medium text-14'>
            Variations
          </Typography>
          <Controller
            name='variations'
            control={control}
            defaultValue={[]}
            render={({ field: { onChange, value, onBlur, ref } }) => (
              <Autocomplete
                className='mt-8 mb-16'
                multiple
                freeSolo
                options={options}
                value={value}
                onChange={(event, newValue) => {
                  onChange(newValue);
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    placeholder='Select multiple tags'
                    variant='outlined'
                    InputLabelProps={{
                      shrink: true,
                    }}
                    error={!!errors.variations}
                    helperText={errors?.variations?.message}
                    onBlur={onBlur}
                    inputRef={ref}
                  />
                )}
              />
            )}
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
          Add Variation
        </Button>
      </form>
    </div>
  );
}
