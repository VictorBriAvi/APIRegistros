import { AiFillFileAdd } from "react-icons/ai";
import { Link } from "react-router-dom";

import { AiOutlineRollback } from "react-icons/ai";
import useTiposDePagoLogic from "../../Hooks/useTiposDePago";

import DataTable from "../components/dataTable";
import { Col, Container, Row } from "react-bootstrap";
import BotonesPrincipalesAgregar from "../components/BotonesPrincipalesAgregar";
import TitulosPages from "../components/TitulosPages";
import {
  useDeleteTipoDePagoMutation,
  useGetTipoDePagoQuery,
} from "../../api/tipoDePagoApi";

const TiposDePago = () => {
  const { data: tipoDePago, isLoading, refetch } = useGetTipoDePagoQuery();
  const [deleteTipoDePago] = useDeleteTipoDePagoMutation();

  const columnaServicio = [{ key: "nombreTipoDePago", label: "Tipo De Pago" }];

  if (isLoading) {
    return <p>Cargando...</p>;
  }
  return (
    <Container>
      <div>
        <div>
          <div>
            <TitulosPages
              titulo="Tipos de pago"
              regresar={`/registros/servicios`}
            />
            <hr />
            <Container className="mb-3">
              <Row>
                <Col sm={12} className="my-2">
                  <BotonesPrincipalesAgregar
                    agregar={`/registros/crear-tipoDePago/`}
                    tituloBoton={"Agregar nuevo tipo de pago"}
                  />
                </Col>
              </Row>
            </Container>
            <DataTable
              columnaServicio={columnaServicio}
              data={tipoDePago}
              deleteData={deleteTipoDePago}
              paginaSiguiente={"paginaSiguiente"}
              paginaAnterior={"paginaAnterior"}
              editUrl="/registros/editar-tipoDePago"
              randomId="tipoDePagoId"
              refetchData={refetch}
            />
          </div>
        </div>
      </div>
    </Container>
  );
};

export default TiposDePago;
