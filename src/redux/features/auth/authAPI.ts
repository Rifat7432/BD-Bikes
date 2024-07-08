import { baseApi } from "../../services/API";

const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (user) => {
        return {
          url: "/auth/login",
          method: "POST",
          body: user,
        };
      },
    }),
    signUp: builder.mutation({
        query: (user) => {
          return {
            url: "/user/register",
            method: "POST",
            body: user,
          };
        },
      }),
  }),
});

export const { useLoginMutation,useSignUpMutation } = authApi;
