import DataTable from "../components/dataTable";
import { Col, Container, Row } from "react-bootstrap";
import BotonesPrincipalesAgregar from "../components/BotonesPrincipalesAgregar";
import TitulosPages from "../components/TitulosPages";
import {
  useDeleteTipoDeGastoMutation,
  useGetTipoDeGastosQuery,
} from "../../api/tipoDeGastosApi";
const TiposDeGastos = () => {
  const columnaServicio = [
    { key: "nombreTipoDeGastos", label: "Nombre del tipo de gasto" },
  ];

  const { data: tipoDeGastos, isLoading, refetch } = useGetTipoDeGastosQuery();
  const [deleteTipoDeGasto] = useDeleteTipoDeGastoMutation();

  if (isLoading) {
    return <p>Cargando...</p>;
  }
  return (
    <Container>
      <div>
        <TitulosPages titulo="Tipos de gastos" regresar={"/registros/gastos"} />
      </div>

      <hr />
      <Container>
        <Row>
          <Col sm={12} className="mt-3">
            <BotonesPrincipalesAgregar
              agregar={`/registros/gastos/TiposDeGastos/Agregar-TipoDeGasto`}
              tituloBoton={"Agregar nuevo tipo de gasto"}
            />
          </Col>
        </Row>
      </Container>

      <DataTable
        columnaServicio={columnaServicio}
        data={tipoDeGastos}
        deleteData={deleteTipoDeGasto}
        paginaSiguiente={"paginaSiguiente"}
        paginaAnterior={"paginaAnterior"}
        editUrl="/registros/gastos/TiposDeGastos/editar-tipoDeGasto"
        randomId="tipoDeGastosId"
        refetchData={refetch}
      />
    </Container>
  );
};

export default TiposDeGastos;
