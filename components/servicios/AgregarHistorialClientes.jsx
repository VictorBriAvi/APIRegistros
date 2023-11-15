import { useNavigate } from "react-router";
import { useAuth } from "../context/authContext";
import { useState } from "react";
import useHistorialClientesLogic from "../../Hooks/useHistorialClientesLogic";
import useClienteLogic from "../../Hooks/useClienteLogic";
import { Toast } from "../../Alert/Aler";
import moment from "moment";
import Swal from "sweetalert2";
import Select from "react-select";
import { AiOutlineRollback, AiOutlineSave } from "react-icons/ai";
import { Link } from "react-router-dom";
import { useGetClientesQuery } from "../../api/clientesApi";
import { useCreateHistorialClienteMutation } from "../../api/historialClienteApi";

const AgregarHistorialClientes = () => {
  const navigate = useNavigate();

  const { data: clientes, isLoading } = useGetClientesQuery();
  const [createHistorialCliente] = useCreateHistorialClienteMutation();
  const [historialCliente, setHistorialCliente] = useState({
    descripcionHistorialCliente: "",
    clienteId: 0,
    nombreDeHistorialCliente: "",
    fechaActual: "",
  });

  const SelectClientes = clientes
    ? clientes.map((cliente) => ({
        value: cliente.clienteId,
        label: cliente.nombreCompletoCliente,
      }))
    : [];

  const handleChange = (selectOption, name) => {
    setHistorialCliente((prevGasto) => ({
      ...prevGasto,
      [name]: selectOption || selectOption.value,
    }));

    console.log(historialCliente);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!historialCliente.nombreDeHistorialCliente) {
      Toast.fire({
        icon: "error",
        title: "No estas agregando el tipo de gasto",
      });
      return;
    }

    if (!historialCliente.descripcionHistorialCliente) {
      Toast.fire({
        icon: "error",
        title: "No estas agregando una descripcion al tipo de gasto",
      });
      return;
    }

    try {
      console.log(moment(historialCliente.fechaActual).format("YYYY-MM-DD"));
      const response = createHistorialCliente({
        descripcionHistorialCliente:
          historialCliente.descripcionHistorialCliente,
        nombreDeHistorialCliente: historialCliente.nombreDeHistorialCliente,
        clienteId: historialCliente.clienteId.value,
        fechaActual: moment(historialCliente.fechaActual).format("YYYY-MM-DD"),
      });
      console.log(response);
      Swal.fire("Buen Trabajo!", "has agregado un producto!", "success");

      navigate("/registros/servicios/historial-clientes");
    } catch (error) {
      console.log(error);
    }
  };

  if (isLoading) {
    return <p>Cargando...</p>;
  }
  return (
    <div className="container">
      <div className="text-center">
        <h1>Crear Historial Cliente</h1>
        <h6>Aca puedes agregar historial nuevo del cliente</h6>
        <hr />
      </div>
      <div className="row">
        <div className="col-sm-12">
          <form onSubmit={handleSubmit}>
            <div>
              <div className="my-2">
                <label htmlFor="3">Ingresa el titulo del nuevo historial</label>
              </div>

              <div className="form-floating mb-3 letras">
                <input
                  type="text"
                  className="form-control"
                  id="3"
                  name="nombreDeHistorialCliente"
                  placeholder="nombre historia"
                  pattern="[A-Za-z\s]*"
                  value={historialCliente.nombreDeHistorialCliente}
                  onChange={(e) =>
                    handleChange(e.target.value, "nombreDeHistorialCliente")
                  }
                />
                <label htmlFor="3">Ingresa el titulo del nuevo historial</label>
              </div>
            </div>

            <div>
              <div className="my-2">
                <label htmlFor="4">
                  Ingrese la descripcion del historial
                  <span className="text-danger  fw-bold">*</span>
                </label>
              </div>
              <div className="form-floating mb-3">
                <input
                  type="text"
                  className="form-control"
                  id="4"
                  name="descripcionHistorialCliente"
                  placeholder="nombre historia"
                  value={historialCliente.descripcionHistorialCliente}
                  onChange={(e) =>
                    handleChange(e.target.value, "descripcionHistorialCliente")
                  }
                />
                <label htmlFor="4"> Ingrese la descripcion del historial</label>
              </div>
            </div>

            {/*ACA COMIENZA EL SELECT */}
            <div>
              <div className="my-2">
                <label htmlFor="1">
                  Ingrese el nombre del cliente
                  <span className="text-danger  fw-bold">*</span>
                </label>
              </div>
              <div>
                <Select
                  options={SelectClientes}
                  menuPlacement="bottom"
                  onChange={(selectOption) =>
                    handleChange(selectOption, "clienteId")
                  }
                  value={historialCliente.clienteId}
                />
              </div>
            </div>

            <div>
              <div className="boton">
                <button className="btn btn-primary font-weight-normal me-4">
                  {<AiOutlineSave />} Agregar
                </button>
                <Link to={"/registros/servicios/historial-clientes"}>
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
  );
};

export default AgregarHistorialClientes;
