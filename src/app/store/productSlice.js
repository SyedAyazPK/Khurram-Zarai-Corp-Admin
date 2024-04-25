import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import history from "@history";
import _ from "@lodash";
import { showMessage } from "./fuse/messageSlice";
import axios from "axios";
const { REACT_APP_API_URL } = process.env;

const initialState = {
  products: {
    results: [],
  },
  editProductDialog: {
    open: false,
    data: {},
  },
  attributes: [],
  variations: [
    {
      title: "Color",
      attributes: ["Blue", "Black"],
    },
    {
      title: "Size",
      attributes: ["Small", "Medium", "Large"],
    },
  ],
  latestSku: 0,
};

export const addProduct = createAsyncThunk(
  "product/addProduct",
  async (product, { dispatch, getState }) => {
    try {
      const response = await axios.post(
        `${REACT_APP_API_URL}/v1/product`,
        product
      );
      const data = await response;
      dispatch(
        showMessage({
          message: "Product Added",
          autoHideDuration: 2000,
          variant: "success",
          anchorOrigin: {
            vertical: "top",
            horizontal: "right",
          },
        })
      );
      return data;
    } catch (error) {
      dispatch(
        showMessage({
          message: error.response?.data.message,
          autoHideDuration: 2000,
          variant: "error",
          anchorOrigin: {
            vertical: "top",
            horizontal: "right",
          },
        })
      );
      return null;
    }
  }
);

export const getProducts = createAsyncThunk(
  "product/getProducts",
  async (product = "", { dispatch, getState }) => {
    try {
      const response = await axios.get(
        `${REACT_APP_API_URL}/v1/product?${product}`
      );
      const data = await response.data;
      return data;
    } catch (error) {
      dispatch(
        showMessage({
          message: error.response.data.message,
          autoHideDuration: 2000,
          variant: "error",
          anchorOrigin: {
            vertical: "top",
            horizontal: "right",
          },
        })
      );
      return null;
    }
  }
);
export const getLatestSku = createAsyncThunk(
  "product/getLatestSku",
  async (product = "", { dispatch, getState }) => {
    try {
      const response = await axios.get(
        `${REACT_APP_API_URL}/v1/product?sortBy=sku:desc&limit=1`
      );
      const data = (await response.data?.results?.[0]?.sku) + 1;
      return data ?? 0;
    } catch (error) {
      dispatch(
        showMessage({
          message: error.response.data.message,
          autoHideDuration: 2000,
          variant: "error",
          anchorOrigin: {
            vertical: "top",
            horizontal: "right",
          },
        })
      );
      return null;
    }
  }
);

export const deleteProduct = createAsyncThunk(
  "product/deleteProduct",
  async (id, { dispatch, getState }) => {
    try {
      const response = await axios.delete(
        `${REACT_APP_API_URL}/v1/product/${id}`
      );
      const data = await response;
      dispatch(
        showMessage({
          message: "Product Deleted",
          autoHideDuration: 2000,
          variant: "success",
          anchorOrigin: {
            vertical: "top",
            horizontal: "right",
          },
        })
      );
      return data;
    } catch (error) {
      dispatch(
        showMessage({
          message: "Error occured",
          autoHideDuration: 2000,
          variant: "error",
          anchorOrigin: {
            vertical: "top",
            horizontal: "right",
          },
        })
      );
      return null;
    }
  }
);

export const bulkDeleteProducts = createAsyncThunk(
  "product/bulkDeleteProducts",
  async (selectedIds, { dispatch, getState }) => {
    const ids = selectedIds.map((n) => n.id);
    console.log("ids are", ids);
    try {
      const response = await axios.post(
        `${REACT_APP_API_URL}/v1/product/bulkDelete`,
        { ids }
      );
      const data = await response;
      dispatch(
        showMessage({
          message: "Products Deleted",
          autoHideDuration: 2000,
          variant: "success",
          anchorOrigin: {
            vertical: "top",
            horizontal: "right",
          },
        })
      );
      return data;
    } catch (error) {
      dispatch(
        showMessage({
          message: error.response?.data.message,
          autoHideDuration: 2000,
          variant: "error",
          anchorOrigin: {
            vertical: "top",
            horizontal: "right",
          },
        })
      );
      return null;
    }
  }
);
export const bulkRecoverProducts = createAsyncThunk(
  "product/bulkRecoverProducts",
  async (selectedIds, { dispatch, getState }) => {
    const ids = selectedIds.map((n) => n.id);
    console.log("ids are", ids);
    try {
      const response = await axios.post(
        `${REACT_APP_API_URL}/v1/product/bulkRecover`,
        { ids }
      );
      const data = await response;
      dispatch(
        showMessage({
          message: "Products Recovered",
          autoHideDuration: 2000,
          variant: "success",
          anchorOrigin: {
            vertical: "top",
            horizontal: "right",
          },
        })
      );
      return data;
    } catch (error) {
      dispatch(
        showMessage({
          message: error.response?.data.message,
          autoHideDuration: 2000,
          variant: "error",
          anchorOrigin: {
            vertical: "top",
            horizontal: "right",
          },
        })
      );
      return null;
    }
  }
);

