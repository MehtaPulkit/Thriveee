import { createSelector, createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "../../../../app/api/apiSlice";

const txAccountsAdapter = createEntityAdapter({});

const initialState = txAccountsAdapter.getInitialState();

export const txAccountApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getTxAccounts: builder.query({
      query: () => ({
        url: "/accounts",
        validateStatus: (response, result) => {
          return response.status === 200 && !result.isError;
        },
      }),
      transformResponse: (responseData) => {
        const loadedTxAccounts = responseData.map((txAccount) => {
          txAccount.id = txAccount._id;
          return txAccount;
        });
        return txAccountsAdapter.setAll(initialState, loadedTxAccounts);
      },
      providesTags: (result, error, arg) => {
        if (result?.ids) {
          return [
            { type: "TxAccount", id: "LIST" },
            ...result.ids.map((id) => ({ type: "TxAccount", id })),
          ];
        } else return [{ type: "TxAccount", id: "LIST" }];
      },
    }),
    getTxAccount: builder.query({
      query: (id) => ({
        url: `/accounts/${id}`,
        validateStatus: (response, result) => {
          return response.status === 200 && !result.isError;
        },
      }),
      // Pick out data and prevent nested properties in a hook or selector
      transformResponse: (response) => response,
      // Pick out errors and prevent nested properties in a hook or selector
      transformErrorResponse: (response, meta, arg) => response.status,
      providesTags: (result, error, id) => [{ type: "TxAccount", id }],
    }),
    addNewTxAccount: builder.mutation({
      query: (initialTxAccountData) => ({
        url: "/accounts",
        method: "POST",
        body: {
          ...initialTxAccountData,
        },
      }),
      invalidatesTags: [{ type: "TxAccount", id: "LIST" }],
    }),
    updateTxAccount: builder.mutation({
      query: (initialTxAccountData) => ({
        url: "/accounts",
        method: "PATCH",
        body: {
          ...initialTxAccountData,
        },
      }),
      invalidatesTags: (result, error, arg) => [
        { type: "TxAccount", id: arg.id },
      ],
    }),
    deleteTxAccount: builder.mutation({
      query: ({ id }) => ({
        url: `/accounts`,
        method: "DELETE",
        body: { id },
      }),
      invalidatesTags: (result, error, arg) => [
        { type: "TxAccount", id: arg.id },
      ],
    }),
    checkDuplicateTxAccount: builder.mutation({
      query: (initialAccountData) => ({
        url: "/accounts/check",
        method: "POST",
        body: {
          ...initialAccountData,
        },
      }),
      invalidatesTags: [{ type: "TxAccount", id: "LIST" }],
    }),
  }),
});

export const {
  useGetTxAccountsQuery,
  useGetTxAccountQuery,
  //   useCheckDuplicateMutation,
  useAddNewTxAccountMutation,
  useUpdateTxAccountMutation,
  useDeleteTxAccountMutation,
  useCheckDuplicateTxAccountMutation,
} = txAccountApiSlice;

// returns the query result object
export const selectTxAccountsResult =
  txAccountApiSlice.endpoints.getTxAccounts.select();

// creates memoized selector
const selectTxAccountsData = createSelector(
  selectTxAccountsResult,
  (txAccountsResult) => txAccountsResult.data // normalized state object with ids & entities
);

//getSelectors creates these selectors and we rename them with aliases using destructuring
export const {
  selectAll: selectAllTxAccounts,
  selectById: selectTxAccountById,
  selectIds: selectTxAccountIds,
  // Pass in a selector that returns the txAccounts slice of state
} = txAccountsAdapter.getSelectors(
  (state) => selectTxAccountsData(state) ?? initialState
);
