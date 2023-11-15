import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const tipoDePagoApi = createApi({
  reducerPath: "tipoDePago",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://localhost:7116/api/",
  }),
  endpoints: (builder) => ({
    getTipoDePago: builder.query({
      query: () => "/tipodepago/",
      providesTags: ["TipoDePago"],
      transformResponse: (response) => response.sort((a, b) => b.id - a.id),
    }),
    getTipoDePagoById: builder.query({
      query: (id) => `/tipodepago/buscartipoDePagoId/${id}`,
      providesTags: ["TipoDePago"],
    }),
    createTipoDePago: builder.mutation({
      query: (newTipoDePago) => ({
        url: "/tipodepago",
        method: "POST",
        body: newTipoDePago,
      }),
      invalidatesTags: ["TipoDePago"],
    }),
    updateTipoDePago: builder.mutation({
      query: (updateTipoDePago) => ({
        url: `/tipodepago/${updateTipoDePago.id}`,
        method: "PUT",
        body: updateTipoDePago,
      }),
      invalidatesTags: ["Productos"],
    }),
    deleteTipoDePago: builder.mutation({
      query: (id) => ({
        url: `/tipodepago/${id}`,
        method: "DELETE",
      }),
      invalidates: ["TipoDePago"],
    }),
  }),
});

export const {
  useGetTipoDePagoQuery,
  useGetTipoDePagoByIdQuery,
  useCreateTipoDePagoMutation,
  useDeleteTipoDePagoMutation,
  useUpdateTipoDePagoMutation,
} = tipoDePagoApi;
