import { AiOutlineSave, AiOutlineRollback } from "react-icons/ai";

import { Link, useNavigate } from "react-router-dom";

import Select from "react-select";
import useClienteLogic from "../../Hooks/useClienteLogic";
import useColaboradoresLogic from "../../Hooks/useColaboradoresLogic";
import useTiposDePagoLogic from "../../Hooks/useTiposDePago";
import useTiposDeServiciosLogic from "../../Hooks/useTiposDeServiciosLogic";

import { useState } from "react";
import { Toast } from "../../Alert/Aler";
import useServicioLogic from "../../Hooks/useServiciosLogic";
import Swal from "sweetalert2";
import moment from "moment";
import { useAuth } from "../context/authContext";

const AgregarServicio = () => {
  const navigate = useNavigate();
  const { clientesAll, isLoading } = useClienteLogic();
  const { colaboradoresAll } = useColaboradoresLogic();
  const { tiposDePagoAll } = useTiposDePagoLogic();
  const { tiposServiciosAll } = useTiposDeServiciosLogic();
  const { user } = useAuth();
  const { addServicio } = useServicioLogic();

  const [servicio, setServicio] = useState({
    precioProducto: "",
    nombreServicio: "",
    nombreCompletoEmpleado: "",
    nombreCompletoCliente: "",
    nombreTipoDePago: "",
  });

  const SelectTiposDeServicios = tiposServiciosAll
    ? tiposServiciosAll.map((tipoDeServicio) => ({
        value: tipoDeServicio.id,
        label: tipoDeServicio.nombreServicio,
      }))
    : [];

  const SelectTiposDePago = tiposDePagoAll
    ? tiposDePagoAll.map((tipoDePago) => ({
        value: tipoDePago.id,
        label: tipoDePago.nombreTipoDePago,
      }))
    : [];
  const SelectColaboradores = colaboradoresAll
    ? colaboradoresAll.map((colaborador) => ({
        value: colaborador.id,
        label: colaborador.nombreCompletoEmpleado,
      }))
    : [];

  const SelectCliente = clientesAll
    ? clientesAll.map((cliente) => ({
        value: cliente.id,
        label: cliente.nombreCompletoCliente,
      }))
    : [];

  const handleChange = (selectOption, name) => {
    if (name === "precioProducto") {
      setServicio((prevServicio) => ({
        ...prevServicio,
        [name]: selectOption.target.value,
      }));
    } else {
      setServicio((prevServicio) => ({
        ...prevServicio,
        [name]: selectOption,
      }));
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!servicio.nombreServicio) {
      Toast.fire({
        icon: "error",
        title: "No estas agregando el servicio",
      });
      return;
    }
    if (!servicio.nombreCompletoEmpleado) {
      Toast.fire({
        icon: "error",
        title: "No estas agregando el nombre del colaborador",
      });
      return;
    }

    if (!servicio.nombreTipoDePago) {
      Toast.fire({
        icon: "error",
        title: "No estas agregando el tipo de pago",
      });
      return;
    }
    if (servicio.precioProducto <= 0 || servicio.precioProducto === "") {
      Toast.fire({
        icon: "error",
        title: "No estas agregando el precio del producto",
      });
      return;
    }

    try {
      const fechaActual = moment().format("YYYY-MM-DD");
      const response = await addServicio({
        nombreCompletoCliente: `clientes/${servicio.nombreCompletoCliente.value}`,
        nombreCompletoEmpleado: `colaboradores/${servicio.nombreCompletoEmpleado.value}`,
        nombreServicio: `tiposDeServicios/${servicio.nombreServicio.value}`,
        nombreTipoDePago: `tiposDePago/${servicio.nombreTipoDePago.value}`,
        fechaServicio: fechaActual,
        precioProducto: servicio.precioProducto,
        usuarioId: user.uid,
      });
      console.log(response);
      Swal.fire("Buen Trabajo!", "has agregado un producto!", "success");
      navigate("/registros/servicios");
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
        <h1>Crear nuevo Servicio</h1>
        <h5>Aca puedes agregar nuevo servicios</h5>
        <hr />
      </div>
      <div className="row">
        <div className="col-sm-12">
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
                  value={servicio.nombreServicio}
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
                  value={servicio.nombreCompletoEmpleado}
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
                  value={servicio.nombreCompletoCliente}
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
                  value={servicio.nombreTipoDePago}
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
                  value={servicio.precioProducto}
                  onChange={(e) => handleChange(e, "precioProducto")}
                />
              </div>

              <div className="boton">
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

export default AgregarServicio;
