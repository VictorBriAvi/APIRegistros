import { AiOutlineSave, AiOutlineRollback } from "react-icons/ai";

import { Link, useNavigate, useParams } from "react-router-dom";

import Select from "react-select";

import { useState } from "react";

import FichaInformacion from "../components/FichaInformacion";

import Swal from "sweetalert2";
import { useGetClientesQuery } from "../../api/clientesApi";
import { useGetTiposDeServiciosQuery } from "../../api/tiposDeServiciosApi";
import { useGetColaboradoresQuery } from "../../api/colaboradoresApi";
import { useGetTipoDePagoQuery } from "../../api/tipoDePagoApi";
import {
  useGetServicioByIdQuery,
  useUpdateServicioMutation,
} from "../../api/servicioApi";

const EditarServicio = () => {
  const params = useParams();
  const navigate = useNavigate();

  const { data: servicioById, isLoading } = useGetServicioByIdQuery(params.id);

  const [updateServicio] = useUpdateServicioMutation();

  // ACA HACEMOS LLAMADO  DE TODOS LOS GET DE CADA TABLA A NECESITAR

  const { data: tiposDeServicios } = useGetTiposDeServiciosQuery();
  const { data: colaboradores } = useGetColaboradoresQuery();
  const { data: clientes } = useGetClientesQuery();
  const { data: tiposDePago } = useGetTipoDePagoQuery();

  const [servicioEdit, setServicioEdit] = useState({
    precioProducto: 0,
    nombreServicio: 0,
    nombreCompletoEmpleado: 0,
    nombreCompletoCliente: 0,
    nombreTipoDePago: 0,
  });

  const SelectTiposDeServicios = tiposDeServicios
    ? tiposDeServicios.map((tipoDeServicio) => ({
        value: tipoDeServicio.tipoDeServicioId,
        label: tipoDeServicio.nombreServicio,
      }))
    : [];

  const SelectTiposDePago = tiposDePago
    ? tiposDePago.map((tipoDePago) => ({
        value: tipoDePago.tipoDePagoId,
        label: tipoDePago.nombreTipoDePago,
      }))
    : [];
  const SelectColaboradores = colaboradores
    ? colaboradores.map((colaborador) => ({
        value: colaborador.empleadoId,
        label: colaborador.nombreCompletoEmpleado,
      }))
    : [];

  const SelectCliente = clientes
    ? clientes.map((cliente) => ({
        value: cliente.clienteId,
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
    console.log(servicioById);
    const servicioActualizado = {
      fechaIngresoServicio: servicioById.fechaIngresoServicio,
    };

    if (
      servicioEdit.nombreCompletoCliente === 0 &&
      servicioEdit.nombreCompletoEmpleado === 0 &&
      servicioEdit.nombreServicio === 0 &&
      servicioEdit.nombreTipoDePago === 0 &&
      servicioEdit.precioProducto === 0
    ) {
      Swal.fire(
        "No has modificado",
        "En caso de no querer modificar dar click en el boton regresar",
        "warning"
      );
      return;
    }

    if (servicioEdit.nombreCompletoEmpleado !== 0) {
      servicioActualizado.empleadoId =
        servicioEdit.nombreCompletoEmpleado.value;
    }
    if (servicioEdit.nombreCompletoCliente !== 0) {
      servicioActualizado.clienteId = parseInt(
        servicioEdit.nombreCompletoCliente.value
      );
    }
    if (servicioEdit.nombreServicio !== 0) {
      servicioActualizado.tipoDeServicioId = parseInt(
        servicioEdit.nombreServicio.value
      );
    }
    if (servicioEdit.nombreTipoDePago !== 0) {
      servicioActualizado.tipoDePagoId = parseInt(
        servicioEdit.nombreTipoDePago.value
      );
    }
    if (servicioEdit.precioProducto !== 0) {
      servicioActualizado.valorServicio = parseInt(servicioEdit.precioProducto);
    }

    try {
      console.log({ id: servicioById.servicioId, ...servicioActualizado });
      const response = await updateServicio({
        id: servicioById.servicioId,
        ...servicioActualizado,
      });
      console.log(response);
      Swal.fire("Buen Trabajo!", "has modificado un servicio!", "success");

      navigate("/registros/servicios");
    } catch (error) {
      console.log(error);
    }
  };

  if (isLoading) {
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
