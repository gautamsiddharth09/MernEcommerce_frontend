// my app login flow is:
//1.User enters email/password (Login.jsx)
//2.dispatch(login())
//3.Redux stores user + sets isAuthenticated = true
//4.Profile page reads user from Redux
//5.Profile image + data should display

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

// register
export const register = createAsyncThunk(
  "user/register",
  async (userData, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      };

      const { data } = await axios.post(
        `${API_URL}/api/v1/register`,
        userData,
        config,
      );

      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Registration failed");
    }
  },
);

// login based on cookie
export const login = createAsyncThunk(
  "user/login",
  async ({ email, password }, { rejectWithValue }) => {
    console.log(`email ${email}, psssword ${password}`);
    try {
      const { data } = await axios.post(
        `${API_URL}/api/v1/login`,
        { email, password },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        },
      );

      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Login failed");
    }
  },
);

// load userProfile based on cookie
export const loadUser = createAsyncThunk(
  "user/loadUser",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/api/v1/profile`, {
        withCredentials: true,
        timeout: 8000,
      });
      // console.log("loadUser response:", response);

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to load user");
    }
  },
);

// logout
export const logout = createAsyncThunk(
  "user/logout",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(
        `${API_URL}/api/v1/logout`,
        {},
        {
          withCredentials: true,
        },
      );

      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Logout failed");
    }
  },
);

// update profile
export const updateProfile = createAsyncThunk(
  "user/updateProfile",
  async (userData, { rejectWithValue }) => {
    try {
      const { data } = await axios.put(
        `${API_URL}/api/v1/profile/update`,
        userData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        },
      );

      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Profile update failed");
    }
  },
);

// update password
export const updatePassword = createAsyncThunk(
  "user/updatePassword",
  async (formData, { rejectWithValue }) => {
    try {
      const { data } = await axios.put(
        `${API_URL}/api/v1/password/update`,
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        },
      );

      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Password update failed");
    }
  },
);

// forgot password
export const forgotPassword = createAsyncThunk(
  "user/forgotPassword",
  async (email, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(
        `${API_URL}/api/v1/password/forgot`,
        email,
        {
          headers: {
            "Content-Type": "application/json",
          },
        },
      );

      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Forgot password failed");
    }
  },
);

// reset password
export const resetPassword = createAsyncThunk(
  "user/resetPassword",
  async ({ token, userData }, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(
        `${API_URL}/api/v1/reset/${token}`,
        userData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        },
      );

      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Reset password failed");
    }
  },
);

// slice
const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
    loading: false,
    error: null,
    success: false,
    isAuthenticated: false,
    message: null,
  },

  reducers: {
    removeErrors: (state) => {
      state.error = null;
    },
    removeSuccess: (state) => {
      state.success = false;
    },
  },

  extraReducers: (builder) => {
    builder
      // register
      .addCase(register.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
        state.message = null;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload?.user || null;
        state.isAuthenticated = true;
        state.success = true;
        state.message = action.payload?.message || null;
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.payload?.message || action.payload || "Registration failed";
        state.user = null;
        state.isAuthenticated = false;
        state.success = false;
      })

      // login
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
        state.message = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload?.user || null;
        state.isAuthenticated = true;
        state.success = true;
        state.message = action.payload?.message || null;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.payload?.message || action.payload || "Login failed";
        state.user = null;
        state.isAuthenticated = false;
        state.success = false;
      })

      // load user
      .addCase(loadUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loadUser.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload?.user) {
          state.user = action.payload.user;
          state.isAuthenticated = true;
        } else {
          state.user = null;
          state.isAuthenticated = false;
        }
      })
      .addCase(loadUser.rejected, (state, action) => {
        state.loading = false;
        state.user = null;
        state.isAuthenticated = false;
        state.error =
          action.payload?.message || action.payload || "Session expired";
      })

      // logout
      .addCase(logout.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(logout.fulfilled, (state, action) => {
        state.loading = false;
        state.user = null;
        state.isAuthenticated = false;
        state.success = true;
        state.message = action.payload?.message || "Successfully Logged out";
      })
      .addCase(logout.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.payload?.message || action.payload || "Logout failed";
      })

      // update profile
      .addCase(updateProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
        state.message = null;
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload?.user || null;
        state.success = true;
        state.message =
          action.payload?.message || "Profile updated successfully";
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.payload?.message || action.payload || "Profile update failed";
        state.success = false;
      })

      // update password
      .addCase(updatePassword.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
        state.message = null;
      })
      .addCase(updatePassword.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.message =
          action.payload?.message || "Password updated successfully";
      })
      .addCase(updatePassword.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.payload?.message || action.payload || "Password update failed";
        state.success = false;
      })

      // forgot password
      .addCase(forgotPassword.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
        state.message = null;
      })
      .addCase(forgotPassword.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.message = action.payload?.message || "Password reset email sent";
      })
      .addCase(forgotPassword.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.payload?.message || action.payload || "Forgot password failed";
        state.success = false;
      })

      // reset password
      .addCase(resetPassword.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
        state.message = null;
      })
      .addCase(resetPassword.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload?.user || null;
        state.isAuthenticated = Boolean(action.payload?.user);
        state.success = true;
        state.message =
          action.payload?.message || "Password reset successfully";
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.payload?.message || action.payload || "Reset password failed";
        state.success = false;
      });
  },
});

export const { removeErrors, removeSuccess } = userSlice.actions;
export default userSlice.reducer;
