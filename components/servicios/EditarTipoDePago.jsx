import { AiOutlineSave, AiOutlineRollback } from "react-icons/ai";
import { Link, useNavigate, useParams } from "react-router-dom";

import Swal from "sweetalert2";
import { Toast } from "../../Alert/Aler";

import {
  useGetTipoDePagoByIdQuery,
  useGetTipoDePagoQuery,
  useUpdateTipoDePagoMutation,
} from "../../api/tipoDePagoApi";
import { useState } from "react";

const EditarTipoDePago = () => {
  const params = useParams();
  const navigate = useNavigate();

  const { data: tipoDePago } = useGetTipoDePagoQuery();
  const { data: tipoDePagoById, isLoading } = useGetTipoDePagoByIdQuery(
    params.id
  );

  const [updateTipoDePago] = useUpdateTipoDePagoMutation();

  const [tipoDePagoEdit, setTipoDePagoEdit] = useState({
    nombreTipoDePago: "",
  });

  const handleChange = (e) => {
    setTipoDePagoEdit({
      ...tipoDePagoEdit,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const tipoDePagoActualizado = {};

    if (tipoDePagoEdit.nombreTipoDePago.trim() === "") {
      Swal.fire(
        "No has modificado",
        "En caso de no querer modificar dar click en el boton regresar",
        "warning"
      );
      return;
    }
    if (tipoDePagoEdit.nombreTipoDePago.trim() !== "") {
      tipoDePagoActualizado.nombreTipoDePago =
        tipoDePagoEdit.nombreTipoDePago.trim();
    }

    const nombreTipoDePagoExistente = tipoDePago.find(
      (p) => p.nombreTipoDePago === tipoDePagoEdit.nombreTipoDePago
    );

    if (nombreTipoDePagoExistente) {
      Toast.fire({
        icon: "error",
        title: "El codigo del producto ya esta existente",
      });
      return;
    }
    console.log(tipoDePagoById.tipoDePagoId);
    console.log(tipoDePagoActualizado);
    updateTipoDePago(tipoDePagoById.tipoDePagoId, tipoDePagoActualizado);
    Swal.fire(
      "Buen Trabajo!",
      "has modificado modificado un tipo de pago!",
      "success"
    );
    navigate("/registros/tiposDePago");
  };

  if (isLoading) {
    return <p>Cargando producto...</p>;
  }
  return (
    <div>
      <div className="container ">
        <div className="row">
          <div className="col-lg-6  contenedor-info  ">
            <h1>Informacion del tipo de pago</h1>
            <ul className="list-group text-center">
              <li className="list-group-item d-flex justify-content-between align-items-start">
                <div className="ms-2 me-auto">
                  <div className=" fw-bold">Tipo de pago</div>
                  <div className="text-center">
                    {tipoDePagoById.nombreTipoDePago}
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
                    <label htmlFor="1">Ingrese el tipo de pago</label>
                  </div>

                  <div className="form-floating mb-3">
                    <input
                      type="text"
                      className="form-control"
                      id="1"
                      placeholder="name@example.com"
                      name="nombreTipoDePago"
                      value={tipoDePagoEdit.nombreTipoDePago}
                      onChange={handleChange}
                    />
                    <label htmlFor="1">Tipo de pago</label>
                  </div>
                </div>

                <div className="boton">
                  <button className="btn btn-primary font-weight-normal me-4">
                    {<AiOutlineSave />} Agregar
                  </button>

                  <Link to={"/registros/tiposDePago"}>
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

export default EditarTipoDePago;
