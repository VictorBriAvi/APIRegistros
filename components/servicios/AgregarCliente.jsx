import { useState } from "react";
import { AiOutlineSave, AiOutlineRollback } from "react-icons/ai";

import { Link, useNavigate } from "react-router-dom";

import moment from "moment";

import useClienteLogic from "../../Hooks/useClienteLogic";
import { Toast } from "../../Alert/Aler";
import { useAuth } from "../context/authContext";
import {
  useCreateClientesMutation,
  useGetClientesQuery,
} from "../../api/clientesApi";

const AgregarCliente = () => {
  const navigate = useNavigate();

  const { data: clientes, isLoading } = useGetClientesQuery();
  const [createClientes] = useCreateClientesMutation();

  const [cliente, setCliente] = useState({
    nombreCompletoCliente: "",
    numeroDocumento: "",
    fechaNacimiento: "",
  });

  const handleChange = (e) => {
    setCliente({
      ...cliente,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const fechaFormateada = moment(cliente.fechaNacimiento).format(
        "DD/MM/YYYY"
      );

      if (cliente.nombreCompletoCliente.trim() === "") {
        Toast.fire({
          icon: "error",
          title: "No estas agregando el nombre del colaborador",
        });
        return;
      }

      if (fechaFormateada.trim() === "") {
        Toast.fire({
          icon: "error",
          title: "No estas agregando la fecha de nacimiento",
        });
        return;
      }

      const nombreClienteExistente = clientes.find(
        (p) => p.nombreCompletoCliente === cliente.nombreCompletoCliente
      );

      if (nombreClienteExistente) {
        Toast.fire({
          icon: "error",
          title: "El nombre del colaborador ya esta existente",
        });
        return;
      }

      console.log(cliente);

      const response = await createClientes(cliente);
      console.log(response);

      navigate("/registros/clientes");
    } catch (error) {
      console.log(error);
    }
  };

  if (isLoading) {
    return <p>Cargando...</p>;
  }

  return (
    <div>
      <div className="container">
        <div className="text-center">
          <h1>Agregar Cliente</h1>
          <h6>Aca puedes agregar nuevos clientes</h6>
          <hr />
        </div>
        <div className="row">
          <div className="col-sm-12">
            <form onSubmit={handleSubmit}>
              <div>
                <div className="my-2">
                  <label htmlFor="1">
                    Ingrese el nombre del cliente
                    <span className="text-danger  fw-bold">*</span>
                  </label>
                </div>

                <div className="form-floating mb-3">
                  <input
                    type="text"
                    className="form-control"
                    id="1"
                    placeholder="nombre colaborador"
                    name="nombreCompletoCliente"
                    pattern="[A-Za-z\s]*"
                    value={cliente.nombreCompletoCliente}
                    onChange={handleChange}
                  />
                  <label htmlFor="1">Nombre Cliente </label>
                </div>
              </div>

              <div>
                <label className="me-5" htmlFor="fechaNacimiento">
                  Fecha de Nacimiento:
                </label>
                <input
                  type="date"
                  id="fechaNacimiento"
                  name="fechaNacimiento"
                  value={cliente.fechaNacimiento}
                  onChange={handleChange}
                />
              </div>
              <div className="boton mt-5">
                <button className="btn btn-primary font-weight-normal me-4">
                  {<AiOutlineSave />} Agregar
                </button>
                <Link to={"/registros/clientes"}>
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
  );
};

export default AgregarCliente;
