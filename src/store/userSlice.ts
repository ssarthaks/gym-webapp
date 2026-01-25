import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import {
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  getUserStats,
  getCurrentUser,
} from "@/api/users";

interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  address?: string;
  accountType: "individual" | "business";
  emailVerified: boolean;
  createdAt: string;
  updatedAt: string;
}

interface UserStats {
  totalUsers: number;
  individualUsers: number;
  businessUsers: number;
  verifiedUsers: number;
  newUsersLast30Days: number;
}

interface Pagination {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

interface UserState {
  users: User[];
  currentUser: User | null;
  selectedUser: User | null;
  stats: UserStats | null;
  pagination: Pagination | null;
  loading: boolean;
  error: string | null;
}

const initialState: UserState = {
  users: [],
  currentUser: null,
  selectedUser: null,
  stats: null,
  pagination: null,
  loading: false,
  error: null,
};

// Async thunks
export const fetchUsers = createAsyncThunk(
  "users/fetchUsers",
  async (
    params: {
      page?: number;
      limit?: number;
      search?: string;
      accountType?: "individual" | "business";
    } = {},
    { rejectWithValue },
  ) => {
    try {
      const data = await getAllUsers(params);
      return data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  },
);

export const fetchUserById = createAsyncThunk(
  "users/fetchUserById",
  async (id: number, { rejectWithValue }) => {
    try {
      const data = await getUserById(id);
      return data.user;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  },
);

export const fetchCurrentUser = createAsyncThunk(
  "users/fetchCurrentUser",
  async (_, { rejectWithValue }) => {
    try {
      const data = await getCurrentUser();
      return data.user;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  },
);

export const updateUserData = createAsyncThunk(
  "users/updateUser",
  async (
    {
      id,
      userData,
    }: {
      id: number;
      userData: {
        name?: string;
        email?: string;
        phone?: string;
        address?: string;
        accountType?: "individual" | "business";
      };
    },
    { rejectWithValue },
  ) => {
    try {
      const data = await updateUser(id, userData);
      return data.user;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  },
);

export const deleteUserData = createAsyncThunk(
  "users/deleteUser",
  async (id: number, { rejectWithValue }) => {
    try {
      await deleteUser(id);
      return id;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  },
);

export const fetchUserStats = createAsyncThunk(
  "users/fetchStats",
  async (_, { rejectWithValue }) => {
    try {
      const data = await getUserStats();
      return data.stats;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  },
);

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearSelectedUser: (state) => {
      state.selectedUser = null;
    },
  },
  extraReducers: (builder) => {
    // Fetch users
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload.users;
        state.pagination = action.payload.pagination;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // Fetch user by ID
    builder
      .addCase(fetchUserById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedUser = action.payload;
      })
      .addCase(fetchUserById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // Fetch current user
    builder
      .addCase(fetchCurrentUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCurrentUser.fulfilled, (state, action) => {
        state.loading = false;
        state.currentUser = action.payload;
      })
      .addCase(fetchCurrentUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // Update user
    builder
      .addCase(updateUserData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateUserData.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.users.findIndex((u) => u.id === action.payload.id);
        if (index !== -1) {
          state.users[index] = action.payload;
        }
        if (state.selectedUser?.id === action.payload.id) {
          state.selectedUser = action.payload;
        }
        if (state.currentUser?.id === action.payload.id) {
          state.currentUser = action.payload;
        }
      })
      .addCase(updateUserData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // Delete user
    builder
      .addCase(deleteUserData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteUserData.fulfilled, (state, action) => {
        state.loading = false;
        state.users = state.users.filter((u) => u.id !== action.payload);
        if (state.selectedUser?.id === action.payload) {
          state.selectedUser = null;
        }
      })
      .addCase(deleteUserData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // Fetch stats
    builder
      .addCase(fetchUserStats.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserStats.fulfilled, (state, action) => {
        state.loading = false;
        state.stats = action.payload;
      })
      .addCase(fetchUserStats.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearError, clearSelectedUser } = userSlice.actions;
export default userSlice.reducer;
