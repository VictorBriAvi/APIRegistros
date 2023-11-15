import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const productosApi = createApi({
  reducerPath: "productos",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://localhost:7116/api/",
  }),
  endpoints: (builder) => ({
    getProductos: builder.query({
      query: () => "/productos/",
      providesTags: ["Productos"],
      transformResponse: (response) => response.sort((a, b) => b.id - a.id),
    }),

    getProductoById: builder.query({
      query: (id) => `/productos/buscarProductoPorId/${id}`,
      providesTags: ["Productos"],
    }),
    getProductosByName: builder.query({
      query: (nombre) => `/productos/buscarpProductoPorCodigo/${nombre}`,
      providesTags: ["Productos"],
    }),
    getProductosPaginacion: builder.query({
      query: (pagina, tamanoPagina) =>
        `productos/buscarConPaginacion/${pagina}/${tamanoPagina}`,
      providesTags: ["Productos"],
    }),

    updateProducto: builder.mutation({
      query: (updateProducto) => ({
        url: `productos/${updateProducto.id}`,
        method: "PUT",
        body: updateProducto,
      }),
      invalidatesTags: ["Productos"],
    }),

    createProductos: builder.mutation({
      query: (newProducto) => ({
        url: "productos",
        method: "POST",
        body: newProducto,
      }),
      invalidatesTags: ["Productos"],
    }),
    deleteProducto: builder.mutation({
      query: (id) => ({
        url: `/productos/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Productos"],
    }),
  }),
});

export const {
  useGetProductosQuery,
  useCreateProductosMutation,
  useGetProductoByIdQuery,
  useUpdateProductoMutation,
  useDeleteProductoMutation,
  useGetProductosByNameQuery,
  useGetProductosPaginacionQuery,
} = productosApi;
