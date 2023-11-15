import { Button, Col, Container, Row } from "react-bootstrap";
import useGastosLogic from "../../Hooks/useGastosLogic";
import useServicioLogic from "../../Hooks/useServiciosLogic";
import { VictoryPie } from "victory";
import DatePicker from "react-datepicker";
import { useState } from "react";
import moment from "moment";
import Select from "react-select";
import useColaboradoresLogic from "../../Hooks/useColaboradoresLogic";
import TitulosPages from "../components/TitulosPages";
import "../../style/ArqueoDeCaja.css";
import Cierres from "../gastos/Gastos";
import { useNavigate } from "react-router";
import AgregarGasto from "../gastos/AgregarGasto";
import { Link } from "react-router-dom";

const ArqueoDeCaja = () => {
  const navigate = useNavigate();
  const [fechaInicio, setFechaInicio] = useState(null);
  const [fechaFin, setFechaFin] = useState(null);
  const { serviciosRangoFecha, isLoading, getServiciosPorRangoDeFecha } =
    useServicioLogic();
  const {
    gastosRangoFecha,
    isLoadingGasto,
    getGastosPorRangoDeFecha,
    addGasto,
  } = useGastosLogic();
  const { colaboradores } = useColaboradoresLogic();

  const [totalRealizado, setTotalRealizado] = useState(0);
  const [totalPorcentaje, setTotalPorcentaje] = useState(0);
  const [nombreEmpleado, setNombreEmpleado] = useState("");

  const [empleado, setEmpleado] = useState({
    nombreCompletoEmpleado: "", // Estado para almacenar la categoría seleccionada
  });

  let totalIngresos = 0;
  let totalGastos = 0;
  const sumasPorTiposDeGastos = {};
  const arregloDatos = [];

  const SelectColaborador = colaboradores
    ? colaboradores.map((colaborador) => ({
        value: colaborador.id,
        label: colaborador.nombreCompletoEmpleado,
      }))
    : [];

  // Suma de precios de productos
  serviciosRangoFecha.forEach((servicio) => {
    totalIngresos += parseFloat(servicio.precioProducto);
  });

  gastosRangoFecha.forEach((gasto) => {
    totalGastos += parseFloat(gasto.precioGasto);
    const nombreTipoDeGasto = gasto.nombreTipoDeGasto;
    const precioGasto = parseFloat(gasto.precioGasto);

    if (!sumasPorTiposDeGastos[nombreTipoDeGasto]) {
      sumasPorTiposDeGastos[nombreTipoDeGasto] = precioGasto;
      arregloDatos.push({
        nombreTipoDeGasto: nombreTipoDeGasto,
        precioGasto: precioGasto,
      });
    } else {
      sumasPorTiposDeGastos[nombreTipoDeGasto] += precioGasto;
      arregloDatos.forEach((dato) => {
        if (dato.nombreTipoDeGasto === nombreTipoDeGasto) {
          dato.precioGasto = sumasPorTiposDeGastos[nombreTipoDeGasto];
        }
      });
    }
  });

  const gananciaPerdida = totalIngresos - totalGastos;
  const total = totalIngresos + totalGastos;

  const porcentajeIngresos = Math.round((totalIngresos / total) * 100);
  const porcentajeGastos = Math.round((totalGastos / total) * 100);

  const gastosConPorcentaje = arregloDatos.map((gasto) => {
    const porcentajeDeGasto =
      (gasto.precioGasto / totalGastos) * porcentajeGastos;
    return {
      nombreTipoDeGasto: gasto.nombreTipoDeGasto,
      porcentajeDeGasto: Math.round(porcentajeDeGasto),
    };
  });
  const data = [
    { x: "Ingresos", y: porcentajeIngresos },
    ...gastosConPorcentaje.map((gasto) => ({
      x: `${gasto.nombreTipoDeGasto}`,
      y: gasto.porcentajeDeGasto,
    })),
  ];

  const handleDateChangeInicio = (date) => {
    setFechaInicio(date);
  };

  const handleDateChangeFin = (date) => {
    setFechaFin(date);
  };
  const handleSelectChange = (selectOption, name) => {
    setEmpleado((prevServicio) => ({
      ...prevServicio,
      [name]: selectOption,
    }));
  };
  const handleEmpeladoCobro = (e) => {
    e.preventDefault();

    const empleadoSeleccionado = empleado.nombreCompletoEmpleado.label;

    // Filtra los servicios que coincidan con el nombre seleccionado
    const serviciosDelEmpleado = serviciosRangoFecha.filter(
      (servicio) => servicio.nombreCompletoEmpleado === empleadoSeleccionado
    );
    // Suma los valores de los servicios filtrados
    let totalCobro = 0;
    serviciosDelEmpleado.forEach((servicio) => {
      totalCobro += parseFloat(servicio.precioProducto);
    });
    const porcentaje35 = totalCobro * 0.35;
    const porcentaje35Entero = Math.round(porcentaje35);

    setTotalRealizado(totalCobro);
    setTotalPorcentaje(porcentaje35Entero);
    setNombreEmpleado(empleadoSeleccionado);
  };

  const handleBuscarPorRangoFecha = (e) => {
    e.preventDefault();

    const fechaSeleccionadaInicial = moment(fechaInicio).format("YYYY-MM-DD");
    const fechaSeleccionadaFinal = moment(fechaFin).format("YYYY-MM-DD");

    getServiciosPorRangoDeFecha(
      fechaSeleccionadaInicial,
      fechaSeleccionadaFinal
    );
    getGastosPorRangoDeFecha(fechaSeleccionadaInicial, fechaSeleccionadaFinal);
  };

  const validacionArreglo = data.map((item) => ({
    x: item.x || "Sin Datos",
    y: !isNaN(item.y) ? item.y : 100,
  }));

  //const chartData = data[0].y > 0 ? defaultData : data;

  if (isLoading && isLoadingGasto) {
    return <p>Cargando...</p>;
  }

  return (
    <Container>
      {/* Sección de filtros */}
      <TitulosPages regresar={"/registros/"} titulo={"Arqueo de caja"} />
      <hr />
      <Container className=" my-4 ">
        <div className="d-flex flex-column align-items-center ">
          <h5 className="h1 ">Ingresa el rango de fechas a buscar: </h5>
          <div className="my-5 ">
            <Row>
              <Col xs={12} md={4}>
                <span className="h6">Desde :</span>
                <DatePicker
                  selected={fechaInicio}
                  onChange={handleDateChangeInicio}
                  placeholderText="¿Qué fecha buscamos?"
                  dateFormat="dd/MM/yyyy"
                  className="custom-datepicker mx-5"
                />
              </Col>

              <Col xs={12} md={4}>
                <span className="h6">Hasta :</span>
                <DatePicker
                  selected={fechaFin}
                  onChange={handleDateChangeFin}
                  placeholderText="¿Qué fecha buscamos?"
                  dateFormat="dd/MM/yyyy"
                  className="custom-datepicker mx-5"
                />
              </Col>
              <Col xs={12} md={4}>
                <Button
                  variant="outline-primary h-100 w-100"
                  onClick={(e) => handleBuscarPorRangoFecha(e)}
                >
                  Buscar fecha
                </Button>
              </Col>
            </Row>
          </div>
        </div>

        <Row className="mt-5">
          <Col xs={12} md={4} className=" text-center">
            <p className="display-6 ">
              Total ingreso = {`${totalIngresos.toLocaleString()}`}
            </p>
          </Col>
          <Col xs={12} md={4} className=" text-center">
            <p className="display-6 ">
              Total gastos = {`${totalGastos.toLocaleString()}`}
            </p>
          </Col>
          <Col xs={12} md={4} className="text-center">
            <p className="display-6 ">
              {gananciaPerdida >= 0
                ? `Ganancia con ${gananciaPerdida.toLocaleString()}`
                : `Pérdida con ${gananciaPerdida.toLocaleString()}`}
            </p>
          </Col>
        </Row>
      </Container>

      {/* Sección de empleado y grafica */}
      <Container>
        <hr />
        <Row>
          <Col xs={12} md={6} className="p-3">
            <Row>
              <Col xs={12} md={12}>
                <h1 className="h1 mb-4">Total realizado colaborador :</h1>
                <Select
                  options={SelectColaborador}
                  menuPlacement="bottom"
                  onChange={(selectOption) =>
                    handleSelectChange(selectOption, "nombreCompletoEmpleado")
                  }
                  value={empleado.nombreCompletoEmpleado}
                />
              </Col>

              <Col xs={12} md={12} className="text-center my-5">
                <Button
                  variant="outline-primary"
                  onClick={(e) => handleEmpeladoCobro(e)}
                >
                  Buscar colaborador
                </Button>
              </Col>
              <Col xs={12} md={12} className="text-center">
                <h3 className="h4 mb-4">Datos colaborador</h3>
                <p className="display-6">
                  Nombre del colaborador :{" "}
                  <span>{nombreEmpleado.toLocaleString()} </span>
                </p>
                <p className="display-6">
                  Total realizado :{" "}
                  <span>${totalRealizado.toLocaleString()}</span>
                </p>
                <p className="display-6">
                  Total realizado porcentaje :
                  <span>${totalPorcentaje.toLocaleString()}</span>
                </p>

                <Link to={`/registros/crear-tipoDeGasto/${totalPorcentaje}`}>
                  <Button>Agregar gasto del porcentaje del empleado</Button>
                </Link>
              </Col>
            </Row>
          </Col>

          {/* Gráfico de VictoryPie */}
          <Col xs={12} md={6}>
            <div>
              <VictoryPie
                data={validacionArreglo}
                colorScale={[
                  "#66BB6A",
                  "#EF5350",
                  "#22223B",
                  "#ACFCD9",
                  "#FF715B",
                  "#E6AF2E",
                  "#5C6F68",
                  "#654C4F",
                  "#F42C04",
                  "#582707",
                ]}
                animate={{ duration: 2000 }}
                responsive={true}
                width={250}
                height={250}
                padAngle={({ datum }) => datum.y}
                style={{
                  data: {
                    stroke: "#000",
                    strokeWidth: 0.5,
                  },
                  labels: {
                    fontSize: 5,
                    fill: "#c43a31",
                  },
                }}
              />
            </div>
          </Col>
        </Row>
      </Container>
    </Container>
  );
};

export default ArqueoDeCaja;
