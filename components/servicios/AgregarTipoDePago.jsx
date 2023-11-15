import { useState } from "react";
import { AiOutlineSave, AiOutlineRollback } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";

import Swal from "sweetalert2";

import { Toast } from "../../Alert/Aler";
import useTiposDePagoLogic from "../../Hooks/useTiposDePago";
import {
  useCreateTipoDePagoMutation,
  useGetTipoDePagoQuery,
} from "../../api/tipoDePagoApi";

const AgregarTipoDePago = () => {
  const navigate = useNavigate();

  const { data: tiposDePago, isLoading } = useGetTipoDePagoQuery();
  const [createTipoDePago] = useCreateTipoDePagoMutation();

  const [tipoDePago, setTipoDePago] = useState({
    nombreTipoDePago: "",
  });

  const handleChange = (e) => {
    setTipoDePago({
      ...tipoDePago,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(tipoDePago);
    if (tipoDePago.nombreTipoDePago.trim() === "") {
      Toast.fire({
        icon: "error",
        title: "No estas agregando el servicio del producto",
      });
      return;
    }

    const tipoDePagoExistente = tiposDePago.find(
      (p) => p.nombreTipoDePago === tipoDePago.nombreTipoDePago
    );

    if (tipoDePagoExistente) {
      Toast.fire({
        icon: "error",
        title: "El codigo del producto ya esta existente",
      });
      return;
    }

    try {
      const response = await createTipoDePago(tipoDePago);
      Swal.fire(
        "Buen Trabajo!",
        "has agregado un nuevo tipo de pago!",
        "success"
      );
      navigate("/registros/tiposDePago");
      console.log(response);
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
          <h1>Agregarnuevo tipo de pago</h1>
          <h5>Aca puedes agregar los nuevos tipos de pago</h5>
          <hr />
        </div>
        <div className="row">
          <div className="col-sm-12">
            <form onSubmit={handleSubmit}>
              <div>
                <div className="my-2">
                  <label htmlFor="1">
                    Ingrese el tipo de pago
                    <span className="text-danger  fw-bold">*</span>
                  </label>
                </div>

                <div className="form-floating mb-3">
                  <input
                    type="text"
                    className="form-control"
                    id="1"
                    placeholder="tipoDePago"
                    name="nombreTipoDePago"
                    value={tipoDePago.nombreServicio}
                    onChange={handleChange}
                    pattern="[A-Za-z\s]+"
                  />
                  <label htmlFor="1">Ingrese el tipo de pago </label>
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
  );
};

export default AgregarTipoDePago;
