import { baseApi } from "../../services/API";

const saleHistoryApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // get History api
    getHistory: builder.query({
      query: () => {
        return {
          url: `/history/sales`,
          method: "GET",
        };
      },
    }),
  }),
});

export const { useGetHistoryQuery } = saleHistoryApi;
