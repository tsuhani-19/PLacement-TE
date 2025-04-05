import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { getBaseUrl } from '/src/utils/baseURL.js';

const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${getBaseUrl()}/api/auth`,
    credentials: 'include',
  }),
  tagTypes: ["User"],
  endpoints: (builder) => ({
    registerUser: builder.mutation({
      query: (newUser) => ({
        url: "/register",
        method: "POST",
        body: newUser,
      }),
    }),
    loginUser: builder.mutation({
      query: (credentials) => ({
        url: "/login",
        method: "POST",
        body: credentials,
      }),
    }),
    logoutUser: builder.mutation({
      query: () => ({
        url: "/logout",
        method: "POST",
      }),
    }),
    getUser: builder.query({
      query: () => ({
        url: "/users",
        method: "GET",
      }),
      providesTags: ["User"], // Use providesTags for queries
    }),
    deleteUser: builder.mutation({
      query: (userId) => ({
        url: `/users/${userId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["User"],
    }),
    editProfile: builder.mutation({
      query: (profileData) => ({
        url: "/edit-profile",
        method: "PATCH",
        body: profileData,
      }),
      invalidatesTags: ["User"], // Add invalidatesTags
    }),
    updateUserProfile: builder.mutation({
      query: (userData) => ({
        url: "/update-profile",
        method: "POST",
        body: userData, // Use userData instead of profileData
      }),
      invalidatesTags: ["User"], 
    }),
  }),
});

export const {
  useRegisterUserMutation,
  useUpdateUserProfileMutation,
  useLoginUserMutation,
  useLogoutUserMutation,
  useGetUserQuery,
  useDeleteUserMutation,
  useEditProfileMutation
} = authApi;

export default authApi;
