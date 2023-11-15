import React from "react";
import { Button, Modal } from "react-bootstrap";
import { FcAbout } from "react-icons/fc";

const Modals = ({ show, handleClose }) => {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>
          {<FcAbout />} Informacion de como realice este proyecto
          {<FcAbout />}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>
          El proyecto que he desarrollado se centra en Time For You, un
          emprendimiento dedicado a la gestión de un salón de belleza. En este
          proyecto, he utilizado tecnologías como
          <strong> React y Firebase </strong> para construir la interfaz de
          usuario y las funcionalidades del frontend.
        </p>
        <p>
          En el <strong> lado del backend </strong>, hemos utilizado
          <strong> C# .NET</strong>, lo que nos permite construir una base
          sólida y segura para gestionar los datos y lógica de negocio del
          salón. Para la persistencia de datos, hemos optado por una{" "}
          <strong>base de datos relacional utilizando SQL Server</strong>, lo
          que nos permite manejar la información de manera estructurada y
          eficiente.
        </p>
        <p>
          <em>
            Es importante destacar que este proyecto es un trabajo en progreso
            constante. Continuamente estamos mejorando y ampliando sus
            funcionalidades para adaptarnos a las cambiantes necesidades del
            negocio y brindar una experiencia excepcional a nuestros usuarios.
          </em>
        </p>
        <h6>
          Para mas informacion contactame{" "}
          <a href="mailto:victor_15_avila@hotmail.es">enviándome un correo</a>
        </h6>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={handleClose}>
          Gracias!
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default Modals;
