import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";

import { Routes, Route } from "react-router-dom";
import AgregarProducto from "./components/productos/AgregarProducto";
import Inicio from "./components/Inicio";
import EditarProducto from "./components/productos/EditarProducto";
import Productos from "./components/productos/Productos";
import Servicios from "./components/servicios/servicios";
import Colaboradores from "./components/servicios/Colaboradores";
import AgregarColaborador from "./components/servicios/AgregarColaborador";
import EditarColaborador from "./components/servicios/EditarColaborador";
import Clientes from "./components/servicios/Clientes";
import AgregarCliente from "./components/servicios/AgregarCliente";
import EditarCliente from "./components/servicios/EditarCliente";
import TiposDeServicios from "./components/servicios/TiposDeServicios";
import AgregarTipoDeServicio from "./components/servicios/AgregarTipoDeServicio";
import EditarTipoDeServicio from "./components/servicios/EditarTipoDeServicio";
import TiposDePago from "./components/servicios/TiposDePago";
import AgregarTipoDePago from "./components/servicios/AgregarTipoDePago";
import EditarTipoDePago from "./components/servicios/EditarTipoDePago";
import AgregarServicio from "./components/servicios/AgregarServicio";
import EditarServicio from "./components/servicios/EditarServicio";
import Gastos from "./components/gastos/Gastos";
import AgregarGasto from "./components/gastos/AgregarGasto";
import TiposDeGastos from "./components/gastos/TiposDeGastos";
import AgregarTipoDeGasto from "./components/gastos/AgregarTipoDeGasto";
import EditarTipoDegasto from "./components/gastos/EditarTipoDegasto";
import EditarGasto from "./components/gastos/EditarGasto";
import ArqueoDeCaja from "./components/arqueo-de-caja/ArqueoDeCaja";
import CalculosPorcentaje from "./components/servicios/CalculosPorcentaje";
import CategoriaServicios from "./components/servicios/CategoriaServicios";
import AgregarCategoriaServicio from "./components/servicios/AgregarCategoriaServicio";
import EditarCategoriaServicio from "./components/servicios/EditarCategoriaServicio";
import { AuthProvider } from "./components/context/authContext";
import ProtectedRoute from "./ProtectedRoute";
import Login from "./Login";
import Register from "./Register";
import ResetPassword from "./ResetPassword";
import HistorialClientes from "./components/servicios/HistorialClientes";
import EditarHistorialCliente from "./components/servicios/EditarHistorialCliente";
import AgregarHistorialClientes from "./components/servicios/AgregarHistorialClientes";

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route
          path="/registros/"
          element={
            <ProtectedRoute>
              <Inicio />
            </ProtectedRoute>
          }
        ></Route>
        {/** Aca comienza el route de productos          <Route path="/registros/" element={<Inicio />}></Route>*/}
        <Route path="/registros/productos" element={<Productos />}></Route>
        <Route
          path="/registros/crear-producto"
          element={
            <ProtectedRoute>
              <AgregarProducto />
            </ProtectedRoute>
          }
        ></Route>
        <Route
          path="/registros/editar-producto/:id"
          element={
            <ProtectedRoute>
              <EditarProducto />
            </ProtectedRoute>
          }
        ></Route>
        {/** Aca comienza el route de servicios */}
        <Route
          path="/registros/servicios"
          element={
            <ProtectedRoute>
              <Servicios />
            </ProtectedRoute>
          }
        ></Route>
        <Route
          path="/registros/crear-servicio/"
          element={
            <ProtectedRoute>
              <AgregarServicio />
            </ProtectedRoute>
          }
        ></Route>
        <Route
          path="/registros/editar-servicio/:id"
          element={
            <ProtectedRoute>
              <EditarServicio />
            </ProtectedRoute>
          }
        ></Route>
        {/** Aca comienza el route de colaboradores */}
        <Route
          path="/registros/colaboradores"
          element={
            <ProtectedRoute>
              <Colaboradores />
            </ProtectedRoute>
          }
        ></Route>
        <Route
          path="/registros/crear-colaborador"
          element={
            <ProtectedRoute>
              <AgregarColaborador />
            </ProtectedRoute>
          }
        ></Route>
        <Route
          path="/registros/editar-colaboradores/:id"
          element={
            <ProtectedRoute>
              <EditarColaborador />
            </ProtectedRoute>
          }
        />
        {/** Aca comienza el route de clientes */}
        <Route
          path="/registros/clientes"
          element={
            <ProtectedRoute>
              <Clientes />
            </ProtectedRoute>
          }
        ></Route>
        <Route
          path="/registros/crear-cliente"
          element={
            <ProtectedRoute>
              <AgregarCliente />
            </ProtectedRoute>
          }
        ></Route>
        <Route
          path="/registros/editar-cliente/:id"
          element={
            <ProtectedRoute>
              <EditarCliente />
            </ProtectedRoute>
          }
        ></Route>
        {/** Aca comienza el route de tipos de servicios */}
        <Route
          path="/registros/servicios/tiposDeServicios"
          element={
            <ProtectedRoute>
              <TiposDeServicios />
            </ProtectedRoute>
          }
        ></Route>
        <Route
          path="/registros/servicios/tiposDeServicios/crear-tipoDeServicio"
          element={
            <ProtectedRoute>
              <AgregarTipoDeServicio />
            </ProtectedRoute>
          }
        ></Route>
        <Route
          path="/registros/servicios/tiposDeServicios/editar-tipoDeServicio/:id"
          element={
            <ProtectedRoute>
              <EditarTipoDeServicio />
            </ProtectedRoute>
          }
        />
        <Route
          path="/registros/servicios/tiposDeServicios/porcentaje"
          element={
            <ProtectedRoute>
              <CalculosPorcentaje />
            </ProtectedRoute>
          }
        />
        {/** Aca comienza el route de tipos de pago */}
        <Route
          path="/registros/tiposDePago"
          element={
            <ProtectedRoute>
              <TiposDePago />
            </ProtectedRoute>
          }
        ></Route>
        <Route
          path="/registros/crear-tipoDePago"
          element={
            <ProtectedRoute>
              <AgregarTipoDePago />
            </ProtectedRoute>
          }
        ></Route>
        <Route
          path="/registros/editar-tipoDePago/:id"
          element={
            <ProtectedRoute>
              <EditarTipoDePago />
            </ProtectedRoute>
          }
        ></Route>
        {/** Aca comienza el route de cierres de venta */}
        <Route
          path="/registros/gastos"
          element={
            <ProtectedRoute>
              <Gastos />
            </ProtectedRoute>
          }
        ></Route>
        <Route
          path="/registros/gastos/editar-gasto/:id"
          element={
            <ProtectedRoute>
              <EditarGasto />
            </ProtectedRoute>
          }
        ></Route>
        <Route
          path="/registros/crear-tipoDeGasto/:porcentajeColaborador"
          element={
            <ProtectedRoute>
              <AgregarGasto />
            </ProtectedRoute>
          }
        ></Route>
        <Route
          path="/registros/crear-tipoDeGasto"
          element={
            <ProtectedRoute>
              <AgregarGasto />
            </ProtectedRoute>
          }
        ></Route>
        {/** Aca comienza el route de tipos de gastos*/}
        <Route
          path="/registros/gastos/TiposDeGastos"
          element={
            <ProtectedRoute>
              <TiposDeGastos />
            </ProtectedRoute>
          }
        ></Route>
        <Route
          path="/registros/gastos/TiposDeGastos/Agregar-TipoDeGasto"
          element={
            <ProtectedRoute>
              <AgregarTipoDeGasto />
            </ProtectedRoute>
          }
        ></Route>
        <Route
          path="/registros/gastos/TiposDeGastos/editar-tipoDeGasto/:id"
          element={
            <ProtectedRoute>
              <EditarTipoDegasto />
            </ProtectedRoute>
          }
        ></Route>
        {/** Aca comienza el arqueo de caja*/}
        <Route
          path="/registros/arqueo-de-caja"
          element={
            <ProtectedRoute>
              <ArqueoDeCaja />
            </ProtectedRoute>
          }
        ></Route>
        {/**Aca comienza categoria servicios */}
        <Route
          path="/registros/servicios/tiposDeServicios/categoriaServicio"
          element={
            <ProtectedRoute>
              <CategoriaServicios />
            </ProtectedRoute>
          }
        />
        <Route
          path="/registros/servicios/tiposDeServicios/categoriaServicio/agregar-categoria-servicio"
          element={
            <ProtectedRoute>
              <AgregarCategoriaServicio />
            </ProtectedRoute>
          }
        />
        <Route
          path="/registros/servicios/tiposDeServicios/categoriaServicio/editar-categoria-servicio/:id"
          element={
            <ProtectedRoute>
              <EditarCategoriaServicio />
            </ProtectedRoute>
          }
        />

        <Route
          path="/registros/servicios/historial-clientes"
          element={<HistorialClientes />}
        />
        <Route
          path="/registros/servicios/historial-clientes/agregar-historial-clientes"
          element={<AgregarHistorialClientes />}
        />
        <Route
          path="/registros/servicios/historial-clientes/editar-historial-clientes/:id"
          element={<EditarHistorialCliente />}
        />

        <Route path="/registros/login" element={<Login />} />
        <Route path="/registros/registrar" element={<Register />} />
        <Route path="/registros/reset-password" element={<ResetPassword />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;
