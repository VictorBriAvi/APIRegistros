import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const gastosApi = createApi({
  reducerPath: "gastos",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://localhost:7116/api/",
  }),
  endpoints: (builder) => ({
    getGastos: builder.query({
      query: () => "/Gasto/",
      providesTags: ["Gastos"],
      transformResponse: (response) => response.sort((a, b) => b.id - a.id),
    }),
    getGastoById: builder.query({
      query: (id) => `/Gasto/buscarGastoId/${id}`,
      providesTags: ["Gastos"],
    }),

    getGastoByDate: builder.query({
      query: (fecha) => `/Gasto/buscarGastosPorFecha/${fecha}`,
      providesTags: ["Gastos"],
    }),

    getGastoByRangeDate: builder.query({
      query: (fecha) =>
        `/Gasto/buscarGastosPorRangoFecha/${fecha.fechaInit}/${fecha.fechaEnd}`,
      providesTags: ["Gastos"],
    }),

    createGasto: builder.mutation({
      query: (newGasto) => ({
        url: "/Gasto",
        method: "POST",
        body: newGasto,
      }),
      invalidatesTags: ["Gastos"],
    }),

    updateGasto: builder.mutation({
      query: (updateGasto) => ({
        url: `Gasto/${updateGasto.id}`,
        method: "PUT",
        body: updateGasto,
      }),
      invalidatesTags: ["Gastos"],
    }),
    deleteGasto: builder.mutation({
      query: (id) => ({
        url: `/Gasto/${id}`,
        method: "DELETE",
      }),
      invalidates: ["Gastos"],
    }),
  }),
});

export const {
  useGetGastosQuery,
  useCreateGastoMutation,
  useDeleteGastoMutation,
  useGetGastoByIdQuery,
  useUpdateGastoMutation,
  useGetGastoByDateQuery,
  useGetGastoByRangeDateQuery,
} = gastosApi;
