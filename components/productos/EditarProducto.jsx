import { useState } from "react";

import { AiOutlineSave, AiOutlineRollback } from "react-icons/ai";
import { Link, useNavigate, useParams } from "react-router-dom";

import Swal from "sweetalert2";
import { Toast } from "../../Alert/Aler";

import {
  useGetProductoByIdQuery,
  useUpdateProductoMutation,
  useGetProductosQuery,
} from "../../api/productosApi";

const EditarProducto = () => {
  const params = useParams();
  const navigate = useNavigate();
  const { data: productos } = useGetProductosQuery();
  const [updateProducto] = useUpdateProductoMutation();
  const {
    data: producto,
    isError,
    error,
    isLoading,
  } = useGetProductoByIdQuery(params.id);

  const [productoEdit, setProductoEdit] = useState({
    codigoProducto: "",
    nombreProducto: "",
    descripcionProducto: "",
    precioProducto: 0,
    stock: 0,
  });

  const handleChange = (e) => {
    setProductoEdit({
      ...productoEdit,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const productoActualizado = {};

    if (
      productoEdit.codigoProducto.trim() === "" &&
      productoEdit.descripcionProducto.trim() === "" &&
      productoEdit.nombreProducto.trim() === "" &&
      productoEdit.precioProducto === 0 &&
      productoEdit.stock === 0
    ) {
      Swal.fire(
        "No has modificado",
        "En caso de no querer modificar dar click en el boton regresar",
        "warning"
      );
      return;
    }
    if (productoEdit.codigoProducto.trim() !== "") {
      productoActualizado.codigoProducto = productoEdit.codigoProducto.trim();
    }
    if (productoEdit.nombreProducto.trim() !== "") {
      productoActualizado.nombreProducto = productoEdit.nombreProducto.trim();
    }
    if (productoEdit.descripcionProducto.trim() !== "") {
      productoActualizado.descripcionProducto =
        productoEdit.descripcionProducto.trim();
    }
    if (productoEdit.precioProducto !== 0) {
      productoActualizado.precioProducto = productoEdit.precioProducto;
    }
    if (productoEdit.stock !== 0) {
      productoActualizado.precioProducto = productoEdit.precioProducto;
    }
    if (productoEdit.stock !== 0) {
      productoActualizado.stock = productoEdit.stock;
    }

    const codigoProductoExistente = productos.find(
      (p) => p.codigoProducto === productoEdit.codigoProducto
    );

    const nombreProductoExistente = productos.find(
      (p) => p.nombreProducto === productoEdit.nombreProducto
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

    console.log(productoActualizado);
    // updateProducto(productoById.id, productoActualizado);
    updateProducto({ id: producto.productoId, ...productoEdit });
    Swal.fire("Buen Trabajo!", "has modificado el producto!", "success");
    navigate("/registros/productos");
  };

  if (isLoading) {
    return <p>Cargando producto...</p>;
  }

  return (
    <div>
      <div className="container  ">
        <div className="row ">
          <div className="col-lg-6  text-center contenedor-info  ">
            <h1>Informacion del producto</h1>
            <div className="">
              <ul className="list-group ">
                <li className="list-group-item d-flex justify-content-between align-items-start">
                  <div className="ms-2 me-auto">
                    <div className=" fw-bold">Codigo del Producto</div>
                    <div className="text-center">{producto.codigoProducto}</div>
                  </div>
                </li>
                <li className="list-group-item d-flex justify-content-between align-items-start">
                  <div className="ms-2 me-auto">
                    <div className="fw-bold">Nombre del Producto</div>
                    <div className="text-center">{producto.nombreProducto}</div>
                  </div>
                </li>
                <li className="list-group-item d-flex justify-content-between align-items-start">
                  <div className="ms-2 me-auto">
                    <div className="fw-bold">Descripcion del Producto</div>
                    <div className="text-center">
                      {producto.descripcionProducto}
                    </div>
                  </div>
                </li>
                <li className="list-group-item d-flex justify-content-between align-items-start">
                  <div className="ms-2 me-auto">
                    <div className="fw-bold">Precio del producto</div>
                    <div className="text-center">{producto.precioProducto}</div>
                  </div>
                </li>
                <li className="list-group-item d-flex justify-content-between align-items-start">
                  <div className="ms-2 me-auto">
                    <div className="fw-bold">Cantida producto</div>
                    <div className="text-center">{producto.stock}</div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
          <div className="col-lg-6">
            <div>
              <form onSubmit={handleSubmit}>
                <div>
                  <div className="my-2">
                    <label htmlFor="1">Ingrese el codigo del producto</label>
                  </div>

                  <div className="form-floating mb-3">
                    <input
                      type="text"
                      className="form-control"
                      id="1"
                      placeholder="name@example.com"
                      name="codigoProducto"
                      value={productoEdit.codigoProducto}
                      onChange={handleChange}
                    />
                    <label htmlFor="1">Codigo Producto</label>
                  </div>
                </div>

                <div>
                  <div className="my-2">
                    <label htmlFor="2">Ingresa el nombre del producto</label>
                  </div>

                  <div className="form-floating mb-3">
                    <input
                      type="text"
                      className="form-control"
                      id="2"
                      name="nombreProducto"
                      placeholder="name@example.com"
                      value={productoEdit.nombreProducto}
                      onChange={handleChange}
                      pattern="[A-Za-z\s]*"
                    />
                    <label htmlFor="2">Nombre Producto</label>
                  </div>
                </div>
                <div>
                  <div className="my-2">
                    <label htmlFor="3">
                      Ingresa la descripcion del producto
                    </label>
                  </div>

                  <div className="form-floating mb-3">
                    <input
                      type="text"
                      className="form-control"
                      id="3"
                      name="descripcionProducto"
                      placeholder="name@example.com"
                      value={productoEdit.descripcionProducto}
                      onChange={handleChange}
                      pattern="[A-Za-z\s]*"
                    />
                    <label htmlFor="3">Descripcion Producto</label>
                  </div>
                </div>
                <div>
                  <div className="my-2">
                    <label htmlFor="4">Ingresa el valor del producto</label>
                  </div>

                  <div className="form-floating mb-3">
                    <input
                      type="number"
                      className="form-control"
                      id="4"
                      placeholder="name@example.com"
                      name="precioProducto"
                      value={productoEdit.precioProducto}
                      onChange={handleChange}
                      pattern="[0-9]+"
                    />
                    <label htmlFor="4">Precio Producto</label>
                  </div>
                </div>

                <div>
                  <div className="my-2">
                    <label htmlFor="5">Ingresa el stock del producto</label>
                  </div>

                  <div className="form-floating mb-3">
                    <input
                      type="number"
                      className="form-control"
                      id="5"
                      placeholder="name@example.com"
                      name="stock"
                      value={productoEdit.stock}
                      onChange={handleChange}
                      pattern="[0-9]+"
                    />
                    <label htmlFor="5">Stock Producto</label>
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
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditarProducto;
