import { Link } from "react-router-dom";

//Importacion de iconos
import { AiOutlineRollback } from "react-icons/ai";

import { FcSearch } from "react-icons/fc";

import useProductoLogic from "../../Hooks/useProductoLogic";
import "../../style/Productos.css";

import DataTable from "../components/DataTable";
import { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import Select from "react-select";
import BotonesPrincipalesAgregar from "../components/BotonesPrincipalesAgregar";
import TitulosPages from "../components/TitulosPages";
import {
  useGetProductosByNameQuery,
  useGetProductosQuery,
  useGetProductosPaginacionQuery,
  useDeleteProductoMutation,
} from "../../api/productosApi";

const Productos = () => {
  const [paginaActual, setPaginaActual] = useState(1);
  const [tamanoPagina, setTamanoPagina] = useState(5);

  const [deleteProducto] = useDeleteProductoMutation();

  const {
    data: productos,
    isError,
    error,
    isLoading,
    refetch,
  } = useGetProductosQuery();

  const [productoState, setProductoState] = useState({
    nombreProducto: "",
    nombre: "", // Estado para almacenar la categoría seleccionada en el select
  });
  const { data: productosByName } = useGetProductosByNameQuery(
    productoState.nombre
  );

  const columnaServicio = [
    { key: "codigoProducto", label: "Codigo Producto" },
    { key: "nombreProducto", label: "Nombre Producto" },
    { key: "descripcionProducto", label: "Descripcion Producto" },
    { key: "precioProducto", label: "Precio Producto" },
    { key: "stock", label: "Stock Producto" },
  ];

  const SelectProductos = productos
    ? productos.map((tipoDeServicio) => ({
        value: tipoDeServicio.productoId,
        label: tipoDeServicio.nombreProducto,
      }))
    : [];

  const handleChange = (selectOption, name) => {
    setProductoState((prevServicio) => ({
      ...prevServicio,
      [name]: selectOption,
    }));
  };

  const paginaSiguiente = () => {
    setPaginaActual(paginaActual + 1);
  };

  const handleFiltraProductos = () => {
    if (productoState.nombreProducto && productoState.nombreProducto.label) {
      const nombre = productoState.nombreProducto.label;
      setProductoState({
        nombre,
        nombreProducto: "",
      });
    } else {
      console.log(
        `${productoState.nombreProducto} no está definido o no tiene la propiedad label`
      );
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  } else if (isError) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      <Container>
        <div>
          <TitulosPages
            titulo="Inventario de Productos"
            regresar="/registros/"
          />
          <hr />

          <Row>
            <Col sm={6}>
              <div className="my-5">
                <Container>
                  <h3 className="text-center">
                    Buscar por nombre del producto
                  </h3>
                  <Select
                    options={SelectProductos}
                    menuPlacement="bottom"
                    onChange={(selectOption) =>
                      handleChange(selectOption, "nombreProducto")
                    }
                    value={productoState.nombreProducto}
                    defaultValue={"hola"}
                  />
                  <div className="boton_buscar_contenedor">
                    <button
                      className="boton_buscar"
                      onClick={(e) => handleFiltraProductos(e)}
                    >
                      <FcSearch /> Buscar
                    </button>
                  </div>
                </Container>
              </div>
            </Col>
            <Col sm={6}>
              <BotonesPrincipalesAgregar
                agregar={`/registros/crear-producto/`}
                tituloBoton={"Agregar nuevo producto"}
              />
            </Col>
          </Row>

          <div className="table-responsive">
            <DataTable
              columnaServicio={columnaServicio}
              data={productosByName !== undefined ? productosByName : productos}
              deleteData={deleteProducto}
              paginaSiguiente={paginaSiguiente}
              paginaAnterior={"hola"}
              editUrl="/registros/editar-producto"
              randomId="productoId"
              refetchData={refetch}
            />
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Productos;
