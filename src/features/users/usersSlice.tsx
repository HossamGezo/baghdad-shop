// --- Libraries
import { createAsyncThunk, createSlice, isAnyOf } from "@reduxjs/toolkit";

// --- Utils
import api from "@utils/api";

// --- Types
import type { UserType } from "@/types/types";

// --- Error Message
const errorMsg = (error: unknown) => {
  const message =
    error instanceof Error ? error.message : "Something went wrong!";
  return message;
};

// --- UsersState (Types)
type UsersState = {
  loading: boolean;
  users: UserType[];
  singleUser: UserType | null;
  error: string;
};

// --- initialState
const initialState: UsersState = {
  loading: false,
  users: [],
  singleUser: null,
  error: "",
};

/**
 * @desc Get All Users
 * @route /users
 * @method GET
 * @access public
 */
export const fetchUsers = createAsyncThunk<
  { data: UserType[] }, // Payload/Return Type
  void,
  { rejectValue: string } // ThunkConfig
>("users/all-users", async (_, { rejectWithValue }) => {
  try {
    const response = await api.get(`/users`);
    return { data: response.data };
  } catch (error) {
    return rejectWithValue(errorMsg(error));
  }
});

/**
 * @desc Get User By Id
 * @route /:id
 * @method GET
 * @access public
 */
export const fetchUserById = createAsyncThunk<
  UserType, // Return Type
  { id: string }, // Argument Type
  { rejectValue: string } // ThunkConfig
>("users/single-user", async ({ id }, { rejectWithValue }) => {
  try {
    const response = await api.get(`/users/${id}`);
    const user = response.data;
    return user;
  } catch (error) {
    return rejectWithValue(errorMsg(error));
  }
});

/**
 * @desc Update User Role
 * @route /users/:id
 * @method PUT
 * @access private (admin)
 */
export const updateUserRole = createAsyncThunk<
  UserType,
  { id: string; user: UserType },
  { rejectValue: string }
>("users/update-role", async ({ id, user }, { rejectWithValue }) => {
  try {
    const response = await api.put(`/users/${id}`, user);
    return response.data;
  } catch (error) {
    return rejectWithValue(errorMsg(error));
  }
});

/**
 * @desc Delete User
 * @route /users/:id
 * @method DELETE
 * @access private (admin)
 */
export const deleteUser = createAsyncThunk<
  string, // Return Type
  { id: string }, // Argument Type
  { rejectValue: string }
>("users/delete-user", async ({ id }, { rejectWithValue }) => {
  try {
    await api.delete(`/users/${id}`);
    return id;
  } catch (error) {
    return rejectWithValue(errorMsg(error));
  }
});

// --- Users Slice
const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // --- Fetch All Users

    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      state.loading = false;
      state.users = action.payload.data;
    });

    // --- Fetch User By Id

    builder.addCase(fetchUserById.fulfilled, (state, action) => {
      state.loading = false;
      state.singleUser = action.payload;
    });

    // --- Update User Role By Id

    builder.addCase(updateUserRole.fulfilled, (state, action) => {
      state.loading = false;

      const index = state.users.findIndex(
        (user) => user.id === action.payload.id,
      );
      if (index !== -1) {
        state.users[index] = action.payload;
      }

      state.singleUser = action.payload;
    });

    // --- Delete User By Id

    builder.addCase(deleteUser.fulfilled, (state, action) => {
      state.loading = false;
      state.users = state.users.filter((user) => user.id !== action.payload);
    });

    // --- Pending Case

    builder.addMatcher(
      isAnyOf(
        fetchUsers.pending,
        fetchUserById.pending,
        updateUserRole.pending,
        deleteUser.pending,
      ),
      (state) => {
        state.loading = true;
        state.error = "";
      },
    );

    // --- Rejected Case

    builder.addMatcher(
      isAnyOf(
        fetchUsers.rejected,
        fetchUserById.rejected,
        updateUserRole.rejected,
        deleteUser.rejected,
      ),
      (state, action) => {
        state.loading = false;
        state.error = action.payload || "An unexpected error occurred";
      },
    );
  },
});

export default usersSlice.reducer;
