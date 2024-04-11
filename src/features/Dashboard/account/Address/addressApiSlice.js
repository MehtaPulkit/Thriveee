import { createSelector, createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "../../../../app/api/apiSlice";

const addressesAdapter = createEntityAdapter({});

const initialState = addressesAdapter.getInitialState();

export const addressApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAddresses: builder.query({
      query: () => ({
        url: "/addresses",
        validateStatus: (response, result) => {
          return response.status === 200 && !result.isError;
        },
      }),
      transformResponse: (responseData) => {
        const loadedAddresses = responseData.map((address) => {
          address.id = address._id;
          return address;
        });
        return addressesAdapter.setAll(initialState, loadedAddresses);
      },
      providesTags: (result, error, arg) => {
        if (result?.ids) {
          return [
            { type: "Address", id: "LIST" },
            ...result.ids.map((id) => ({ type: "Address", id })),
          ];
        } else return [{ type: "Address", id: "LIST" }];
      },
    }),
    getAddress: builder.query({
      query: (id) => ({
        url: `/addresses/${id}`,
        validateStatus: (response, result) => {
          return response.status === 200 && !result.isError;
        },
      }),
      // Pick out data and prevent nested properties in a hook or selector
      transformResponse: (response) => response,
      // Pick out errors and prevent nested properties in a hook or selector
      transformErrorResponse: (response, meta, arg) => response.status,
      providesTags: (result, error, id) => [{ type: "Address", id }],
    }),
    addNewAddress: builder.mutation({
      query: (initialAddressData) => ({
        url: "/addresses",
        method: "POST",
        body: {
          ...initialAddressData,
        },
      }),
      invalidatesTags: [{ type: "Address", id: "LIST" }],
    }),
    updateAddress: builder.mutation({
      query: (initialAddressData) => ({
        url: "/addresses",
        method: "PATCH",
        body: {
          ...initialAddressData,
        },
      }),
      invalidatesTags: (result, error, arg) => [{ type: "Address", id: arg.id }],
    }),
    deleteAddress: builder.mutation({
      query: ({ id }) => ({
        url: `/addresses`,
        method: "DELETE",
        body: { id },
      }),
      invalidatesTags: (result, error, arg) => [{ type: "Address", id: arg.id }],
    }),
  }),
});

export const {
  useGetAddressesQuery,
  useGetAddressQuery,
  useAddNewAddressMutation,
  useUpdateAddressMutation,
  useDeleteAddressMutation,
} = addressApiSlice;

// returns the query result object
export const selectAddressesResult = addressApiSlice.endpoints.getAddresses.select();

// creates memoized selector
const selectAddressesData = createSelector(
  selectAddressesResult,
  (addressesResult) => addressesResult.data // normalized state object with ids & entities
);

//getSelectors creates these selectors and we rename them with aliases using destructuring
export const {
  selectAll: selectAllAddresses,
  selectById: selectAddressById,
  selectIds: selectAddressIds,
  // Pass in a selector that returns the addresses slice of state
} = addressesAdapter.getSelectors(
  (state) => selectAddressesData(state) ?? initialState
);
