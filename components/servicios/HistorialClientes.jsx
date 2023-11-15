import moment from "moment";
import { useState } from "react";
import useHistorialClientesLogic from "../../Hooks/useHistorialClientesLogic";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import TitulosPages from "../components/TitulosPages";
import { Button, Col, Container, Row } from "react-bootstrap";
import BotonesPrincipalesAgregar from "../components/BotonesPrincipalesAgregar";
import DatePicker from "react-datepicker";
import { FcSearch } from "react-icons/fc";
import DataTable from "../components/dataTable";
import {
  useDeleteHistorialClienteMutation,
  useGetHistorialClientesQuery,
} from "../../api/historialClienteApi";

const HistorialClientes = () => {
  const [fechaActual, setFechaActual] = useState("");
  const [fechaSeleccionada, setFechaSeleccionada] = useState(null);

  const {
    data: historialClientes,
    isLoading,
    refetch,
  } = useGetHistorialClientesQuery();

  const [deleteHistorialCliente] = useDeleteHistorialClienteMutation();

  console.log(historialClientes);
  const columnaServicio = [
    { key: "nombreDeHistorialCliente", label: "Historial" },
    { key: "descripcionHistorialCliente", label: "Desripcion" },
    { key: "nombreCompletoCliente", label: "Nombre Cliente" },
    { key: "fechaClienteFormateada", label: "Fecha de historial" },
  ];

  const deleteGasto = () => {
    console.log("delete");
  };

  const paginaSiguiente = () => {
    console.log("siguiente");
  };

  const paginaAnterior = () => {
    console.log("Anterior");
  };

  const handleBuscarPorFecha = (e) => {
    e.preventDefault();
    const fecha = moment(fechaSeleccionada).format("YYYY-MM-DD");
    getHistorialClientes(fecha);
  };

  useEffect(() => {
    // Obtiene la fecha actual y la formatea
    const fechaActualFormateada = moment().format("DD MMMM, YYYY");
    setFechaActual(fechaActualFormateada);
  }, []);

  const handleDateChange = (date) => {
    setFechaSeleccionada(date);
  };

  if (isLoading) {
    return <p>Cargando...</p>;
  }
  return (
    <div>
      <div>
        <TitulosPages titulo="Historial Cliente" regresar={`/registros/`} />
      </div>

      <hr />

      <Container>
        <Row>
          <Col sm={6} className="my-2">
            <BotonesPrincipalesAgregar
              agregar={`/registros/servicios/historial-clientes/agregar-historial-clientes`}
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
          data={historialClientes}
          deleteData={deleteHistorialCliente}
          paginaSiguiente={paginaSiguiente}
          paginaAnterior={paginaAnterior}
          editUrl="/registros/servicios/historial-clientes/editar-historial-clientes"
          randomId="historialClientesId"
          refetchData={refetch}
        />
      </Container>
    </div>
  );
};

export default HistorialClientes;
