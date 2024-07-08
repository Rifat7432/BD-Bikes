import { baseApi } from "../../services/API";

const productApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // create Products api
    createProducts: builder.mutation({
      query: (product) => {
        return {
          url: "/products/create-product",
          method: "POST",
          body: product.data,
          
        };
      },
      invalidatesTags: ["getProducts"],
    }),
    // get Products api
    getProducts: builder.query({
      query: (filter) => ({
        url: "/products/get-products",
        method: "GET",
        params: filter.query,
       
      }),
      providesTags: ["getProducts"],
    }),
    // sale Product api
    saleProduct: builder.mutation({
      query: (product) => {
        return {
          url: `/products/sale-product/${product.id}`,
          method: "PATCH",
          body: product.sale,
          
        };
      },
      invalidatesTags: ["getProducts"],
    }),
    // update Product api
    updateProduct: builder.mutation({
      query: (product) => {
        return {
          url: `/products/update-product/${product.id}`,
          method: "PUT",
          body: product.product,
        
        };
      },
      invalidatesTags: ["getProducts"],
    }),
    // delete Product api
    deleteProduct: builder.mutation({
      query: (params) => {
        return {
          url: `/products/remove-product/${params.id}`,
          method: "DELETE",
          
        };
      },
      invalidatesTags: ["getProducts"],
    }),
  }),
});

export const {
  useCreateProductsMutation,
  useGetProductsQuery,
  useUpdateProductMutation,
  useSaleProductMutation,
  useDeleteProductMutation,
} = productApi;
