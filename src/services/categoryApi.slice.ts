import { api } from './index';

const baseUrl = '/categories';
export const injectEndpoints = api.injectEndpoints({
  endpoints: builder => ({
    registerCategory: builder.mutation({
      query: (body) => ({
        url: `${baseUrl}`,
        method: 'POST',
        body,
      }),
    }),
    getcategories: builder.query({
      query: () => ({ url: `${baseUrl}` }),
    }),
    updateCategories: builder.mutation({
      query: (body) => ({
        url: `${baseUrl}/${body.id}`,
        method: 'put',
        body,
      }),
    }),
    deleteCategory: builder.mutation({
      query: (body) => ({
        url: `${baseUrl}/${body.id}`,
        method: 'delete',

      }),
    }),
    getoneCategory: builder.query({
      query: (id) => `${baseUrl}/${id}`,
    }),

  }),
});

export const {
  useRegisterCategoryMutation,
  useGetcategoriesQuery,
  useUpdateCategoriesMutation,
  useDeleteCategoryMutation,
  useGetoneCategoryQuery,
} = injectEndpoints;
