// AjustarPrecios.js

import React, { useState } from "react";
import useTiposDeServiciosLogic from "../../Hooks/useTiposDeServiciosLogic";
import { Button, Container, Form, InputGroup } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import TitulosPages from "../components/TitulosPages";

const CalculosPorcentaje = () => {
  const [porcentajeAumento, setPorcentajeAumento] = useState(0);

  const { tiposServicios, updateTipoDeServicio, subirServiciosPorCategoria } =
    useTiposDeServiciosLogic();

  const opcionesServicio = [
    "Manicura",
    "Peluquería",
    "Depilación",
    "Pestaña",
    "Color",
  ];

  const [servicio, setServicio] = useState({
    tipoDeTrabajo: "", // Estado para almacenar la categoría seleccionada
  });

  const handleSelectChange = (e) => {
    setServicio({
      ...servicio,
      tipoDeTrabajo: e.target.value, // Almacena la categoría seleccionada
    });
  };

  const aumentarPrecios = (e, porcentaje, categoriaSeleccionada) => {
    e.preventDefault();

    subirServiciosPorCategoria(categoriaSeleccionada, porcentaje);
  };

  return (
    <Container className="ajustar-precios">
      <TitulosPages
        regresar={`/registros/servicios/tiposDeServicios`}
        titulo={"Aumentar los precios de los servicios"}
      ></TitulosPages>
      <hr />
      <Container>
        {/**ACA COMIENZA EL SELECT */}
        <form>
          <fieldset>
            <div className="form-floating mb-3">
              <Form.Select
                aria-label="Default select example"
                id="2"
                name="tipoDeTrabajo"
                value={servicio.tipoDeTrabajo}
                onChange={handleSelectChange}
              >
                <option value="">Seleccione un servicio</option>
                {opcionesServicio.map((opcion, index) => (
                  <option key={index} value={opcion}>
                    {opcion}
                  </option>
                ))}
              </Form.Select>

              <label htmlFor="2">Seleccione el servicio</label>
            </div>
          </fieldset>

          {/** PORCENTAJE DE AUMENTO */}
          <fieldset>
            <label>Porcentaje de Aumento:</label>
            <div className="form-floating mb-3">
              <InputGroup className="mb-3">
                <InputGroup.Text id="inputGroup-sizing-default">
                  %
                </InputGroup.Text>
                <Form.Control
                  type="number"
                  value={porcentajeAumento}
                  aria-label="Default"
                  aria-describedby="inputGroup-sizing-default"
                  onChange={(e) => setPorcentajeAumento(e.target.value)}
                />
              </InputGroup>
            </div>
          </fieldset>
          <Button
            variant="success"
            onClick={(e) =>
              aumentarPrecios(e, porcentajeAumento, servicio.tipoDeTrabajo)
            }
          >
            Aumentar Precios
          </Button>
        </form>
      </Container>
    </Container>
  );
};

export default CalculosPorcentaje;
