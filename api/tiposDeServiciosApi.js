import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const tiposDeServiciosApi = createApi({
  reducerPath: "tipoDeServicios",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://localhost:7116/api/",
  }),
  endpoints: (builder) => ({
    getTiposDeServicios: builder.query({
      query: () => "/tipodeservicio/",
      providesTags: ["TipoDeServicios"],
      transformResponse: (response) => response.sort((a, b) => b.id - a.id),
    }),
    getTipoDeServicioById: builder.query({
      query: (id) => `/tipodeservicio/buscartipoDeServicioId/${id}`,
      providesTags: ["TipoDeServicios"],
    }),

    createTipoDeServicio: builder.mutation({
      query: (newTipoDeServicio) => ({
        url: `/tipodeservicio`,
        method: "POST",
        body: newTipoDeServicio,
      }),
      invalidatesTags: ["TipoDeServicios"],
    }),
    updateTipoDeServicio: builder.mutation({
      query: (updateTipoDeServicio) => ({
        url: `/tipodeservicio/${updateTipoDeServicio.id}`,
        method: "PUT",
        body: updateTipoDeServicio,
      }),
      invalidatesTags: ["TipoDeServicios"],
    }),
    deleteTipoDeServicio: builder.mutation({
      query: (id) => ({
        url: `/tipodeservicio/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["TipoDeServicios"],
    }),
  }),
});

export const {
  useGetTiposDeServiciosQuery,
  useDeleteTipoDeServicioMutation,
  useCreateTipoDeServicioMutation,
  useUpdateTipoDeServicioMutation,
  useGetTipoDeServicioByIdQuery,
} = tiposDeServiciosApi;
