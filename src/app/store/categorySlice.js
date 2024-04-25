import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import history from "@history";
import _ from "@lodash";
import { showMessage } from "./fuse/messageSlice";
import axios from "axios";
const { REACT_APP_API_URL } = process.env;

const initialState = {
  categories: {
    results: [],
  },
  editDialog: {
    open: false,
    data: {},
  },
};

export const addCategory = createAsyncThunk(
  "category/addCategory",
  async (category, { dispatch, getState }) => {
    try {
      const response = await axios.post(
        `${REACT_APP_API_URL}/v1/category`,
        category
      );
      const data = await response;
      dispatch(
        showMessage({
          message: "Category Added",
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

export const getCategories = createAsyncThunk(
  "category/getCategories",
  async (category, { dispatch, getState }) => {
    const params = category ?? "";
    try {
      const response = await axios.get(
        `${REACT_APP_API_URL}/v1/category?${params}`
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

export const deleteCategory = createAsyncThunk(
  "category/deleteCategory",
  async (id, { dispatch, getState }) => {
    try {
      const response = await axios.delete(
        `${REACT_APP_API_URL}/v1/category/${id}`
      );
      const data = await response;
      dispatch(
        showMessage({
          message: "Category Deleted",
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

export const bulkDeleteCategories = createAsyncThunk(
  "category/bulkDeleteCategories",
  async (selectedIds, { dispatch, getState }) => {
    const ids = selectedIds.map((n) => n.id);
    console.log("ids are", ids);
    try {
      const response = await axios.post(
        `${REACT_APP_API_URL}/v1/category/bulkDelete`,
        { ids }
      );
      const data = await response;
      dispatch(
        showMessage({
          message: "Categorie Deleted",
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
          message: error.response.data?.message,
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

export const updateCategory = createAsyncThunk(
  "category/updateCategory",
  async (category, { dispatch, getState }) => {
    const updatedParams = _.omit(category,['id'])
    try {
      const response = await axios.patch(
        `${REACT_APP_API_URL}/v1/category/${category.id}`,
        updatedParams
      );
      const data = await response;
      dispatch(
        showMessage({
          message: "Category Updated",
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
          message: error.response?.data?.message,
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

export const uploadImage = createAsyncThunk(
  "category/uploadImage",
  async (thumbnail, { dispatch, getState }) => {
    var bodyFormData = new FormData();
    bodyFormData.append("file", thumbnail);
    try {
      const response = await axios.post(
        `${REACT_APP_API_URL}/v1/cloudinary/upload`,
        bodyFormData
      );
      const data = await response;
      dispatch(
        showMessage({
          message: "Image Uploaded",
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
          message: "Error occured while uploading Image",
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

const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    openEditDialog: (state, action) => {
      state.editDialog.open = true;
    },
    closeEditDialog: (state, action) => {
      state.editDialog.open = false;
    },
    setEditDialog: (state, action) => {
      state.editDialog.data = action.payload;
    },
  },
  extraReducers: {
    [addCategory.fulfilled]: (state, action) => {},
    [getCategories.fulfilled]: (state, action) => {
      state.categories = action.payload;
    },
  },
});

export const { openEditDialog, closeEditDialog, setEditDialog } =
  categorySlice.actions;

export const selectCategories = ({ category }) => category.categories;
export const selectEditCategoryDialogState = ({ category }) =>
  category.editDialog.open;
export const selectEditCategoryDialogData = ({ category }) =>
  category.editDialog.data;

export default categorySlice.reducer;
