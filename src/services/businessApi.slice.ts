import { api } from './index';

const baseUrl = '/business';
export const injectEndpoints = api.injectEndpoints({
  endpoints: builder => ({
    registerbusiness: builder.mutation({
      query: (body) => ({
        url: `${baseUrl}`,
        method: 'POST',
        body,
      }),
    }),
    getbusinesses: builder.query({
      query: () => ({ url: `${baseUrl}` }),
    }),
    updatebusiness: builder.mutation({
      query: (body) => ({
        url: `${baseUrl}/${body._id}`,
        method: 'put',
        body,
      }),
    }),
    deletebusiness: builder.mutation({
      query: (id) => ({
        url: `${baseUrl}/${id}`,
        method: 'delete',

      }),
    }),
    getonebusiness: builder.query({
      query: (id) => `${baseUrl}/${id}`,
    }),

  }),
});

export const {
  useRegisterbusinessMutation,
  useGetbusinessesQuery,
  useUpdatebusinessMutation,
  useDeletebusinessMutation,
  useGetonebusinessQuery

} = injectEndpoints;
