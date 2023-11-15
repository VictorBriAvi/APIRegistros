import { Button } from "react-bootstrap";
import { AiOutlineRollback } from "react-icons/ai";
import { Link } from "react-router-dom";

const TitulosPages = ({ regresar, titulo }) => {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-around",
      }}
    >
      <Link to={regresar}>
        <Button
          variant="outline-warning rounded-0 border-0 "
          className="font-weight-bold"
          style={{
            display: "flex",
            alignItems: "center", // Centra verticalmente
            justifyContent: "center", // Centra horizontalmente
          }}
        >
          <h5>
            <AiOutlineRollback className="h3" />
            Regresar
          </h5>
        </Button>
      </Link>

      <h1 className="text-center ">{titulo}</h1>
    </div>
  );
};

export default TitulosPages;