export const updateProduct = createAsyncThunk(
  "product/updateProduct",
  async (product, { dispatch, getState }) => {
    const params = _.omit(product, ["id", "isDeleted"]);
    try {
      const response = await axios.patch(
        `${REACT_APP_API_URL}/v1/product/${product.id}`,
        params
      );
      const data = await response;
      dispatch(
        showMessage({
          message: "Product Updated",
          autoHideDuration: 2000,
          variant: "success",
          anchorOrigin: {
            vertical: "top",
            horizontal: "right",
          },
        })
      );
      return data;
    } catch (error) {
      dispatch(
        showMessage({
          message: error.response?.data.message,
          autoHideDuration: 2000,
          variant: "error",
          anchorOrigin: {
            vertical: "top",
            horizontal: "right",
          },
        })
      );
      return null;
    }
  }
);

export const searchProducts = createAsyncThunk(
  "product/searchProducts",
  async (searchParams, { dispatch, getState }) => {
    try {
      const response = await axios.get(
        `${REACT_APP_API_URL}/v1/product/search`,
        {
          params: {
            q: searchParams,
          },
        }
      );
      const data = await response.data;
      return data;
    } catch (error) {
      dispatch(
        showMessage({
          message: error.response.data.message,
          autoHideDuration: 2000,
          variant: "error",
          anchorOrigin: {
            vertical: "top",
            horizontal: "right",
          },
        })
      );
      return null;
    }
  }
);

export const addAttribute = createAsyncThunk(
  "product/addAttribute",
  async (attribute, { dispatch, getState }) => {
    try {
      const response = await axios.post(
        `${REACT_APP_API_URL}/api/v1/attributes`,
        attribute
      );
      const data = await response;
      dispatch(
        showMessage({
          message: "Attribute Added",
          autoHideDuration: 2000,
          variant: "success",
          anchorOrigin: {
            vertical: "top",
            horizontal: "right",
          },
        })
      );
      return data;
    } catch (error) {
      dispatch(
        showMessage({
          message: "Error occured while creating product",
          autoHideDuration: 2000,
          variant: "error",
          anchorOrigin: {
            vertical: "top",
            horizontal: "right",
          },
        })
      );
      return null;
    }
  }
);

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    openEditProductDialog: (state, action) => {
      state.editProductDialog.open = true;
    },
    closeEditProductDialog: (state, action) => {
      state.editProductDialog.open = false;
    },
    setEditProductDialog: (state, action) => {
      state.editProductDialog.data = action.payload;
    },
    setAttributes: (state, action) => {
      state.attributes.push(action.payload);
    },
  },
  extraReducers: {
    [addProduct.fulfilled]: (state, action) => {},
    [getProducts.fulfilled]: (state, action) => {
      state.products = action.payload;
    },
    [searchProducts.fulfilled]: (state, action) => {
      state.products = { results: action.payload };
    },
    [getLatestSku.fulfilled]: (state, action) => {
      state.latestSku = action.payload;
    },
  },
});

export const {
  openEditProductDialog,
  closeEditProductDialog,
  setEditProductDialog,
  setAttributes,
} = productSlice.actions;

export const selectProducts = ({ product }) => product.products;
export const selectProductVariation = ({ product }) => product.variations;
export const selectEditProductDialogState = ({ product }) =>
  product.editProductDialog.open;
export const selectEditProductDialogData = ({ product }) =>
  product.editProductDialog.data;
export const selectAttributes = ({ product }) => product.attributes;
export const selectLatestSku = ({ product }) => product.latestSku;

export default productSlice.reducer;
