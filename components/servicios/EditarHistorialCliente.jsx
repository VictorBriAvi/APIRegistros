import { useState } from "react";
import Select from "react-select";
import { Toast } from "../../Alert/Aler";
import Swal from "sweetalert2";
import moment from "moment";
import { Link, useNavigate, useParams } from "react-router-dom";
import { AiOutlineRollback, AiOutlineSave } from "react-icons/ai";
import { useGetClientesQuery } from "../../api/clientesApi";
import {
  useGetHistorialClienteByIdQuery,
  useUpdateHistorialClienteMutation,
} from "../../api/historialClienteApi";

const EditarHistorialCliente = () => {
  const params = useParams();
  const navigate = useNavigate();

  const { data: clientes } = useGetClientesQuery();

  const { data: historialClienteById, isLoading } =
    useGetHistorialClienteByIdQuery(params.id);

  const [updateHistorialCliente] = useUpdateHistorialClienteMutation();
  const [historialClienteEdit, setHistorialClienteEdit] = useState({
    descripcionHistorialCliente: "",
    clienteId: 0,
    nombreDeHistorialCliente: "",
  });

  const SelectClientes = clientes
    ? clientes.map((cliente) => ({
        value: cliente.clienteId,
        label: cliente.nombreCompletoCliente,
      }))
    : [];

  const handleChange = (selectOption, name) => {
    setHistorialClienteEdit((prevGasto) => ({
      ...prevGasto,
      [name]: selectOption || selectOption.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const historialClienteActualizado = {};

    if (
      historialClienteEdit.nombreDeHistorialCliente.trim() === "" &&
      historialClienteEdit.descripcionHistorialCliente.trim() === "" &&
      historialClienteEdit.clienteId === 0
    ) {
      Swal.fire(
        "No has modificado",
        "En caso de no querer modificar dar click en el boton regresar",
        "warning"
      );
      return;
    }

    if (historialClienteEdit.nombreDeHistorialCliente.trim() !== "") {
      historialClienteActualizado.nombreDeHistorialCliente =
        historialClienteEdit.nombreDeHistorialCliente.trim();
    }
    if (historialClienteEdit.descripcionHistorialCliente.trim() !== "") {
      historialClienteActualizado.descripcionHistorialCliente =
        historialClienteEdit.descripcionHistorialCliente.trim();
    }
    if (historialClienteEdit.clienteId !== 0) {
      historialClienteActualizado.clienteId =
        historialClienteEdit.clienteId.value;
    }

    try {
      Swal.fire("Buen Trabajo!", "has agregado un producto!", "success");
      console.log(historialClienteActualizado);
      await updateHistorialCliente({
        id: historialClienteById.historialClientesId,
        ...historialClienteActualizado,
      });
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
        <h1>Editar Historial Cliente</h1>
        <h6>Aca puedes Editar historial nuevo del cliente</h6>
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
                  value={historialClienteEdit.nombreDeHistorialCliente}
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
                  value={historialClienteEdit.descripcionHistorialCliente}
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
                  value={historialClienteEdit.clienteId}
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

export default EditarHistorialCliente;
