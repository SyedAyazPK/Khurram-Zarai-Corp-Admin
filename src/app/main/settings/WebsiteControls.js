import { yupResolver } from "@hookform/resolvers/yup";
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
} from "@mui/material";
import { uploadImage } from "app/store/categorySlice";
import { addAccountSettings, addWebsiteControls } from "app/store/settingSlice";
import { Controller, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import * as yup from "yup";

/**
 * Form Validation Schema
 */
const schema = yup.object().shape({});

const defaultValues = {
  sliders: [],
  email: "",
  defaultBanner: "",
  // shippingReturn: "",
  // careInstructions: "",
  // deliveryCharges: 0,
  // replace: false,
};

export const WebsiteControls = () => {
  const dispatch = useDispatch();
  const { control, formState, handleSubmit, reset, register, setValue } =
    useForm({
      mode: "onChange",
      defaultValues,
      resolver: yupResolver(schema),
    });

  const { isValid, dirtyFields, errors, setError } = formState;

  function onSubmit(_data) {
    const data = [
      {
        type: "sliders",
        value: _data.sliders,
      },
      {
        type: "email",
        value: _data.email,
      },
      {
        type: "defaultBanner",
        value: _data.defaultBanner,
      },
    ];
    dispatch(addWebsiteControls(data));
  }
  return (
    <div className="p-32">
      <Typography className=" title ">{`Settings -> Website Controls`}</Typography>
      <Typography className="mb-24">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod.
      </Typography>
      <form
        name="registerForm"
        noValidate
        className="flex flex-col justify-center w-full md:w-1/2 mt-32"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Typography className="font-semibold text-24 mt-16 mb-4">
          Slider Images
        </Typography>
        <input
          onChange={(e) => {
            const imagesArr = [];
            const filesArray = Array.from(e.target.files);

            Promise.all(
              filesArray.map((file) =>
                dispatch(uploadImage(file)).then((response) => {
                  imagesArr.push(response.payload.data);
                })
              )
            ).then(() => {
              setValue("sliders", imagesArr);
            });
          }}
          type="file"
          multiple
        />
        <FormHelperText>Image Dimension 1370 x 756</FormHelperText>

        <Typography className="font-semibold text-24 mt-16 mb-4">
          Default Banner
        </Typography>
        <input
          type="file"
          onChange={(e) => {
            dispatch(uploadImage(e.target.files[0])).then((response) => {
              setValue("defaultBanner", response.payload.data);
            });
          }}
        />
        <FormHelperText>Image Dimension 1920 x 550</FormHelperText>

        <Typography className="font-semibold text-24 mt-16 mb-4">
          Email
        </Typography>
        <TextField
          {...register("email")}
          variant="outlined"
          label="Email For Checkout"
        />

        <Button
          variant="contained"
          color="secondary"
          className="w-full mt-24"
          aria-label="Register"
          disabled={_.isEmpty(dirtyFields) || !isValid}
          type="submit"
          size="large"
        >
          Save Changes
        </Button>
      </form>
    </div>
  );
};
