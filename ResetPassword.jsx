import { useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "./components/context/authContext";
import Swal from "sweetalert2";
import { Toast } from "./Alert/Aler";

const ResetPassword = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    email: "",
  });

  const { resetPassword } = useAuth();

  const handleChange = ({ target: { name, value } }) => {
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("submit");

    if (user.email === "") {
      Toast.fire({
        icon: "error",
        title: "No ingreso ningun correo electronico",
      });
      return;
    }
    resetPassword(user.email);
    Swal.fire(
      "Buen trabajo!",
      "Acabas de solicitar cambio de contraseña, por favor revisa tu correo electronico",
      "success"
    );
    navigate("/registros/login");
  };

  return (
    <Container
      fluid
      className=" d-flex justify-content-center align-items-center vh-100 w-75 "
    >
      <Container className=" py-5  bg-light">
        <h2 className="my-4  text-center">Recuperar contraseña</h2>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label htmlFor="email">Correo Electronico</Form.Label>
            <Form.Control
              type="email"
              name="email"
              placeholder="ejemplo@gmail.com"
              onChange={handleChange}
            />
          </Form.Group>

          <Button variant="primary" type="submit" className="w-100">
            Recuperar contraseña
          </Button>
        </Form>
        <p className="text-center mt-3">
          Quieres iniciar sesion ? <Link to="/registros/login">Ingresa</Link>
        </p>
      </Container>
    </Container>
  );
};

export default ResetPassword;
