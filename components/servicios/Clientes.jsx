import { AiFillFileAdd, AiOutlineRollback } from "react-icons/ai";
import { Link } from "react-router-dom";

import useClienteLogic from "../../Hooks/useClienteLogic";

import DataTable from "../components/dataTable";
import { Col, Container, Row } from "react-bootstrap";
import BotonesPrincipalesAgregar from "../components/BotonesPrincipalesAgregar";
import TitulosPages from "../components/TitulosPages";
import {
  useDeleteClienteMutation,
  useGetClientesQuery,
} from "../../api/clientesApi";

const Clientes = () => {
  const { data: clientes, isLoading, refetch } = useGetClientesQuery();

  const [deleteCliente] = useDeleteClienteMutation();
  const columnaServicio = [
    { key: "nombreCompletoCliente", label: "Cliente" },
    { key: "fechaClienteFormateada", label: "Fecha Nacimiento" },
  ];

  if (isLoading) {
    return <p>Cargando...</p>;
  }
  return (
    <Container>
      <div>
        <div>
          <div>
            <TitulosPages titulo="Clientes" regresar={`/registros/servicios`} />
            <hr />

            <Container className="mb-3">
              <Row>
                <Col sm={12} className="my-2">
                  <BotonesPrincipalesAgregar
                    agregar={`/registros/crear-cliente/`}
                    tituloBoton={"Agregar nuevo cliente"}
                  />
                </Col>
              </Row>
            </Container>

            <div className="table-responsive">
              <DataTable
                columnaServicio={columnaServicio}
                data={clientes}
                deleteData={deleteCliente}
                paginaSiguiente={"paginaSiguiente"}
                paginaAnterior={"paginaAnterior"}
                editUrl="/registros/editar-cliente"
                randomId="clienteId"
                refetchData={refetch}
              />
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Clientes;
