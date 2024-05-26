import { User } from "@/app/types/type";
import { createSlice } from "@reduxjs/toolkit";

interface UserState {
    user: User | null; // User type (replace with your user data structure)
    customers:User[],
    selected_customer:User | null;
    access_token:string | null,
    refresh_token:string | null,
  }
  
  // Define the User interface (replace with your actual user data structure)

  
  const initialState: UserState = {
    user: null,
    customers: [],
    selected_customer:null,
    access_token: null,
    refresh_token:null
  };
  
  // Define user slice actions with typed payloads
  export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
      setUser(state, action: { payload: User | null }) {
        state.user = action.payload;
      },
      setCustomers(state, action: { payload: User[] }) {
        state.customers = action.payload;
      },
      setAccessToken(state, action: { payload: string | null }) {
        state.access_token = action.payload;
      },
      setRefreshToken(state, action: { payload: string | null }) {
        state.refresh_token = action.payload;
      },
      setCurrentCusomer(state, action: {payload:User | null}) {
        state.selected_customer = action.payload
      }
    },
  });
  export const { setUser, setCustomers, setAccessToken, setRefreshToken } = userSlice.actions;
  