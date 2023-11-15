import { Col, Container, Row } from "react-bootstrap";
import BotonesPrincipalesAgregar from "../components/BotonesPrincipalesAgregar";

import DataTable from "../components/DataTable";

import useCategoriasServiciosLogic from "../../Hooks/useCategoriasServiciosLogic";
import TitulosPages from "../components/TitulosPages";
import {
  useDeleteCategoriaServicioMutation,
  useGetCategoriaServicioByIdQuery,
  useGetCategoriaServiciosQuery,
} from "../../api/categoriaServicioApi";

const CategoriaServicios = () => {
  const {
    data: categoriasServicios,
    isLoading,
    refetch,
  } = useGetCategoriaServiciosQuery();

  const [deleteCategoriaServicio] = useDeleteCategoriaServicioMutation();

  console.log(categoriasServicios);
  const columnaCategoriaServicio = [
    { key: "nombreCategoriaServicio", label: "Categoria Servicio" },
  ];

  if (isLoading) {
    return <p>Cargando...</p>;
  }

  return (
    <Container>
      <div>
        <TitulosPages
          titulo="Categorias Servicios"
          regresar={"/registros/servicios/tiposDeServicios"}
        />
        <hr />

        <Row>
          <Col sm={12}>
            <BotonesPrincipalesAgregar
              agregar={`/registros/servicios/tiposDeServicios/categoriaServicio/agregar-categoria-servicio`}
              tituloBoton={"Agregar nueva categoria"}
            />
          </Col>
        </Row>

        <div className="table-responsive">
          <DataTable
            columnaServicio={columnaCategoriaServicio}
            data={categoriasServicios}
            deleteData={deleteCategoriaServicio}
            paginaSiguiente={"paginaSiguiente"}
            paginaAnterior={"paginaAnterior"}
            editUrl="/registros/servicios/tiposDeServicios/categoriaServicio/editar-categoria-servicio"
            randomId="categoriasServiciosId"
            refetchData={refetch}
          />
        </div>
      </div>
    </Container>
  );
};

export default CategoriaServicios;
