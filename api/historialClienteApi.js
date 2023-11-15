import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const historialClienteApi = createApi({
  reducerPath: "historialCliente",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://localhost:7116/api/",
  }),
  endpoints: (builder) => ({
    getHistorialClientes: builder.query({
      query: () => "/HistorialCliente/",
      providesTags: ["HistorialCliente"],
      transformResponse: (response) => response.sort((a, b) => b.id - a.id),
    }),

    getHistorialClienteById: builder.query({
      query: (id) => `/HistorialCliente/buscarHistorialClienteId/${id}`,
      providesTags: ["HistorialCliente"],
    }),

    createHistorialCliente: builder.mutation({
      query: (newHistorialCliente) => ({
        url: "/HistorialCliente",
        method: "POST",
        body: newHistorialCliente,
      }),
      invalidatesTags: ["HistorialCliente"],
    }),

    updateHistorialCliente: builder.mutation({
      query: (updateHistorialCliente) => ({
        url: `/HistorialCliente/${updateHistorialCliente.id}`,
        method: "PUT",
        body: updateHistorialCliente,
      }),
      invalidatesTags: ["HistorialCliente"],
    }),
    deleteHistorialCliente: builder.mutation({
      query: (id) => ({
        url: `/HistorialCliente/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["HistorialCliente"],
    }),
  }),
});

export const {
  useGetHistorialClientesQuery,
  useCreateHistorialClienteMutation,
  useDeleteHistorialClienteMutation,
  useUpdateHistorialClienteMutation,
  useGetHistorialClienteByIdQuery,
} = historialClienteApi;
