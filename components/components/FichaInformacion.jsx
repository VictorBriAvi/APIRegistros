const FichaInformacion = ({ servicioById }) => {
  return (
    <div className="col-lg-6   mb-5 contenedor-info ">
      <h1>Informacion del producto</h1>
      <ul className="list-group text-center">
        <li className="list-group-item d-flex justify-content-between align-items-start">
          <div className="ms-2 me-auto">
            <div className=" fw-bold">Tipo de servicio</div>
            <div className="text-center">{servicioById.nombreServicio}</div>
          </div>
        </li>
        <li className="list-group-item d-flex justify-content-between align-items-start">
          <div className="ms-2 me-auto">
            <div className="fw-bold">Colaborador que realizo el servicio</div>
            <div className="text-center">
              {servicioById.nombreCompletoEmpleado}
            </div>
          </div>
        </li>
        <li className="list-group-item d-flex justify-content-between align-items-start">
          <div className="ms-2 me-auto">
            <div className="fw-bold">Cliente atendido</div>
            <div className="text-center">
              {servicioById.nombreCompletoCliente}
            </div>
          </div>
        </li>
        <li className="list-group-item d-flex justify-content-between align-items-start">
          <div className="ms-2 me-auto">
            <div className="fw-bold">Tipo de pago</div>
            <div className="text-center">{servicioById.nombreTipoDepago}</div>
          </div>
        </li>
        <li className="list-group-item d-flex justify-content-between align-items-start">
          <div className="ms-2 me-auto">
            <div className="fw-bold">Valor servicio</div>
            <div className="text-center">{servicioById.precioProducto}</div>
          </div>
        </li>
      </ul>
    </div>
  );
};

export default FichaInformacion;
