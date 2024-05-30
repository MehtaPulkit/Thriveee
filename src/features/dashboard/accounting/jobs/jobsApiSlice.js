import { createSelector, createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "../../../../app/api/apiSlice";

const jobsAdapter = createEntityAdapter({});

const initialState = jobsAdapter.getInitialState();

export const jobApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getJobs: builder.query({
      query: () => ({
        url: "/jobs",
        validateStatus: (response, result) => {
          return response.status === 200 && !result.isError;
        },
      }),
      transformResponse: (responseData) => {
        const loadedJobs = responseData.map((job) => {
          job.id = job._id;
          return job;
        });
        return jobsAdapter.setAll(initialState, loadedJobs);
      },
      providesTags: (result, error, arg) => {
        if (result?.ids) {
          return [
            { type: "Job", id: "LIST" },
            ...result.ids.map((id) => ({ type: "Job", id })),
          ];
        } else return [{ type: "Job", id: "LIST" }];
      },
    }),
    getJob: builder.query({
      query: (id) => ({
        url: `/jobs/${id}`,
        validateStatus: (response, result) => {
          return response.status === 200 && !result.isError;
        },
      }),
      // Pick out data and prevent nested properties in a hook or selector
      transformResponse: (response) => response,
      // Pick out errors and prevent nested properties in a hook or selector
      transformErrorResponse: (response, meta, arg) => response.status,
      providesTags: (result, error, id) => [{ type: "Job", id }],
    }),
    addNewJob: builder.mutation({
      query: (initialJobData) => ({
        url: "/jobs",
        method: "POST",
        body: {
          ...initialJobData,
        },
      }),
      invalidatesTags: [{ type: "Job", id: "LIST" }],
    }),
    updateJob: builder.mutation({
      query: (initialJobData) => ({
        url: "/jobs",
        method: "PATCH",
        body: {
          ...initialJobData,
        },
      }),
      invalidatesTags: (result, error, arg) => [
        { type: "Job", id: arg.id },
      ],
    }),
    deleteJob: builder.mutation({
      query: ({ id }) => ({
        url: `/jobs`,
        method: "DELETE",
        body: { id },
      }),
      invalidatesTags: (result, error, arg) => [
        { type: "Job", id: arg.id },
      ],
    }),
    checkDuplicateJob: builder.mutation({
      query: (initialAccountData) => ({
        url: "/jobs/check",
        method: "POST",
        body: {
          ...initialAccountData,
        },
      }),
      invalidatesTags: [{ type: "Job", id: "LIST" }],
    }),
  }),
});

export const {
  useGetJobsQuery,
  useGetJobQuery,
  useAddNewJobMutation,
  useUpdateJobMutation,
  useDeleteJobMutation,
  useCheckDuplicateJobMutation,
} = jobApiSlice;

// returns the query result object
export const selectJobsResult =
  jobApiSlice.endpoints.getJobs.select();

// creates memoized selector
const selectJobsData = createSelector(
  selectJobsResult,
  (jobsResult) => jobsResult.data // normalized state object with ids & entities
);

//getSelectors creates these selectors and we rename them with aliases using destructuring
export const {
  selectAll: selectAllJobs,
  selectById: selectJobById,
  selectIds: selectJobIds,
  // Pass in a selector that returns the jobs slice of state
} = jobsAdapter.getSelectors(
  (state) => selectJobsData(state) ?? initialState
);
