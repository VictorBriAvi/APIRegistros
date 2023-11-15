import { AiOutlineSave, AiOutlineRollback } from "react-icons/ai";

import { Link, useNavigate, useParams } from "react-router-dom";

import Select from "react-select";
import useClienteLogic from "../../Hooks/useClienteLogic";
import useColaboradoresLogic from "../../Hooks/useColaboradoresLogic";
import useTiposDePagoLogic from "../../Hooks/useTiposDePago";
import useTiposDeServiciosLogic from "../../Hooks/useTiposDeServiciosLogic";

import { useState } from "react";

import FichaInformacion from "../components/FichaInformacion";
import { useEffect } from "react";
import useServicioLogic from "../../Hooks/useServiciosLogic";
import Swal from "sweetalert2";

const EditarServicio = () => {
  const params = useParams();
  const navigate = useNavigate();

  const { clientes } = useClienteLogic();
  const { colaboradores } = useColaboradoresLogic();
  const { tiposDePago } = useTiposDePagoLogic();
  const { tiposServicios } = useTiposDeServiciosLogic();
  const { getServicioById, updateServicio } = useServicioLogic();

  const [servicioById, setServicioById] = useState(null);

  useEffect(() => {
    const handleGetServicioById = async (id) => {
      const tipoDePago = await getServicioById(id);
      setServicioById(tipoDePago);
    };
    handleGetServicioById(params.id);
  }, []);

  const [servicioEdit, setServicioEdit] = useState({
    precioProducto: "",
    nombreServicio: "",
    nombreCompletoEmpleado: "",
    nombreCompletoCliente: "",
    nombreTipoDePago: "",
  });

  const SelectTiposDeServicios = tiposServicios
    ? tiposServicios.map((tipoDeServicio) => ({
        value: tipoDeServicio.id,
        label: tipoDeServicio.nombreServicio,
      }))
    : [];

  const SelectTiposDePago = tiposDePago
    ? tiposDePago.map((tipoDePago) => ({
        value: tipoDePago.id,
        label: tipoDePago.nombreTipoDePago,
      }))
    : [];
  const SelectColaboradores = colaboradores
    ? colaboradores.map((colaborador) => ({
        value: colaborador.id,
        label: colaborador.nombreCompletoEmpleado,
      }))
    : [];

  const SelectCliente = clientes
    ? clientes.map((cliente) => ({
        value: cliente.id,
        label: cliente.nombreCompletoCliente,
      }))
    : [];

  const handleChange = (selectOption, name) => {
    if (name === "precioProducto") {
      setServicioEdit((prevServicio) => ({
        ...prevServicio,
        [name]: selectOption.target.value,
      }));
    } else {
      setServicioEdit((prevServicio) => ({
        ...prevServicio,
        [name]: selectOption,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const servicioActualizado = {};

    if (
      servicioEdit.nombreCompletoCliente === "" &&
      servicioEdit.nombreCompletoEmpleado === "" &&
      servicioEdit.nombreServicio === "" &&
      servicioEdit.nombreTipoDePago === "" &&
      servicioEdit.precioProducto === ""
    ) {
      Swal.fire(
        "No has modificado",
        "En caso de no querer modificar dar click en el boton regresar",
        "warning"
      );
      return;
    }

    if (servicioEdit.nombreCompletoEmpleado !== "") {
      servicioActualizado.nombreCompletoEmpleado = `colaboradores/${servicioEdit.nombreCompletoEmpleado.value}`;
    }
    if (servicioEdit.nombreCompletoCliente !== "") {
      servicioActualizado.nombreCompletoCliente = `clientes/${servicioEdit.nombreCompletoCliente.value}`;
    }
    if (servicioEdit.nombreServicio !== "") {
      servicioActualizado.nombreServicio = `tiposDeServicios/${servicioEdit.nombreServicio.value}`;
    }
    if (servicioEdit.nombreTipoDePago !== "") {
      servicioActualizado.nombreTipoDePago = `tiposDePago/${servicioEdit.nombreTipoDePago.value}`;
    }
    if (servicioEdit.precioProducto !== "") {
      servicioActualizado.precioProducto = servicioEdit.precioProducto;
    }

    updateServicio(servicioById.id, servicioActualizado);
    navigate("/registros/servicios");
  };

  if (!servicioById) {
    return <p>Cargando producto...</p>;
  }
  return (
    <div className="container">
      <FichaInformacion servicioById={servicioById} />
      <div className="text-center">
        <h1>Crear nuevo Servicio</h1>
        <h5>Aca puedes agregar nuevo servicios</h5>
        <hr />
      </div>
      <div className="row">
        <div className="col-sm-12 ">
          <form onSubmit={handleSubmit}>
            <div>
              <div className="my-2">
                <label htmlFor="1">
                  Ingrese el tipo de servicio
                  <span className="text-danger  fw-bold">*</span>
                </label>
              </div>
              <div>
                <Select
                  options={SelectTiposDeServicios}
                  menuPlacement="bottom"
                  onChange={(selectOption) =>
                    handleChange(selectOption, "nombreServicio")
                  }
                  value={servicioEdit.nombreServicio}
                />
              </div>
            </div>
            <div>
              <div className="my-2">
                <label htmlFor="1">
                  Ingrese el colaborador que realizo el trabajo
                  <span className="text-danger  fw-bold">*</span>
                </label>
              </div>
              <div>
                <Select
                  options={SelectColaboradores}
                  menuPlacement="bottom"
                  onChange={(selectOption) =>
                    handleChange(selectOption, "nombreCompletoEmpleado")
                  }
                  value={servicioEdit.nombreCompletoEmpleado}
                />
              </div>
            </div>

            <div>
              <div className="my-2">
                <label htmlFor="1">
                  Ingrese el cliente atendido
                  <span className="text-danger  fw-bold">*</span>
                </label>
              </div>
              <div>
                <Select
                  options={SelectCliente}
                  menuPlacement="bottom"
                  onChange={(selectOption) =>
                    handleChange(selectOption, "nombreCompletoCliente")
                  }
                  value={servicioEdit.nombreCompletoCliente}
                />
              </div>
            </div>

            <div>
              <div className="my-2">
                <label htmlFor="1">
                  Ingrese el tipo de pago
                  <span className="text-danger  fw-bold">*</span>
                </label>
              </div>
              <div>
                <Select
                  options={SelectTiposDePago}
                  menuPlacement="bottom"
                  onChange={(selectOption) =>
                    handleChange(selectOption, "nombreTipoDePago")
                  }
                  value={servicioEdit.nombreTipoDePago}
                />
              </div>
            </div>

            <div>
              <div className="my-2">
                <label htmlFor="4">
                  Ingresa el valor del servicio
                  <span className="text-danger  fw-bold">*</span>
                </label>
              </div>

              <div className="form-floating mb-3">
                <input
                  type="number"
                  className="form-control"
                  id="4"
                  placeholder="precio producto"
                  name="precioProducto"
                  pattern="[0-9]+"
                  value={servicioEdit.precioProducto}
                  onChange={(e) => handleChange(e, "precioProducto")}
                />
              </div>

              <div>
                <button className="btn btn-primary font-weight-normal me-4">
                  {<AiOutlineSave />} Agregar
                </button>
                <Link to={"/registros/servicios"}>
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

export default EditarServicio;
