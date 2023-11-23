import { Link } from "react-router-dom";

import useGastosLogic from "../../Hooks/useGastosLogic";

import DatePicker from "react-datepicker";
import DataTable from "../components/dataTable";
import { Button, Col, Container, Row } from "react-bootstrap";
import moment from "moment";
import { useState } from "react";
import { useEffect } from "react";
import BotonesPrincipalesAgregar from "../components/BotonesPrincipalesAgregar";
import { FcSearch } from "react-icons/fc";
import TitulosPages from "../components/TitulosPages";
import {
  useDeleteGastoMutation,
  useGetGastoByDateQuery,
  useGetGastosQuery,
} from "../../api/gastosApi";

const Cierres = () => {
  const { data: gastos, isLoading, refetch } = useGetGastosQuery();

  const [deleteGasto] = useDeleteGastoMutation();

  const [fechaActual, setFechaActual] = useState("");
  const [fechaSeleccionada, setFechaSeleccionada] = useState(null);
  const [fecha, setFecha] = useState(null);
  const { data: gastoByDate } = useGetGastoByDateQuery(fecha);
  const columnaServicio = [
    { key: "nombreTipoDeGastos", label: "Tipo de gasto" },
    { key: "descripcionGastos", label: "Descripcion" },
    { key: "precioGasto", label: "Valor Gasto" },
    { key: "fechaGastoFormateada", label: "Fecha del gasto" },
  ];

  useEffect(() => {
    const fechaActual = moment().format("YYYY-MM-DD");
    setFecha(fechaActual);
  }, []);

  const handleBuscarPorFecha = (e) => {
    e.preventDefault();
    const fechaFormateada = moment(fechaSeleccionada).format("YYYY-MM-DD");
    setFecha(fechaFormateada); // Actualizo el estado de fecha al valor formateado
  };

  useEffect(() => {
    // Obtiene la fecha actual y la formatea
    const fechaActualFormateada = moment().format("DD MMMM, YYYY");
    setFechaActual(fechaActualFormateada);
  }, []);

  const handleDateChange = (date) => {
    setFechaSeleccionada(date);
  };

  let datosMostrar = gastos; // Inicialmente muestra todos los datos

  if (fecha && gastoByDate && gastoByDate.length > 0) {
    datosMostrar = gastoByDate; // Si hay fecha y datos por fecha, los muestra
  }

  if (isLoading) {
    return <p>Cargando...</p>;
  }
  return (
    <div>
      <div>
        <Link to={"/registros/gastos/TiposDeGastos"}>
          <button className="btn btn-outline-primary me-3 float-end">
            Tipos de gastos
          </button>
        </Link>
        <TitulosPages titulo="Gastos" regresar={`/registros/`} />
      </div>

      <hr />

      <Container>
        <Row>
          <Col sm={6} className="my-2">
            <BotonesPrincipalesAgregar
              agregar={`/registros/crear-tipoDeGasto`}
              tituloBoton={"Agregar nueva gasto"}
            />
          </Col>

          <Col sm={6}>
            <div className="contenedor_filtro_fechas">
              <h3>Buscar por fecha:</h3>
              <DatePicker
                selected={fechaSeleccionada}
                onChange={handleDateChange}
                placeholderText="¿ Que fecha buscamos?"
                dateFormat="dd/MM/yyyy"
                className="custom-datepicker" // Agrega una clase personalizada
              />

              <Button
                className="mt-3 boton_buscar"
                onClick={(e) => handleBuscarPorFecha(e)}
              >
                <FcSearch /> Buscar fecha
              </Button>
            </div>
          </Col>
        </Row>
      </Container>
      <Container>
        <h4 className="text-center my-5">Fecha actual: {fechaActual}</h4>
        <DataTable
          columnaServicio={columnaServicio}
          data={datosMostrar}
          deleteData={deleteGasto}
          paginaSiguiente={"paginaSiguiente"}
          paginaAnterior={"paginaAnterior"}
          editUrl="/registros/gastos/editar-gasto"
          randomId="gastosId"
          refetchData={refetch}
        />
      </Container>
    </div>
  );
};

export default Cierres;
