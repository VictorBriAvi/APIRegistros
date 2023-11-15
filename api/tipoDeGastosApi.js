import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const tipoDeGastosApi = createApi({
  reducerPath: "tipoDeGastos",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://localhost:7116/api/",
  }),
  endpoints: (builder) => ({
    getTipoDeGastos: builder.query({
      query: () => "/tipoDeGastos",
      providesTags: ["TipoDeGastos"],
      transformResponse: (response) => response.sort((a, b) => b.id - a.id),
    }),
    getTipoDeGastoById: builder.query({
      query: (id) => `tipoDeGastos/buscarTipoDeGastoPorId/${id}`,
      providesTags: ["TipoDeGastos"],
    }),
    createTipoDeGasto: builder.mutation({
      query: (newTipoDeGasto) => ({
        url: "/tipoDeGastos",
        method: "POST",
        body: newTipoDeGasto,
      }),
      invalidatesTags: ["TipoDeGastos"],
    }),

    updateTipoDeGasto: builder.mutation({
      query: (updateTipoDeGasto) => ({
        url: `/tipoDeGastos/${updateTipoDeGasto.id}`,
        method: "PUT",
        body: updateTipoDeGasto,
      }),
      invalidatesTags: ["TipoDeGastos"],
    }),

    deleteTipoDeGasto: builder.mutation({
      query: (id) => ({
        url: `/tipoDeGastos/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["TipoDeGastos"],
    }),
  }),
});

export const {
  useGetTipoDeGastosQuery,
  useGetTipoDeGastoByIdQuery,
  useUpdateTipoDeGastoMutation,
  useCreateTipoDeGastoMutation,
  useDeleteTipoDeGastoMutation,
} = tipoDeGastosApi;
