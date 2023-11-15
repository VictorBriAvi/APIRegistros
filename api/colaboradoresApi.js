import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const colaboradoresApi = createApi({
  reducerPath: "colaboradores",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://localhost:7116/api/",
  }),
  endpoints: (builder) => ({
    getColaboradores: builder.query({
      query: () => "/empleados/",
      providesTags: ["Colaboradores"],
      transformResponse: (response) => response.sort((a, b) => b.id - a.id),
    }),
    getColaboradorById: builder.query({
      query: (id) => `/empleados/buscarEmpleadoPorId/${id}`,
      providesTags: ["Colaboradores"],
    }),
    updateColaborador: builder.mutation({
      query: (updateColaborador) => ({
        url: `/empleados/${updateColaborador.id}`,
        method: "PUT",
        body: updateColaborador,
      }),
      invalidatesTags: ["Colaboradores"],
    }),
    createColaborador: builder.mutation({
      query: (newColaborador) => ({
        url: "/empleados",
        method: "POST",
        body: newColaborador,
      }),
      invalidatesTags: ["Colaboradores"],
    }),
    deleteColaborador: builder.mutation({
      query: (id) => ({
        url: `/empleados/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Colaboradores"],
    }),
  }),
});

export const {
  useGetColaboradoresQuery,
  useCreateColaboradorMutation,
  useDeleteColaboradorMutation,
  useUpdateColaboradorMutation,
  useGetColaboradorByIdQuery,
} = colaboradoresApi;
