import { AiOutlineSave, AiOutlineRollback } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Toast } from "../../Alert/Aler";

import { Container } from "react-bootstrap";

import {
  useCreateProductosMutation,
  useGetProductosQuery,
} from "../../api/productosApi";
import Swal from "sweetalert2";

const AgregarProducto = () => {
  const navigate = useNavigate();
  const [createProductos] = useCreateProductosMutation();
  const { data: productos } = useGetProductosQuery();
  const [producto, setProducto] = useState({
    codigoProducto: "",
    nombreProducto: "",
    descripcionProducto: "",
    precioProducto: "",
    stock: "",
  });

  const handleChange = (e) => {
    setProducto({
      ...producto,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (producto.codigoProducto.trim() === "") {
      Toast.fire({
        icon: "error",
        title: "No estas agregando el codigo del producto",
      });
      return;
    }
    if (producto.nombreProducto.trim() === "") {
      Toast.fire({
        icon: "error",
        title: "No estas agregando el nombre del producto",
      });
      return;
    }
    if (producto.precioProducto <= 500) {
      Toast.fire({
        icon: "error",
        title:
          "No estas agregando el precio del producto, recuerda que debe ser mayor de 500",
      });
      return;
    }
    const codigoProductoExistente = productos.find(
      (p) => p.codigoProducto === producto.codigoProducto
    );
    const nombreProductoExistente = productos.find(
      (p) => p.nombreProducto === producto.nombreProducto
    );

    if (codigoProductoExistente) {
      Toast.fire({
        icon: "error",
        title: "El codigo del producto ya esta existente",
      });
      return;
    }

    if (nombreProductoExistente) {
      Toast.fire({
        icon: "error",
        title: "El nombre del producto ya esta existente",
      });
      return;
    }

    try {
      console.log(producto);
      const respuesta = await createProductos(producto);
      Swal.fire("Buen Trabajo!", "has agregado un nuevo producto!", "success");
      console.log(respuesta);
      navigate("/registros/productos");
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <Container>
      <div className="container">
        <div className="text-center">
          <h1>Agregar nuevo producto</h1>
          <h6>Aca puedes agregar los productos nuevos</h6>
          <hr />
        </div>
        <div className="row">
          <div className="col-sm-12">
            <form onSubmit={handleSubmit}>
              <div>
                <div className="my-2">
                  <label htmlFor="1">
                    Ingrese el codigo del producto{" "}
                    <span className="text-danger  fw-bold">*</span>
                  </label>
                </div>

                <div className="form-floating  letras">
                  <input
                    type="text"
                    className="form-control"
                    id="1"
                    placeholder="codigo producto"
                    name="codigoProducto"
                    value={producto.codigoProducto}
                    onChange={handleChange}
                  />
                  <label htmlFor="1">Codigo Producto </label>
                </div>
              </div>

              <div>
                <div className="my-2">
                  <label htmlFor="2">
                    Ingresa el nombre del producto
                    <span className="text-danger  fw-bold">*</span>
                  </label>
                </div>

                <div className="form-floating mb-3 letras">
                  <input
                    type="text"
                    className="form-control"
                    id="2"
                    name="nombreProducto"
                    placeholder="nombre del producto"
                    pattern="[A-Za-z\s]*"
                    value={producto.nombreProducto}
                    onChange={handleChange}
                  />
                  <label htmlFor="2">Nombre Producto</label>
                </div>
              </div>
              <div>
                <div className="my-2">
                  <label htmlFor="3">
                    Ingresa la descripcion del producto{" "}
                  </label>
                </div>

                <div className="form-floating mb-3 letras">
                  <input
                    type="text"
                    className="form-control"
                    id="3"
                    name="descripcionProducto"
                    placeholder="descripcion del producto"
                    pattern="[A-Za-z\s]*"
                    onInput={handleChange}
                    value={producto.descripcionProducto}
                  />
                  <label htmlFor="3">Descripcion Producto</label>
                </div>
              </div>
              <div>
                <div>
                  <div className="my-2">
                    <label htmlFor="4">
                      Ingresa el valor del producto
                      <span className="text-danger  fw-bold">*</span>
                    </label>
                  </div>
                  <div className="form-floating mb-3 letras">
                    <input
                      type="number"
                      className="form-control"
                      id="4"
                      placeholder="precio producto"
                      name="precioProducto"
                      pattern="[0-9]+"
                      value={producto.precioProducto}
                      onInput={handleChange}
                    />
                    <label htmlFor="4">Precio Producto</label>
                  </div>
                </div>

                <div>
                  <div className="my-2">
                    <label htmlFor="4">
                      Ingresa la cantida existente
                      <span className="text-danger  fw-bold">*</span>
                    </label>
                  </div>
                  <div className="form-floating mb-3 letras">
                    <input
                      type="number"
                      className="form-control"
                      id="4"
                      placeholder="stock producto"
                      name="stock"
                      pattern="[0-9]+"
                      value={producto.stock}
                      onInput={handleChange}
                    />
                    <label htmlFor="4">Stock Producto</label>
                  </div>
                </div>

                <div className="boton">
                  <button className="btn btn-primary font-weight-normal me-4">
                    {<AiOutlineSave />} Agregar
                  </button>
                  <Link to={"/registros/productos"}>
                    <button className="btn btn-info font-weight-normal">
                      {<AiOutlineRollback />} Regresar
                    </button>
                  </Link>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default AgregarProducto;
