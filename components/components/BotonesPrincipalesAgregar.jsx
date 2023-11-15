import { Link } from "react-router-dom";
import { FcAddDatabase } from "react-icons/fc";

const BotonesPrincipalesAgregar = ({ agregar, tituloBoton }) => {
  return (
    <div className="contenedor_botones_superiores">
      <div className="container_boton ">
        <Link to={agregar}>
          <button className="fondo_boton agregar">
            {<FcAddDatabase />} {tituloBoton}
          </button>
        </Link>
      </div>
    </div>
  );
};

export default BotonesPrincipalesAgregar;
