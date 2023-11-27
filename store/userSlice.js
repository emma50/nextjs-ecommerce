// firstname,
// lastname,
// city,
// street,
// number, 
// email,
// lat,
// long,
// username,
// password,
// phone,
// success,
// error 

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: {
    id: '',
    email: '',
    name: {
      firstname: 'Emmanuel',
      lastname: 'Okwuidegbe',
    },
    address: {
      city: 'Lagos',
      street: 'Victoria',
      number: '124', 
      zipcode: '100242',
      geolocation: {
        lat:'-37.3159',
        long:'81.1496'
      }
    },
    username: '',
    password: '',
    phone: '',
    // success,
    // error 
  }
}
export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    createUser(state, action) {
      state.user = action.payload
    },
    updateUser(state, action) {
      state.user = action.payload
    },
    deleteUser(state, action) {
      // state.cartItems = []
      state.user = {}
    },
  }
})

export const {
  createUser,
  updateUser,
  deleteUser
} = userSlice.actions

export default userSlice.reducer;