import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'; // Ensure correct imports
import { getBaseUrl } from '/src/utils/baseURL.js'; // Ensure you are importing correctly

const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${getBaseUrl()}/api/auth`, // Use the correct base URL
    credentials: 'include', // This is good for handling cookies
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
        method: "POST"
      }),
    }),
    getUser: builder.query({
      query: () => ({
        url: "/users",
        method: "GET",
      }),
      refetchOnMount:true,
      invalidatesTags:["User"],
    }),
    deleteUser: builder.mutation({
      query: (userId) => ({
        url: `/users/${userId}`,
        method: "DELETE",
      }),
      invalidatesTags:["User"],
    }),
    editProfile: builder.mutation({
      query: (profileData) => ({
        url: `/edit-profile`,
        method: "PATCH",
        body: profileData,
      }),
    }),
    updateUserProfile: builder.mutation({
      query: (userData) => ({
        url: "/update-profile",
        method: "POST",
        body: userData,
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
