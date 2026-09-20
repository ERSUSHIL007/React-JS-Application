import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";

//Create Couter State
interface CounterState {
  value: number;
}

//Create Initial State
const initialState: CounterState = {
  value: 0,
};

//Create Reducer
const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    increment: (state) => {
      // state.value = state.value + 1
      state.value += 1;
    },
    decrement: (state) => {
      // state.value = state.value - 1
      state.value -= 1;
    },
    incrementByAmount: (state, action: PayloadAction<number>) => {
      state.value += action.payload;
    },
  },

  //Register/Add Extra Reducers
  extraReducers: (builder) => {
    // builder.addCase(
    //   incrementAsync.fulfilled,
    //   (state, action: PayloadAction<number>) => {
    //     state.value += action.payload;
    //   },
    // );

    //Chaining the Async Actions
    builder
      .addCase(incrementAsync.pending, () => {
        console.log("incrementAsync.pending");
      })
      .addCase(
        incrementAsync.fulfilled,
        (state, action: PayloadAction<number>) => {
          state.value += action.payload;
        },
      );
  },
});

//Creating Async Action
export const incrementAsync = createAsyncThunk(
  "counter/incrementAsync",
  async (amount: number) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return amount;
  },
);

export const { increment, decrement, incrementByAmount } = counterSlice.actions;
export default counterSlice.reducer;
