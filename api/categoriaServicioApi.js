import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const categoriaServicioApi = createApi({
  reducerPath: "categoriaServicio",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://localhost:7116/api/",
  }),
  endpoints: (builder) => ({
    getCategoriaServicios: builder.query({
      query: () => "/categoriaServicios/",
      providesTags: ["CategoriaServicio"],
      transformResponse: (response) => response.sort((a, b) => b.id - a.id),
    }),
    getCategoriaServicioById: builder.query({
      query: (id) => `/categoriaServicios/buscarPorCategoriaId/${id}`,
      providesTags: ["CategoriaServicio"],
    }),
    createCategoriaServicio: builder.mutation({
      query: (newProducto) => ({
        url: "/categoriaServicios",
        method: "POST",
        body: newProducto,
      }),
      invalidatesTags: ["CategoriaServicio"],
    }),
    updateCategoriaServicio: builder.mutation({
      query: (updateCategoriaServicio) => ({
        url: `/categoriaServicios/${updateCategoriaServicio.categoriasServiciosId}`,
        method: "PUT",
        body: updateCategoriaServicio,
      }),
      invalidatesTags: ["CategoriaServicio"],
    }),
    deleteCategoriaServicio: builder.mutation({
      query: (id) => ({
        url: `/categoriaServicios/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["CategoriaServicio"],
    }),
  }),
});

export const {
  useGetCategoriaServiciosQuery,
  useCreateCategoriaServicioMutation,
  useDeleteCategoriaServicioMutation,
  useGetCategoriaServicioByIdQuery,
} = categoriaServicioApi;
