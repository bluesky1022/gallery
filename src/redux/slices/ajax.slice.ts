import { createSlice } from "@reduxjs/toolkit";

export interface IAjaxState {
    ajaxLoading: boolean;
}

const initialState: IAjaxState = {
    ajaxLoading: false
};

export const ajaxSlice = createSlice({
  name: "ajax",
  initialState,
  reducers: {
    showAjaxLoading: (state) => {
      state.ajaxLoading = true;
    },
    hideAjaxLoading: (state) => {
      state.ajaxLoading = false;
    },
  },
});

export const { showAjaxLoading, hideAjaxLoading } = ajaxSlice.actions;
export default ajaxSlice.reducer;
