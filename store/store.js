import { productosApi } from "../api/productosApi";
import { gastosApi } from "../api/gastosApi";
import { setupListeners } from "@reduxjs/toolkit/query";
import { configureStore } from "@reduxjs/toolkit";
import { colaboradoresApi } from "../api/colaboradoresApi";
import { tipoDeGastosApi } from "../api/tipoDeGastosApi";
import { clientesApi } from "../api/clientesApi";
import { tiposDeServiciosApi } from "../api/tiposDeServiciosApi";
import { categoriaServicioApi } from "../api/categoriaServicioApi";
import { tipoDePagoApi } from "../api/tipoDePagoApi";
import { historialClienteApi } from "../api/historialClienteApi";
import { servicioApi } from "../api/servicioApi";

export const store = configureStore({
  reducer: {
    [productosApi.reducerPath]: productosApi.reducer,
    [gastosApi.reducerPath]: gastosApi.reducer,
    [tipoDeGastosApi.reducerPath]: tipoDeGastosApi.reducer,
    [colaboradoresApi.reducerPath]: colaboradoresApi.reducer,
    [clientesApi.reducerPath]: clientesApi.reducer,
    [tiposDeServiciosApi.reducerPath]: tiposDeServiciosApi.reducer,
    [categoriaServicioApi.reducerPath]: categoriaServicioApi.reducer,
    [tipoDePagoApi.reducerPath]: tipoDePagoApi.reducer,
    [historialClienteApi.reducerPath]: historialClienteApi.reducer,
    [servicioApi.reducerPath]: servicioApi.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(gastosApi.middleware)
      .concat(productosApi.middleware)
      .concat(tipoDeGastosApi.middleware)
      .concat(colaboradoresApi.middleware)
      .concat(clientesApi.middleware)
      .concat(categoriaServicioApi.middleware)
      .concat(tipoDePagoApi.middleware)
      .concat(historialClienteApi.middleware)
      .concat(servicioApi.middleware)
      .concat(tiposDeServiciosApi.middleware),
});
setupListeners(store.dispatch);
