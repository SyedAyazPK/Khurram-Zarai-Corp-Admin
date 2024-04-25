import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import history from "@history";
import _ from "@lodash";
import axios from "axios";
import { showMessage } from "./fuse/messageSlice";
const { REACT_APP_API_URL } = process.env;

const initialState = {
  orders: {
    results: [],
  },
  deleteDialog: {
    open: false,
  },
  editDialog: {
    open: false,
    data: {},
  },
  viewDialog: {
    open: false,
    data: {},
  },
  allOrders: {
    results: [],
  },
  exportData: [],
};

export const getOrders = createAsyncThunk(
  "order/getOrders",
  async (order, { dispatch, getState }) => {
    try {
      const response = await axios.get(`${REACT_APP_API_URL}/v1/order`);
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

export const getAllOrders = createAsyncThunk(
  "order/getAllOrders",
  async (order, { dispatch, getState }) => {
    try {
      const response = await axios.get(`${REACT_APP_API_URL}/api/v1/order/all`);
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

export const exportOrders = createAsyncThunk(
  "order/exportOrders",
  async (order_Params, { dispatch, getState }) => {
    try {
      const response = await axios.get(
        `${REACT_APP_API_URL}/api/v1/export-orders`
        // { params: order_Params }
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

export const searchOrders = createAsyncThunk(
  "order/searchOrders",
  async (searchParams, { dispatch, getState }) => {
    try {
      const response = await axios.get(
        `${REACT_APP_API_URL}/api/v1/order/search`,
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

export const editOrder = createAsyncThunk(
  "order/editOrder",
  async (order, { dispatch, getState }) => {
    const bodyParams = _.omit(order, ["id"]);
    try {
      const response = await axios.patch(
        `${REACT_APP_API_URL}/v1/order/${order.id}`,
        bodyParams
      );
      const data = await response.data;
      dispatch(
        showMessage({
          message: "Order Updated",
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

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    openDeleteDialog: (state, action) => {
      state.deleteDialog.open = true;
    },
    closeDeleteDialog: (state, action) => {
      state.deleteDialog.open = false;
    },
    openEditDialog: (state, action) => {
      state.editDialog.open = true;
    },
    closeEditDialog: (state, action) => {
      state.editDialog.open = false;
    },
    openViewDialog: (state, action) => {
      state.viewDialog.open = true;
    },
    closeViewDialog: (state, action) => {
      state.viewDialog.open = false;
    },
    setEditOrderDialog: (state, action) => {
      state.editDialog.data = action.payload;
    },
    setViewOrderDialog: (state, action) => {
      state.viewDialog.data = action.payload;
    },
  },
  extraReducers: {
    [getOrders.fulfilled]: (state, action) => {
      state.orders = action.payload;
    },
    [getAllOrders.fulfilled]: (state, action) => {
      state.allOrders = action.payload;
    },
    [exportOrders.fulfilled]: (state, action) => {
      state.exportData = action.payload;
    },
    [searchOrders.fulfilled]: (state, action) => {
      state.orders = { results: action.payload };
    },
  },
});

export const {
  openDeleteDialog,
  closeDeleteDialog,
  openEditDialog,
  closeEditDialog,
  openViewDialog,
  closeViewDialog,
  setEditOrderDialog,
  setViewOrderDialog,
} = orderSlice.actions;

export const selectDeleteDialogState = ({ order }) => order.deleteDialog.open;
export const selectEditDialogState = ({ order }) => order.editDialog.open;
export const selectViewDialogState = ({ order }) => order.viewDialog.open;
export const selectOrders = ({ order }) => order.orders;
export const selectEditOrderDialogData = ({ order }) => order.editDialog.data;
export const selectViewOrderDialogData = ({ order }) => order.viewDialog.data;
export const selectAllOrders = ({ order }) => order.allOrders;
export const selectExportData = ({ order }) => order.exportData;

export default orderSlice.reducer;
