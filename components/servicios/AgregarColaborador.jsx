import { useState } from "react";
import { AiOutlineSave, AiOutlineRollback } from "react-icons/ai";

import { Link, useNavigate } from "react-router-dom";
import moment from "moment";

import { Toast } from "../../Alert/Aler";
import DatePicker from "react-datepicker";
import { Container } from "react-bootstrap";

import {
  useCreateColaboradorMutation,
  useGetColaboradoresQuery,
} from "../../api/colaboradoresApi";

const AgregarColaborador = () => {
  const navigate = useNavigate();

  const { data: colaboradores, isLoading } = useGetColaboradoresQuery();

  const [createColaborador] = useCreateColaboradorMutation();
  const [colaborador, setColaborador] = useState({
    nombreCompletoEmpleado: "",
    documentoNacional: "",
    fechaNacimiento: "",
  });

  console.log(colaboradores);

  const handleChange = (e) => {
    setColaborador({
      ...colaborador,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const fechaFormateada = moment(colaborador.fechaNacimiento).format(
      "DD/MM/YYYY"
    );

    if (colaborador.nombreCompletoEmpleado.trim() === "") {
      Toast.fire({
        icon: "error",
        title: "No estas agregando el nombre del colaborador",
      });
      return;
    }
    if (colaborador.documentoNacional.trim() === "") {
      Toast.fire({
        icon: "error",
        title: "No estas agregando DNI del colaborador",
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

    const nombreColaboradorExistente = colaboradores.find(
      (p) => p.nombreCompletoEmpleado === colaborador.nombreCompletoEmpleado
    );
    const documentoColaboradorExistente = colaboradores.find(
      (p) => p.documentoNacional === colaborador.documentoNacional
    );

    if (nombreColaboradorExistente) {
      Toast.fire({
        icon: "error",
        title: "El nombre del colaborador ya esta existente",
      });
      return;
    }
    if (documentoColaboradorExistente) {
      Toast.fire({
        icon: "error",
        title: "El documento del colaborador ya esta existente",
      });
      return;
    }

    console.log(colaborador);

    try {
      const respuesta = await createColaborador(colaborador);
      console.log(respuesta);
      navigate("/registros/colaboradores");
    } catch (error) {
      console.log(error);
    }
  };

  if (isLoading) {
    return <p>Cargando...</p>;
  }

  return (
    <Container>
      <div className="container">
        <div className="text-center">
          <h1>Agregar Colaborador</h1>
          <h6>Aca puedes agregar los nuevos colaboradores</h6>
          <hr />
        </div>
        <div className="row">
          <div className="col-sm-12">
            <form onSubmit={handleSubmit}>
              <div>
                <div className="my-2">
                  <label htmlFor="1">
                    Ingrese el nombre del colaborador
                    <span className="text-danger  fw-bold">*</span>
                  </label>
                </div>

                <div className="form-floating mb-3">
                  <input
                    type="text"
                    className="form-control"
                    id="1"
                    placeholder="nombre colaborador"
                    name="nombreCompletoEmpleado"
                    pattern="[A-Za-z\s]*"
                    value={colaborador.nombreCompletoEmpleado}
                    onChange={handleChange}
                  />
                  <label htmlFor="1">Nombre Colaborador </label>
                </div>
              </div>

              <div>
                <div className="my-2">
                  <label htmlFor="2">
                    Ingresa el DNI del Colaborador
                    <span className="text-danger  fw-bold">*</span>
                  </label>
                  <div className="form-floating mb-3">
                    <input
                      type="text"
                      className="form-control"
                      id="1"
                      placeholder="nombre colaborador"
                      name="documentoNacional"
                      pattern="[0-9]+"
                      value={colaborador.documentoNacional}
                      onChange={handleChange}
                    />
                    <label htmlFor="1">DNI Colaborador </label>
                  </div>
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
                  value={colaborador.fechaNacimiento}
                  onChange={handleChange}
                />
              </div>
              <div className="boton mt-5">
                <button className="btn btn-primary font-weight-normal me-4">
                  {<AiOutlineSave />} Agregar
                </button>
                <Link to={"/registros/colaboradores"}>
                  <button className="btn btn-info font-weight-normal">
                    {<AiOutlineRollback />} Regresar
                  </button>
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default AgregarColaborador;
