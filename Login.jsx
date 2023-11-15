import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "./components/context/authContext";
import { Button, Col, Container, Form, Modal, Row } from "react-bootstrap";
import { FcAbout, FcGoogle, FcInfo } from "react-icons/fc";
import { AlertaInputs } from "./Alert/Aler";
import Modals from "./components/components/Modals";
import { useEffect } from "react";

const Login = () => {
  const navigate = useNavigate();
  const [error, setError] = useState();
  const [show, setShow] = useState(false);
  const { login, loginWithGoogle } = useAuth();
  const [user, setUser] = useState({
    email: "admin@gmail.com",
    password: "123456",
  });
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleChange = ({ target: { name, value } }) => {
    setUser({ ...user, [name]: value });
  };

  const handleGoogleSignIn = async () => {
    try {
      await loginWithGoogle();
      navigate("/registros/");
    } catch (error) {
      console.log(error);
    }
  };

  console.log(error);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await login(user.email, user.password);
      navigate("/registros/");
      console.log(user.email, user.password);
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <Container
      fluid
      className=" d-flex justify-content-center align-items-center h-100  w-100  "
    >
      <Row className="justify-content-center mt-5">
        <Col xs={4} className="text-center">
          <div className="login_info ">
            <FcInfo className="icono-info  " onClick={handleShow} />
          </div>

          <h1 className="animacion-letras">Bienvenid@s</h1>
          <Modals show={show} handleClose={handleClose} />
        </Col>

        <h1>{error}</h1>
        <Col xs={8}>
          <Container className=" pb-3 pt-3 w-100">
            {error && <AlertaInputs message={error} />}
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3">
                <Form.Label htmlFor="email">Correo Electronico</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  placeholder="ejemplo@gmail.com"
                  onChange={handleChange}
                  value={user.email}
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
                  value={user.password}
                />
              </Form.Group>
              <Button variant="primary" type="submit" className="w-100">
                Login
              </Button>
              <div className="d-flex justify-content-between text-center my-3">
                <p className="text-center ">
                  No tienes cuenta ?
                  <Link to="/registros/registrar">Registrate</Link>
                </p>

                <p>
                  Se te olvido la contraseña ?
                  <Link to={"/registros/reset-password"}>Recuperala</Link>
                </p>
              </div>
            </Form>

            <Button
              onClick={handleGoogleSignIn}
              variant="outline-dark"
              className="w-100 "
            >
              <FcGoogle className="h5 mx-1" />
              <strong> Iniciar sesion</strong>
            </Button>
          </Container>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
