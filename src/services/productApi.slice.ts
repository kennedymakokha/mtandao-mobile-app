import { api } from './index';

const baseUrl = '/products';
export const injectEndpoints = api.injectEndpoints({
  endpoints: builder => ({
    registerproduct: builder.mutation({
      query: (formData) => ({
        url: `${baseUrl}`,
        method: 'POST',
        body:formData,
      }),
    }),
    getproducts: builder.query({
      query: () => ({ url: `${baseUrl}` }),
    }),
    getbusinessproducts: builder.query({
      query: (id) => ({ url: `${baseUrl}/business/${id}` }),
    }),
    updateproducts: builder.mutation({
      query: (body) => ({
        url: `${baseUrl}/${body.id}`,
        method: 'put',
        body,
      }),
    }),
    deleteproduct: builder.mutation({
      query: (body) => ({
        url: `${baseUrl}/${body.id}`,
        method: 'delete',

      }),
    }),
    getoneproduct: builder.query({
      query: (id) => `${baseUrl}/${id}`,
    }),

  }),
});

export const {
  useRegisterproductMutation,
  useGetproductsQuery,
  useUpdateproductsMutation,
  useDeleteproductMutation,
  useGetoneproductQuery,
  useGetbusinessproductsQuery
} = injectEndpoints;
