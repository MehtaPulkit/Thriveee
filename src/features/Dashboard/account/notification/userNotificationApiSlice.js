import { createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "../../../../app/api/apiSlice";

const userNotiPrefAdapter = createEntityAdapter({});

export const userNotificationApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getNotificationPreference: builder.query({
      query: (id) => ({
        url: `/notification-preference/${id}`,
        validateStatus: (response, result) => {
          return response.status === 200 && !result.isError;
        },
      }),
      // Pick out data and prevent nested properties in a hook or selector
      transformResponse: (response) => response,
      // Pick out errors and prevent nested properties in a hook or selector
      transformErrorResponse: (response, meta, arg) => response.status,
      providesTags: (result, error, id) => [{ type: "NotificationPreference", id }],
    }),
  }),
});

export const { useGetNotificationPreferenceQuery } = userNotificationApiSlice;

