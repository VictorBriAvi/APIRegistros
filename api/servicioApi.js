import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const servicioApi = createApi({
  reducerPath: "servicio",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://localhost:7116/api/",
  }),
  endpoints: (builder) => ({
    getServicios: builder.query({
      query: () => "/servicio/",
      providesTags: ["Servicio"],
      transformResponse: (response) => response.sort((a, b) => b.id - a.id),
    }),

    getServicioById: builder.query({
      query: (id) => `/servicio/buscarServicioId/${id}`,
      providesTags: ["Servicio"],
    }),

    getServicioByDate: builder.query({
      query: (fecha) => `/servicio/buscarServicioPorFecha/${fecha}`,
      providesTags: ["Servicio"],
    }),

    getServicioByRangeDate: builder.query({
      query: (fecha) =>
        `/servicio/buscarServicioPorRangoFecha/${fecha.fechaInit}/${fecha.fechaEnd}`,
      providesTags: ["Servicio"],
    }),

    createServicio: builder.mutation({
      query: (newServicio) => ({
        url: `/servicio`,
        method: "POST",
        body: newServicio,
      }),
      invalidatesTags: ["Servicio"],
    }),

    updateServicio: builder.mutation({
      query: (updateServicio) => ({
        url: `servicio/${updateServicio.id}`,
        method: "PUT",
        body: updateServicio,
      }),
      invalidatesTags: ["Servicio"],
    }),

    deleteServicio: builder.mutation({
      query: (id) => ({
        url: `/servicio/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Servicio"],
    }),
  }),
});

export const {
  useGetServiciosQuery,
  useCreateServicioMutation,
  useDeleteServicioMutation,
  useUpdateServicioMutation,
  useGetServicioByIdQuery,
  useGetServicioByDateQuery,
  useGetServicioByRangeDateQuery,
} = servicioApi;
