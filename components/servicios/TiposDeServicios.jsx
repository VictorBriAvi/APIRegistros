import { AiFillDelete, AiFillEdit, AiFillFileAdd } from "react-icons/ai";
import { Link } from "react-router-dom";

import { AiOutlineRollback } from "react-icons/ai";
import useTiposDeServiciosLogic from "../../Hooks/useTiposDeServiciosLogic";

import { useState } from "react";

import DataTable from "../components/dataTable";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import BotonesPrincipalesAgregar from "../components/BotonesPrincipalesAgregar";
import { FcSearch } from "react-icons/fc";
import TitulosPages from "../components/TitulosPages";
import {
  useDeleteTipoDeServicioMutation,
  useGetTiposDeServiciosQuery,
} from "../../api/tiposDeServiciosApi";
import { useGetCategoriaServiciosQuery } from "../../api/categoriaServicioApi";

const TiposDeServicios = () => {
  const {
    data: tipoDeServicios,
    isLoading,
    refetch,
  } = useGetTiposDeServiciosQuery();

  const { data: categoriaServicio } = useGetCategoriaServiciosQuery();

  const [deleteTipoDeServicio] = useDeleteTipoDeServicioMutation();

  const [servicio, setServicio] = useState({
    tipoDeTrabajo: "", // Estado para almacenar la categoría seleccionada
  });

  const SelectCategoriaServicio = categoriaServicio
    ? categoriaServicio.map((tipoDeServicio) => ({
        value: tipoDeServicio.categoriasServiciosId,
        label: tipoDeServicio.nombreCategoriaServicio,
      }))
    : [];

  const columnaServicio = [
    { key: "nombreServicio", label: "Tipo de servicio" },

    { key: "precioServicio", label: "Precio efectivo o transferencia" },
    { key: "precioServicioAumento", label: "Precio efectivo o transferencia" },
    { key: "nombreCategoriaServicio", label: "Categoria servicio" },
  ];

  const handleFiltraCategoria = (e) => {
    e.preventDefault();
    console.log(servicio);
    if (servicio.tipoDeTrabajo.trim() === "") {
      getTiposDeServicios();
    } else {
      buscarCategoria(servicio);
    }
  };

  const handleSelectChange = (e) => {
    setServicio({
      ...servicio,
      tipoDeTrabajo: e.target.value, // Almacena la categoría seleccionada
    });
  };

  if (isLoading) {
    return <p>Cargando...</p>;
  }

  return (
    <Container>
      <div>
        <div>
          <div>
            <div>
              <TitulosPages
                titulo="Tipos de servicios"
                regresar={`/registros/servicios`}
              />
              <Link to={"/registros/servicios/tiposDeServicios/porcentaje"}>
                <button className="btn btn-warning font-weight-normal text-white  mb-3  ">
                  Sumar precios segun el Porcentaje
                </button>
              </Link>
            </div>
            <Link
              to={`/registros/servicios/tiposDeServicios/categoriaServicio`}
            >
              <button>Categoria servicio</button>
            </Link>
            <hr />
            <Container className="mb-3">
              <Row>
                <Col sm={6} className="my-2">
                  <BotonesPrincipalesAgregar
                    agregar={`/registros/servicios/tiposDeServicios/crear-tipoDeServicio`}
                    tituloBoton={"Agregar nuevo tipo de servicio"}
                  />
                </Col>

                <Col sm={6}>
                  <div>
                    <div className="container my-2">
                      <fieldset>
                        <label className="mb-2" htmlFor="2">
                          Buscar por la categoria del servicio
                        </label>
                        <div className="form-floating mb-3">
                          <div className="row ">
                            <div className="col-md-6">
                              {/* Establecer el ancho del select */}
                              <Form.Select
                                aria-label="Default select example"
                                id="2"
                                name="tipoDeTrabajo"
                                value={servicio.tipoDeTrabajo}
                                onChange={handleSelectChange}
                                className="h-100"
                              >
                                <option value="">Todas</option>
                                {SelectCategoriaServicio.map(
                                  (opcion, index) => (
                                    <option key={index} value={opcion.value}>
                                      {opcion.label}
                                    </option>
                                  )
                                )}
                              </Form.Select>
                            </div>
                            <div className="col-md-6">
                              {/* Establecer el ancho del botón */}
                              <Button
                                className="boton_buscar"
                                onClick={(e) => handleFiltraCategoria(e)}
                              >
                                <FcSearch /> Buscar
                              </Button>
                            </div>
                          </div>
                        </div>
                      </fieldset>
                    </div>
                  </div>
                </Col>
              </Row>
            </Container>
            <Container
              fluid
              className=" justify-content-center align-items-center "
            ></Container>
            {/** COMPONENTE DATATABLE : Esto carga los datos en una tabla para mostrarlos */}
            <DataTable
              columnaServicio={columnaServicio}
              data={tipoDeServicios}
              deleteData={deleteTipoDeServicio}
              paginaSiguiente={"paginaSiguiente"}
              paginaAnterior={"paginaAnterior"}
              editUrl="/registros/servicios/tiposDeServicios/editar-tipoDeServicio"
              randomId={"tipoDeServicioId"}
              refetchData={refetch}
            />
          </div>
        </div>
      </div>

      {/* Paso 4: Botón de "Siguiente" */}
    </Container>
  );
};

export default TiposDeServicios;
