import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import history from '@history';
import _ from '@lodash';
import { showMessage } from './fuse/messageSlice';
import axios from 'axios';
const { REACT_APP_API_URL } = process.env;

const initialState = {
  settings: {
    results: [],
  },
  editsettingDialog: {
    open: false,
    data: {},
  },
};

export const addAccountSettings = createAsyncThunk(
  'setting/addAccountSettings',
  async (setting, { dispatch, getState }) => {
    try {
      const response = await axios.post(
        `${REACT_APP_API_URL}/api/v1/privacy`,
        setting
      );
      const data = await response;
      dispatch(
        showMessage({
          message: 'Setting Updated',
          autoHideDuration: 2000,
          variant: 'success',
          anchorOrigin: {
            vertical: 'top',
            horizontal: 'right',
          },
        })
      );
      return data;
    } catch (error) {
      dispatch(
        showMessage({
          message: 'Error occured while creating setting',
          autoHideDuration: 2000,
          variant: 'error',
          anchorOrigin: {
            vertical: 'top',
            horizontal: 'right',
          },
        })
      );
      return null;
    }
  }
);
export const addWebsiteControls = createAsyncThunk(
  'setting/addWebsiteControls',
  async (setting, { dispatch, getState }) => {
    try {
      const response = await axios.post(
        `${REACT_APP_API_URL}/v1/default/bulkCreate`,
        setting
      );
      const data = await response;
      dispatch(
        showMessage({
          message: 'Website Controls Updated',
          autoHideDuration: 2000,
          variant: 'success',
          anchorOrigin: {
            vertical: 'top',
            horizontal: 'right',
          },
        })
      );
      return data;
    } catch (error) {
      dispatch(
        showMessage({
          message: 'Error occured while creating setting',
          autoHideDuration: 2000,
          variant: 'error',
          anchorOrigin: {
            vertical: 'top',
            horizontal: 'right',
          },
        })
      );
      return null;
    }
  }
);

export const addShippingZoneSettings = createAsyncThunk(
  'setting/addShippingZoneSettings',
  async (setting, { dispatch, getState }) => {
    try {
      const response = await axios.post(
        `${REACT_APP_API_URL}/api/v1/shippingZone`,
        setting
      );
      const data = await response;
      dispatch(
        showMessage({
          message: 'Shipping Zone Setting Updated',
          autoHideDuration: 2000,
          variant: 'success',
          anchorOrigin: {
            vertical: 'top',
            horizontal: 'right',
          },
        })
      );
      return data;
    } catch (error) {
      dispatch(
        showMessage({
          message: 'Error occured while updating Shipping Zone setting',
          autoHideDuration: 2000,
          variant: 'error',
          anchorOrigin: {
            vertical: 'top',
            horizontal: 'right',
          },
        })
      );
      return null;
    }
  }
);

export const getsettings = createAsyncThunk(
  'setting/getsettings',
  async (setting, { dispatch, getState }) => {
    try {
      const response = await axios.get(`${REACT_APP_API_URL}/api/v1/users`);
      const data = await response.data;
      return data;
    } catch (error) {
      dispatch(
        showMessage({
          message: error.response.data.message,
          autoHideDuration: 2000,
          variant: 'error',
          anchorOrigin: {
            vertical: 'top',
            horizontal: 'right',
          },
        })
      );
      return null;
    }
  }
);

export const deletesetting = createAsyncThunk(
  'setting/deletesetting',
  async (id, { dispatch, getState }) => {
    try {
      const response = await axios.delete(
        `${REACT_APP_API_URL}/api/v1/users/${id}`
      );
      const data = await response;
      dispatch(
        showMessage({
          message: 'setting Deleted',
          autoHideDuration: 2000,
          variant: 'success',
          anchorOrigin: {
            vertical: 'top',
            horizontal: 'right',
          },
        })
      );
      return data;
    } catch (error) {
      dispatch(
        showMessage({
          message: 'Error occured',
          autoHideDuration: 2000,
          variant: 'error',
          anchorOrigin: {
            vertical: 'top',
            horizontal: 'right',
          },
        })
      );
      return null;
    }
  }
);

export const bulkDeletesettings = createAsyncThunk(
  'setting/bulkDeletesettings',
  async (selectedIds, { dispatch, getState }) => {
    const ids = selectedIds.map((n) => n._id);
    try {
      const response = await axios.post(
        `${REACT_APP_API_URL}/api/v1/users/deleteMany`,
        { ids }
      );
      const data = await response;
      dispatch(
        showMessage({
          message: 'settings Deleted',
          autoHideDuration: 2000,
          variant: 'success',
          anchorOrigin: {
            vertical: 'top',
            horizontal: 'right',
          },
        })
      );
      return data;
    } catch (error) {
      dispatch(
        showMessage({
          message: 'Error occured while deleting setting',
          autoHideDuration: 2000,
          variant: 'error',
          anchorOrigin: {
            vertical: 'top',
            horizontal: 'right',
          },
        })
      );
      return null;
    }
  }
);

export const updatesetting = createAsyncThunk(
  'setting/updatesetting',
  async (setting, { dispatch, getState }) => {
    try {
      const response = await axios.patch(
        `${REACT_APP_API_URL}/api/v1/users/${setting._id}`,
        setting
      );
      const data = await response;
      dispatch(
        showMessage({
          message: 'setting Updated',
          autoHideDuration: 2000,
          variant: 'success',
          anchorOrigin: {
            vertical: 'top',
            horizontal: 'right',
          },
        })
      );
      return data;
    } catch (error) {
      dispatch(
        showMessage({
          message: 'Error occured while updating setting',
          autoHideDuration: 2000,
          variant: 'error',
          anchorOrigin: {
            vertical: 'top',
            horizontal: 'right',
          },
        })
      );
      return null;
    }
  }
);

const settingSlice = createSlice({
  name: 'setting',
  initialState,
  reducers: {
    openEditsettingDialog: (state, action) => {
      state.editsettingDialog.open = true;
    },
    closeEditsettingDialog: (state, action) => {
      state.editsettingDialog.open = false;
    },
    setEditsettingDialog: (state, action) => {
      state.editsettingDialog.data = action.payload;
    },
  },
  extraReducers: {
    [addAccountSettings.fulfilled]: (state, action) => {},
    [getsettings.fulfilled]: (state, action) => {
      state.settings = action.payload;
    },
  },
});

export const {
  openEditsettingDialog,
  closeEditsettingDialog,
  setEditsettingDialog,
} = settingSlice.actions;

export const selectsettings = ({ setting }) => setting.settings;
export const selectEditsettingDialogState = ({ setting }) =>
  setting.editsettingDialog.open;
export const selectEditsettingDialogData = ({ setting }) =>
  setting.editsettingDialog.data;

export default settingSlice.reducer;
