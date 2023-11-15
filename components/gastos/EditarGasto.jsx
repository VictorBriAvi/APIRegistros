import { AiOutlineSave, AiOutlineRollback } from "react-icons/ai";

import { Link, useNavigate, useParams } from "react-router-dom";

import Select from "react-select";

import { useState } from "react";

import Swal from "sweetalert2";

import {
  useGetGastoByIdQuery,
  useUpdateGastoMutation,
} from "../../api/gastosApi";
import { useGetTipoDeGastosQuery } from "../../api/tipoDeGastosApi";

const EditarGasto = () => {
  const params = useParams();
  const navigate = useNavigate();
  const { data: tipoDeGastos } = useGetTipoDeGastosQuery();
  const { data: gastoById, isLoading } = useGetGastoByIdQuery(params.id);
  const [updateGasto] = useUpdateGastoMutation();

  const [gastoEdit, setGastoEdit] = useState({
    precioGasto: 0,
    descripcionGastos: "",
    tipoDeGastosId: 0,
  });

  const SelectGasto = tipoDeGastos
    ? tipoDeGastos.map((tipoDeGasto) => ({
        value: tipoDeGasto.tipoDeGastosId,
        label: tipoDeGasto.nombreTipoDeGastos,
      }))
    : [];

  const handleChange = (selectOption, name) => {
    if (name === "precioGasto") {
      setGastoEdit((prevGasto) => ({
        ...prevGasto,
        [name]: selectOption.target.value,
      }));
    } else {
      setGastoEdit((prevGasto) => ({
        ...prevGasto,
        [name]: selectOption,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const GastoActualizado = {};

    if (
      gastoEdit.tipoDeGastosId === 0 &&
      gastoEdit.descripcionGastos === "" &&
      gastoEdit.precioGasto === 0
    ) {
      Swal.fire(
        "No has modificado",
        "En caso de no querer modificar dar click en el boton regresar",
        "warning"
      );
      return;
    }

    if (gastoEdit.tipoDeGastosId !== 0) {
      GastoActualizado.tipoDeGastosId = gastoEdit.tipoDeGastosId.value;
    }

    if (gastoEdit.descripcionGastos !== "") {
      GastoActualizado.descripcionGastos = gastoEdit.descripcionGastos;
    }

    if (gastoEdit.precioGasto !== 0) {
      GastoActualizado.precioGasto = gastoEdit.precioGasto;
    }

    try {
      console.log({
        id: gastoById.gastosId,
        ...GastoActualizado,
      });
      const response = await updateGasto({
        id: gastoById.gastosId,
        ...GastoActualizado,
      });
      console.log(response);
      // navigate("/registros/gastos");
    } catch (error) {
      console.log(error);
    }
  };

  if (isLoading) {
    return <p>Cargando producto...</p>;
  }
  return (
    <div className="container">
      <div className="text-center">
        <h1>Editar tipo de gasto</h1>
        <h5>Aca puedes editar el tipo de gasto seleccionado</h5>
        <hr />
      </div>
      <div className="row">
        <div className="col-sm-12 ">
          <form onSubmit={handleSubmit}>
            <div>
              <div className="my-2">
                <label htmlFor="3"> Ingrese la descripcion del gasto</label>
              </div>

              <div className="form-floating mb-3 letras">
                <input
                  type="text"
                  className="form-control"
                  id="3"
                  name="descripcionGastos"
                  placeholder="descripcion del gasto"
                  pattern="[A-Za-z\s]*"
                  value={gastoEdit.descripcionGastos}
                  onChange={(e) =>
                    handleChange(e.target.value, "descripcionGastos")
                  }
                />
                <label htmlFor="3">Descripcion del gasto</label>
              </div>
            </div>

            <div>
              <div className="my-2">
                <label htmlFor="1">
                  Ingrese el tipo de gasto
                  <span className="text-danger  fw-bold">*</span>
                </label>
              </div>
              <div>
                <Select
                  options={SelectGasto}
                  menuPlacement="bottom"
                  onChange={(selectOption) =>
                    handleChange(selectOption, "tipoDeGastosId")
                  }
                  value={gastoEdit.tipoDeGastosId}
                />
              </div>
            </div>

            <div>
              <div className="my-2">
                <label htmlFor="4">
                  Ingresa el valor del gasto
                  <span className="text-danger  fw-bold">*</span>
                </label>
              </div>

              <div className="form-floating mb-3">
                <input
                  type="number"
                  className="form-control"
                  id="4"
                  placeholder="precio gasto"
                  name="precioGasto"
                  pattern="[0-9]+"
                  value={gastoEdit.precioGasto}
                  onChange={(e) => handleChange(e, "precioGasto")}
                />
              </div>

              <div>
                <button className="btn btn-primary font-weight-normal me-4">
                  {<AiOutlineSave />} Agregar
                </button>
                <Link to={"/registros/gastos"}>
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

export default EditarGasto;
