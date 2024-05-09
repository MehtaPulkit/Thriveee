import { createSelector, createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "../../../../app/api/apiSlice";

const taxCodesAdapter = createEntityAdapter({});

const initialState = taxCodesAdapter.getInitialState();

export const taxCodeApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getTaxCodes: builder.query({
      query: () => ({
        url: "/taxCodes",
        validateStatus: (response, result) => {
          return response.status === 200 && !result.isError;
        },
      }),
      transformResponse: (responseData) => {
        const loadedTaxCodes = responseData.map((taxCode) => {
          taxCode.id = taxCode._id;
          return taxCode;
        });
        return taxCodesAdapter.setAll(initialState, loadedTaxCodes);
      },
      providesTags: (result, error, arg) => {
        if (result?.ids) {
          return [
            { type: "TaxCode", id: "LIST" },
            ...result.ids.map((id) => ({ type: "TaxCode", id })),
          ];
        } else return [{ type: "TaxCode", id: "LIST" }];
      },
    }),
    getTaxCode: builder.query({
      query: (id) => ({
        url: `/taxCodes/${id}`,
        validateStatus: (response, result) => {
          return response.status === 200 && !result.isError;
        },
      }),
      // Pick out data and prevent nested properties in a hook or selector
      transformResponse: (response) => response,
      // Pick out errors and prevent nested properties in a hook or selector
      transformErrorResponse: (response, meta, arg) => response.status,
      providesTags: (result, error, id) => [{ type: "TaxCode", id }],
    }),
    addNewTaxCode: builder.mutation({
      query: (initialTaxCodeData) => ({
        url: "/taxCodes",
        method: "POST",
        body: {
          ...initialTaxCodeData,
        },
      }),
      invalidatesTags: [{ type: "TaxCode", id: "LIST" }],
    }),
    updateTaxCode: builder.mutation({
      query: (initialTaxCodeData) => ({
        url: "/taxCodes",
        method: "PATCH",
        body: {
          ...initialTaxCodeData,
        },
      }),
      invalidatesTags: (result, error, arg) => [
        { type: "TaxCode", id: arg.id },
      ],
    }),
    deleteTaxCode: builder.mutation({
      query: ({ id }) => ({
        url: `/taxCodes`,
        method: "DELETE",
        body: { id },
      }),
      invalidatesTags: (result, error, arg) => [
        { type: "TaxCode", id: arg.id },
      ],
    }),
    checkDuplicateTaxCode: builder.mutation({
      query: (initialAccountData) => ({
        url: "/taxCodes/check",
        method: "POST",
        body: {
          ...initialAccountData,
        },
      }),
      invalidatesTags: [{ type: "TaxCode", id: "LIST" }],
    }),
  }),
});

export const {
  useGetTaxCodesQuery,
  useGetTaxCodeQuery,
  useAddNewTaxCodeMutation,
  useUpdateTaxCodeMutation,
  useDeleteTaxCodeMutation,
  useCheckDuplicateTaxCodeMutation,
} = taxCodeApiSlice;

// returns the query result object
export const selectTaxCodesResult =
  taxCodeApiSlice.endpoints.getTaxCodes.select();

// creates memoized selector
const selectTaxCodesData = createSelector(
  selectTaxCodesResult,
  (taxCodesResult) => taxCodesResult.data // normalized state object with ids & entities
);

//getSelectors creates these selectors and we rename them with aliases using destructuring
export const {
  selectAll: selectAllTaxCodes,
  selectById: selectTaxCodeById,
  selectIds: selectTaxCodeIds,
  // Pass in a selector that returns the taxCodes slice of state
} = taxCodesAdapter.getSelectors(
  (state) => selectTaxCodesData(state) ?? initialState
);
