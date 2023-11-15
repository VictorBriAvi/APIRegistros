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
  }),
});

export const { useGetServiciosQuery } = servicioApi;
