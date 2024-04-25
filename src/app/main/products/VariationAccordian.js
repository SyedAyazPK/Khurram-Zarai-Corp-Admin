import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useDispatch, useSelector } from 'react-redux';
import { selectProductVariation, setAttributes } from 'app/store/productSlice';
import { Controller, useForm } from 'react-hook-form';
import {
  Button,
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  TextField,
} from '@mui/material';
import { uploadImage } from 'app/store/categorySlice';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { showMessage } from 'app/store/fuse/messageSlice';

/**
 * Form Validation Schema
 */
const schema = yup.object().shape({
  sku: yup.string().required('You must enter sku'),
  description: yup.string().min(20, 'Must be atleat 20 characters'),
  shortDescription: yup
    .string()
    .required('You must enter short description')
    .min(20, 'Must be atleat 20 characters'),
  price: yup.number().required('You must enter price'),
  discountedPrice: yup
    .number()
    .nullable()
    .lessThan(
      yup.ref('price'),
      'Discounted price cannot be more than regular price'
    ),
});

const defaultValues = {
  sku: '',
  description: '',
  shortDescription: '',
  inventory: '',
  price: '',
  discountedPrice: '',
};

export default function VariationAccordian() {
  const dispatch = useDispatch();
  const [expanded, setExpanded] = React.useState(false);
  const attributes = useSelector(selectProductVariation);

  const { control, formState, handleSubmit, reset } = useForm({
    mode: 'onChange',
    defaultValues,
    resolver: yupResolver(schema),
  });

  const { isValid, dirtyFields, errors, setError } = formState;

  var parts = [];
  var attributesAttributes = attributes.map((variation) =>
    parts.push(variation.attributes)
  );

  var result = parts.reduce((a, b) =>
    a.reduce((r, v) => r.concat(b.map((w) => [].concat(v, w))), [])
  );

  //   console.log(result.map((a) => a.join('; ')));

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  function onSubmit(_data, variation) {
    let attributesArray = [];
    variation.map((item, index) =>
      attributesArray.push({ [attributes[index].title]: item })
    );
    const updatedData = { ..._data, attributesArray };

    console.log(attributesArray, 'variation');
    console.log(_data, 'data');
    dispatch(setAttributes(updatedData));
    dispatch(
      showMessage({
        message: ' Variation Added, Please enter remaining details',
        autoHideDuration: 2000,
        variant: 'success',
        anchorOrigin: {
          vertical: 'top',
          horizontal: 'right',
        },
      })
    );
  }

  return (
    <div>
      {result.map((attribute, index) => (
        <Accordion
          expanded={expanded === index}
          onChange={handleChange(index)}
          key={index}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls='panel1bh-content'
            id='panel1bh-header'
          >
            <Typography sx={{ width: '33%', flexShrink: 0 }}>
              Variation {index + 1}
            </Typography>
            <Typography sx={{ color: 'text.secondary' }}>
              {attribute.join(', ')}
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <form
              name='registerForm'
              noValidate
              className='flex flex-col justify-center w-full mt-32'
              onSubmit={handleSubmit((data) => onSubmit(data, attribute))}
            >
              <Controller
                name='sku'
                control={control}
                render={({ field }) => (
                  <>
                    <TextField
                      {...field}
                      className=' md:w-1/3'
                      label='SKU'
                      autoFocus
                      type='text'
                      error={!!errors.sku}
                      helperText={errors?.sku?.message}
                      variant='outlined'
                      required
                      fullWidth
                    />
                    <FormHelperText>
                      This needs to be unique for each product
                    </FormHelperText>
                  </>
                )}
              />
              <div className='w-full md:flex my-24'>
                <Controller
                  name='description'
                  control={control}
                  render={({ field }) => (
                    <>
                      <TextField
                        {...field}
                        className=' md:w-2/3'
                        label='Description'
                        autoFocus
                        type='text'
                        error={!!errors.description}
                        helperText={errors?.description?.message}
                        variant='outlined'
                        fullWidth
                      />
                    </>
                  )}
                />
                <Controller
                  render={({ field }) => (
                    <FormControl fullWidth className='ml-16'>
                      <TextField
                        {...field}
                        variant='outlined'
                        fullWidth
                        type={'file'}
                        accept='image/*'
                        onChange={(e) =>
                          dispatch(uploadImage(e.target.files[0])).then(
                            (resp) => setProductImage(resp.payload.data)
                          )
                        }
                      />
                    </FormControl>
                  )}
                  name='image'
                  control={control}
                />
              </div>
              <div className='w-full md:flex mb-24'>
                <Controller
                  name='shortDescription'
                  control={control}
                  render={({ field }) => (
                    <FormControl fullWidth className=' ' required>
                      <FormLabel
                        className='font-medium text-14'
                        component='legend'
                      >
                        Short Description
                      </FormLabel>
                      <TextField
                        {...field}
                        className=''
                        autoFocus
                        type='text'
                        error={!!errors.description}
                        helperText={errors?.description?.message}
                        variant='outlined'
                        fullWidth
                      />
                    </FormControl>
                  )}
                />
              </div>
              <div className='w-full md:flex mb-24'>
                <Controller
                  name='price'
                  control={control}
                  render={({ field }) => (
                    <FormControl
                      fullWidth
                      required
                      className='md:w-1/3 md:mr-16'
                    >
                      <FormLabel
                        className='font-medium text-14'
                        component='legend'
                      >
                        Regular Price
                      </FormLabel>
                      <TextField
                        {...field}
                        className=' '
                        autoFocus
                        type='text'
                        error={!!errors.price}
                        helperText={errors?.price?.message}
                        variant='outlined'
                        required
                        fullWidth
                      />
                    </FormControl>
                  )}
                />
                <Controller
                  name='discountedPrice'
                  control={control}
                  render={({ field }) => (
                    <FormControl fullWidth className='md:w-1/3 md:mx-16'>
                      <FormLabel
                        className='font-medium text-14'
                        component='legend'
                      >
                        Discounted Price
                      </FormLabel>
                      <TextField
                        {...field}
                        className='  md:mr-16'
                        autoFocus
                        type='text'
                        error={!!errors.discountedPrice}
                        helperText={errors?.discountedPrice?.message}
                        variant='outlined'
                        fullWidth
                      />
                    </FormControl>
                  )}
                />
                <Controller
                  name='stock'
                  control={control}
                  render={({ field }) => (
                    <FormControl fullWidth className='md:w-1/3 md:ml-16'>
                      <FormLabel
                        className='font-medium text-14'
                        component='legend'
                      >
                        Stock Quantity
                      </FormLabel>
                      <TextField
                        {...field}
                        className=''
                        autoFocus
                        type='text'
                        error={!!errors.stock}
                        helperText={errors?.stock?.message}
                        variant='outlined'
                        fullWidth
                      />
                    </FormControl>
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
          </AccordionDetails>
        </Accordion>
      ))}
    </div>
  );
}
