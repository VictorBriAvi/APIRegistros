import { AiOutlineSave, AiOutlineRollback } from "react-icons/ai";
import { Link, useNavigate, useParams } from "react-router-dom";

import Swal from "sweetalert2";
import { Toast } from "../../Alert/Aler";
import {
  useGetTipoDeGastoByIdQuery,
  useGetTipoDeGastosQuery,
  useUpdateTipoDeGastoMutation,
} from "../../api/tipoDeGastosApi";
import { useState } from "react";

const EditarTipoDegasto = () => {
  const params = useParams();
  const navigate = useNavigate();

  const { data: tiposDeGastos } = useGetTipoDeGastosQuery();
  const { data: tipoDeGastoById } = useGetTipoDeGastoByIdQuery(params.id);
  const [updateTipoDeGasto] = useUpdateTipoDeGastoMutation();
  const [tipoDeGastoEdit, setTipoDeGastoEdit] = useState({
    nombreTipoDeGastos: "",
  });

  const handleChange = (e) => {
    setTipoDeGastoEdit({
      ...tipoDeGastoEdit,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const tipoDeGastoActualizado = {};

    if (tipoDeGastoEdit.nombreTipoDeGastos.trim() === "") {
      Swal.fire(
        "No has modificado",
        "En caso de no querer modificar dar click en el boton regresar",
        "warning"
      );
      return;
    }
    if (tipoDeGastoEdit.nombreTipoDeGastos.trim() !== "") {
      tipoDeGastoActualizado.nombreTipoDeGastos =
        tipoDeGastoEdit.nombreTipoDeGastos.trim();
    }

    const nombreTipoDeGastoExistente = tiposDeGastos.find(
      (p) => p.nombreTipoDeGastos === tipoDeGastoEdit.nombreTipoDeGastos
    );

    if (nombreTipoDeGastoExistente) {
      Toast.fire({
        icon: "error",
        title: "El codigo del producto ya esta existente",
      });
      return;
    }

    try {
      const response = await updateTipoDeGasto({
        id: tipoDeGastoById.tipoDeGastosId,
        ...tipoDeGastoActualizado,
      });

      Swal.fire(
        "Buen Trabajo!",
        "has modificado modificado un tipo de pago!",
        "success"
      );
      console.log(response);
      navigate("/registros/gastos/TiposDeGastos");
    } catch (error) {
      console.log(error);
    }
  };

  if (!tipoDeGastoById) {
    return <p>Cargando producto...</p>;
  }
  return (
    <div>
      <div className="container ">
        <div className="row">
          <div className="col-lg-6  contenedor-info  ">
            <h1>Informacion del tipo de gasto</h1>
            <ul className="list-group text-center">
              <li className="list-group-item d-flex justify-content-between align-items-start">
                <div className="ms-2 me-auto">
                  <div className=" fw-bold">Tipo de gasto</div>
                  <div className="text-center">
                    {tipoDeGastoById.nombreTipoDeGastos}
                  </div>
                </div>
              </li>
            </ul>
          </div>
          <div className="col-lg-6">
            <div>
              <form onSubmit={handleSubmit}>
                <div>
                  <div className="my-2">
                    <label htmlFor="1">Ingrese el tipo de gasto</label>
                  </div>

                  <div className="form-floating mb-3">
                    <input
                      type="text"
                      className="form-control"
                      id="1"
                      placeholder="name@example.com"
                      name="nombreTipoDeGastos"
                      value={tipoDeGastoEdit.nombreTipoDeGastos}
                      onChange={handleChange}
                    />
                    <label htmlFor="1">Tipo de gasto</label>
                  </div>
                </div>

                <div className="boton">
                  <button className="btn btn-primary font-weight-normal me-4">
                    {<AiOutlineSave />} Agregar
                  </button>

                  <Link to={"/registros/gastos/TiposDeGastos"}>
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

export default EditarTipoDegasto;
