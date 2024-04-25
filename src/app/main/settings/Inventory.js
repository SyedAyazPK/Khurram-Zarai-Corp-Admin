import { yupResolver } from '@hookform/resolvers/yup';
import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  TextField,
  Typography,
  Button,
  Checkbox,
  FormHelperText,
} from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import * as yup from 'yup';

/**
 * Form Validation Schema
 */
const schema = yup.object().shape({});

const defaultValues = {
  file: '',
  format: '',
  replace: false,
};

export const Inventory = () => {
  const { control, formState, handleSubmit, reset } = useForm({
    mode: 'onChange',
    defaultValues,
    resolver: yupResolver(schema),
  });

  const { isValid, dirtyFields, errors, setError } = formState;

  function onSubmit(data) {
    console.log('data', data);
  }
  return (
    <div className='p-32'>
      <Typography className=' title '>{`Settings -> Inventory`}</Typography>
      <Typography className='mb-24'>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod.
      </Typography>
      <form
        name='registerForm'
        noValidate
        className='flex flex-col justify-center w-full md:w-1/2 mt-32'
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className='flex items-center'>
          <Typography className='mr-24 font-semibold'>Manage Stock</Typography>
          <Controller
            name='stock'
            control={control}
            render={({ field }) => (
              <FormControl className='' error={!!errors.stock}>
                <FormControlLabel
                  label='Enable Stock Management'
                  control={<Checkbox size='small' {...field} />}
                />
              </FormControl>
            )}
          />
        </div>

        <div className='flex mt-16'>
          <Typography className='mr-40 font-semibold'>
            Hold Stock (minutes)
          </Typography>
          <Controller
            name='hold'
            control={control}
            render={({ field }) => (
              <FormControl className=''>
                <TextField
                  {...field}
                  className=''
                  autoFocus
                  error={!!errors.hold}
                  helperText={errors?.hold?.message}
                  variant='outlined'
                  fullWidth
                />
                <FormHelperText>
                  Hold stock (for unpair orders) for x minutes. When this limit
                  is reached, the pending order will be cancelled. Leave blank
                  to disable
                </FormHelperText>
              </FormControl>
            )}
          />
        </div>

        <div className='flex mt-16'>
          <Typography className='mr-40 mt-8 font-semibold'>
            Notification
          </Typography>
          <div className='flex flex-col'>
            <Controller
              name='low_stock'
              control={control}
              render={({ field }) => (
                <FormControl className='' error={!!errors.stock}>
                  <FormControlLabel
                    label='Enable low Stock Notification'
                    control={<Checkbox size='small' {...field} />}
                  />
                </FormControl>
              )}
            />{' '}
            <Controller
              name='stock'
              control={control}
              render={({ field }) => (
                <FormControl className='' error={!!errors.stock}>
                  <FormControlLabel
                    label='Enable out of Stock Notification'
                    control={<Checkbox size='small' {...field} />}
                  />
                </FormControl>
              )}
            />{' '}
          </div>
        </div>

        <div className='flex mt-16 items-center'>
          <Typography className='mr-40 font-semibold'>
            Notification recepient
          </Typography>
          <Controller
            name='recepient'
            control={control}
            render={({ field }) => (
              <FormControl className=''>
                <TextField
                  {...field}
                  className=''
                  autoFocus
                  error={!!errors.hold}
                  helperText={errors?.hold?.message}
                  variant='outlined'
                  fullWidth
                  placeholder='a@b.com'
                />
              </FormControl>
            )}
          />
        </div>

        <div className='flex mt-16 items-center'>
          <Typography className='mr-44 font-semibold'>
            Low Stock Threshold
          </Typography>
          <Controller
            name='low_threshold'
            control={control}
            render={({ field }) => (
              <FormControl className=''>
                <TextField
                  {...field}
                  className=''
                  autoFocus
                  error={!!errors.hold}
                  helperText={errors?.hold?.message}
                  variant='outlined'
                  fullWidth
                  type={'number'}
                />
              </FormControl>
            )}
          />
        </div>

        <div className='flex mt-16 items-center'>
          <Typography className='mr-32 font-semibold'>
            Out of Stock Threshold
          </Typography>
          <Controller
            name='out_of_threshold'
            control={control}
            render={({ field }) => (
              <FormControl className=''>
                <TextField
                  {...field}
                  className=''
                  autoFocus
                  error={!!errors.hold}
                  helperText={errors?.hold?.message}
                  variant='outlined'
                  fullWidth
                  type={'number'}
                />
              </FormControl>
            )}
          />
        </div>
        <div className='flex items-center'>
          <Typography className='mr-24 font-semibold'>
            Out of Stock Visibility
          </Typography>
          <Controller
            name='stock'
            control={control}
            render={({ field }) => (
              <FormControl className='' error={!!errors.stock}>
                <FormControlLabel
                  label='Hide out of stock item from catalog'
                  control={<Checkbox size='small' {...field} />}
                />
              </FormControl>
            )}
          />
        </div>

        <Button
          variant='contained'
          color='secondary'
          className='w-full mt-24'
          aria-label='Register'
          disabled={_.isEmpty(dirtyFields) || !isValid}
          type='submit'
          size='large'
        >
          Save Changes
        </Button>
      </form>
    </div>
  );
};
