import { Link } from "react-router-dom";

import useServicioLogic from "../../Hooks/useServiciosLogic";

import DataTable from "../components/dataTable";
import { useEffect, useState } from "react";
import moment from "moment";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"; // Importa los estilos CSS
import {
  Button,
  Col,
  Container,
  Dropdown,
  DropdownButton,
  Row,
} from "react-bootstrap";
import BotonesPrincipales from "../components/BotonesPrincipalesAgregar";
import "../../style/Servicios.css";
import { FcSearch } from "react-icons/fc";
import TitulosPages from "../components/TitulosPages";
import {
  useDeleteServicioMutation,
  useGetServicioByDateQuery,
  useGetServiciosQuery,
} from "../../api/servicioApi";

const Servicios = () => {
  const { data: servicios, isLoading, refetch } = useGetServiciosQuery();

  const [fechaActual, setFechaActual] = useState("");
  const [fechaSeleccionada, setFechaSeleccionada] = useState(null);
  const [fecha, setFecha] = useState(null);
  const { data: servicioByDate } = useGetServicioByDateQuery(fecha);
  const [deleteServicio] = useDeleteServicioMutation();
  const columnaServicio = [
    { key: "nombreCompletoEmpleado", label: "Colaborador" },
    { key: "nombreCompletoCliente", label: "Cliente" },
    { key: "nombreTipoDePago", label: "Tipo de pago" },
    { key: "nombreServicio", label: "Servicio" },
    { key: "valorServicio", label: "Precio" },
    { key: "fechaServicioFormateada", label: "Fecha" },
  ];

  useEffect(() => {
    const fechaActual = moment().format("YYYY-MM-DD");
    setFecha(fechaActual);
  }, []);
  const handleBuscarPorFecha = (e) => {
    e.preventDefault();
    const fecha = moment(fechaSeleccionada).format("YYYY-MM-DD");
    console.log(fecha);
    setFecha(fecha);
  };

  const handleDateChange = (date) => {
    setFechaSeleccionada(date);
  };

  useEffect(() => {
    // Obtiene la fecha actual y la formatea
    const fechaActualFormateada = moment().format("DD MMMM, YYYY");
    setFechaActual(fechaActualFormateada);
  }, []);

  servicioByDate;

  let datosMostrar = servicios;

  if (fecha && servicioByDate && servicioByDate.length > 0) {
    datosMostrar = servicioByDate;
  }

  if (isLoading) {
    return <p>Cargando...</p>;
  }
  return (
    <Container>
      <div>
        <div className="row">
          <div className="col-md-12">
            <div className="boton_servicios">
              <h1 className="text-center"></h1>
              <TitulosPages
                titulo="Servicios realizados"
                regresar={`/registros/`}
              />
              <div>
                <DropdownButton id="dropdown-basic-button" title="Complementos">
                  <Dropdown.Item as={Link} to="/registros/colaboradores">
                    Colaboradores
                  </Dropdown.Item>
                  <Dropdown.Item as={Link} to="/registros/clientes">
                    Clientes
                  </Dropdown.Item>
                  <Dropdown.Item
                    as={Link}
                    to="/registros/servicios/tiposDeServicios"
                  >
                    Tipos de servicios
                  </Dropdown.Item>
                  <Dropdown.Item as={Link} to="/registros/tiposDePago">
                    Tipos de pago
                  </Dropdown.Item>
                  <Dropdown.Item
                    as={Link}
                    to="/registros/servicios/historial-clientes"
                  >
                    Historial Clientes
                  </Dropdown.Item>
                </DropdownButton>
              </div>
            </div>

            <hr />

            <Row>
              <Col sm={6} className="my-2">
                <BotonesPrincipales
                  agregar={`/registros/crear-servicio/`}
                  tituloBoton={"Agregar nueva venta"}
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
                    className="custom-datepicker mt-3" // Agrega una clase personalizada
                  />
                  <Button
                    className="mt-3 boton_buscar"
                    onClick={(e) => handleBuscarPorFecha(e)}
                  >
                    <FcSearch />
                    Buscar fecha
                  </Button>
                </div>
              </Col>
            </Row>

            <div>
              <h4 className="text-center my-4">Fecha actual: {fechaActual}</h4>
              {/* Aquí puedes renderizar tu DataTable con la fecha actual */}
              <div className="table-responsive">
                <DataTable
                  columnaServicio={columnaServicio}
                  data={datosMostrar}
                  deleteData={deleteServicio}
                  paginaSiguiente={"paginaSiguiente"}
                  paginaAnterior={"paginaAnterior"}
                  editUrl="/registros/editar-servicio"
                  randomId="servicioId"
                  refetchData={refetch}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Servicios;
