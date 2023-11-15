import { useState } from "react";
import { useAuth } from "./components/context/authContext";
import { Link, useNavigate } from "react-router-dom";
import { Button, Container, Form } from "react-bootstrap";
import { FcGoogle } from "react-icons/fc";

const Register = () => {
  const navigate = useNavigate();
  const [error, setError] = useState();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const { singUp } = useAuth();

  const handleChange = ({ target: { name, value } }) => {
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await singUp(user.email, user.password);
      navigate("/registros/");
    } catch (error) {
      console.log(error.code);
      setError(error.message);
    }
  };
  return (
    <Container
      fluid
      className=" d-flex justify-content-center align-items-center vh-100 w-75 "
    >
      <Container className=" py-5  bg-light">
        <h2 className="my-4  text-center">Registrar usuario</h2>
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

          <Form.Group className="mb-3">
            <Form.Label htmlFor="password">Password</Form.Label>
            <Form.Control
              type="password"
              name="password"
              id="password"
              placeholder="*******"
              onChange={handleChange}
            />
          </Form.Group>

          <Button variant="primary" type="submit" className="w-100">
            Registrar usuario
          </Button>
        </Form>
        <p className="text-center mt-3">
          Ya tienes cuenta ? <Link to="/registros/login">Iniciar sesion</Link>
        </p>
      </Container>
    </Container>
  );
};

export default Register;
