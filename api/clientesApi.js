import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const clientesApi = createApi({
  reducerPath: "clientes",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://localhost:7116/api/",
  }),
  endpoints: (builder) => ({
    getClientes: builder.query({
      query: () => "/clientes",
      providesTags: ["Clientes"],
      transformResponse: (response) => response.sort((a, b) => b.id - a.id),
    }),

    getClienteById: builder.query({
      query: (id) => `/clientes/buscarClienteId/${id}`,
      providesTags: ["Clientes"],
    }),

    createClientes: builder.mutation({
      query: (newCliente) => ({
        url: "clientes",
        method: "POST",
        body: newCliente,
      }),
      invalidatesTags: ["Clientes"],
    }),

    updateCliente: builder.mutation({
      query: (updateCliente) => ({
        url: `/clientes/${updateCliente.id}`,
        method: "PUT",
        body: updateCliente,
      }),
      invalidatesTags: ["Clientes"],
    }),

    deleteCliente: builder.mutation({
      query: (id) => ({
        url: `/clientes/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Clientes"],
    }),
  }),
});

export const {
  useGetClientesQuery,
  useCreateClientesMutation,
  useDeleteClienteMutation,
  useGetClienteByIdQuery,
  useUpdateClienteMutation,
} = clientesApi;
