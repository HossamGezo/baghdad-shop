// --- Libraries
import { createAsyncThunk, createSlice, isAnyOf } from "@reduxjs/toolkit";

// --- Utils
import api from "@utils/api";

// --- Types
import type { LoginType, RegisterType, ResetPasswordType, UpdateProfileType, UserType } from "@/types/types";
import type { RootState } from "@app/store";

// --- localStorage
const storedUser = window.localStorage.getItem("user");
const user: UserType | null = storedUser ? JSON.parse(storedUser) : null;

// --- Error Message
const errorMsg = (error: unknown) => {
  const message = error instanceof Error ? error.message : "Something went wrong!";
  return message;
};

// --- State
type AuthState = {
  loading: boolean;
  user: UserType | null;
  isAuthenticated: boolean;
  error: string;
};

const initialState: AuthState = {
  loading: false,
  user: user,
  isAuthenticated: Boolean(user),
  error: "",
};

/**
 * @desc Register New User
 * @route /users
 * @method POST
 * @access public
 */
export const registerUser = createAsyncThunk<UserType, RegisterType, { rejectValue: string }>(
  "auth/register",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await api.post(`/users`, {
        ...userData,
        role: "customer",
        joinDate: new Date().toISOString(),
        avatar: "/images/avatar/default.png",
        status: "active",
        totalOrders: 0,
        address: null,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(errorMsg(error));
    }
  },
);

/**
 * @desc Login User
 * @route /users
 * @method POST
 * @access public
 */
export const loginUser = createAsyncThunk<UserType, LoginType, { rejectValue: string }>(
  "auth/login",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await api.get("/users");
      const users: UserType[] = response.data;
      const user = users.find((user) => userData.email === user.email && userData.password === user.password);
      if (user) return user;
      else return rejectWithValue("Invalid email or password");
    } catch (error) {
      return rejectWithValue(errorMsg(error));
    }
  },
);

/**
 * @desc Reset Password
 * @route /users
 * @method POST
 * @access public
 */
export const resetPassword = createAsyncThunk<string, ResetPasswordType, { rejectValue: string }>(
  "auth/reset-password",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await api.get("/users");

      const users: UserType[] = response.data;

      const user = users.find((user) => user.email == userData.email);

      if (user) return "A password reset link has been sent to your email.";
      else return rejectWithValue("This email is not registered in our store.");
    } catch (error) {
      return rejectWithValue(errorMsg(error));
    }
  },
);

/**
 * @desc Update Profile
 * @route /users/:id
 * @method PUT
 * @access private (user himself & admin)
 */
export const updateProfile = createAsyncThunk<UserType, UpdateProfileType, { rejectValue: string; state: RootState }>(
  "auth/update-profile",
  async (updateData, { rejectWithValue, getState }) => {
    try {
      const { user } = getState().auth;

      if (!user) return rejectWithValue("No user logged in");

      const updatedUser: UserType = {
        ...user,
        fullName: updateData.fullName || user.fullName,
        address: updateData.city
          ? {
              city: updateData.city,
              area: updateData.area || "",
              street: updateData.street || "",
              phone: updateData.phone || "",
            }
          : user.address,
      };

      const response = await api.put(`/users/${user.id}`, updatedUser);
      return response.data;
    } catch (error) {
      return rejectWithValue(errorMsg(error));
    }
  },
);

// --- authSlice
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.loading = false;
      state.user = null;
      state.isAuthenticated = false;
      state.error = "";
    },
  },
  extraReducers: (builder) => {
    // --- Register Fulfilled
    builder.addCase(registerUser.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload;
      state.isAuthenticated = true;
      state.error = "";
    });

    // --- Login Fulfilled
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload;
      state.isAuthenticated = true;
      state.error = "";
    });

    // --- Reset Password Fulfilled
    builder.addCase(resetPassword.fulfilled, (state) => {
      state.loading = false;
      state.error = "";
    });

    // --- Update Profile Fullfilled
    builder.addCase(updateProfile.fulfilled, (state, action) => {
      state.loading = false;

      state.user = action.payload;

      state.error = "";
    });

    // --- Pending Case
    builder.addMatcher(
      isAnyOf(registerUser.pending, loginUser.pending, resetPassword.pending, updateProfile.pending),
      (state) => {
        state.loading = true;
        state.error = "";
      },
    );

    // --- Rejected Case
    builder.addMatcher(
      isAnyOf(registerUser.rejected, loginUser.rejected, resetPassword.rejected, updateProfile.rejected),
      (state, action) => {
        state.loading = false;
        state.error = action.payload || "An unexpected error occurred";
      },
    );
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
