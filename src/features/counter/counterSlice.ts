import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CounterState {
	value: number;
}

const initialState: CounterState = {
	value: 10,
};

const counterSlice = createSlice({
	name: 'counter',
	initialState,
	reducers: {
		// increment
		incremented(state) {
			// it's okay to do this because immer makes it immutable
			// under the hood (without immer we would have to do object spreading
			// to prevent original state mutation)
			state.value++;
		},
		amountAdded(state, action: PayloadAction<number>) {
			state.value += action.payload;
		},
		// decrement
	},
});

export const { incremented, amountAdded } = counterSlice.actions;
export default counterSlice.reducer;
