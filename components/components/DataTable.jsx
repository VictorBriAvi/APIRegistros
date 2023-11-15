import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import {
  AiFillDelete,
  AiFillEdit,
  AiFillFileAdd,
  AiOutlineArrowRight,
  AiOutlineArrowLeft,
} from "react-icons/ai";
import { Button, Container, Table } from "react-bootstrap";
import "../../style/DataTable.css";
import Swal from "sweetalert2";
const DataTable = ({
  data,
  deleteData,
  paginaSiguiente,
  paginaAnterior,
  columnaServicio,
  editUrl,
  randomId,
  refetchData,
}) => {
  const paginaClickSiguiente = (e) => {
    e.preventDefault();
    window.scrollTo(0, 0);
    paginaSiguiente();
  };

  const paginaClickAnterior = (e) => {
    e.preventDefault();
    paginaAnterior();
  };

  const handleDelete = (id) => {
    try {
      deleteData(id).then(() => {
        refetchData(); // Llamar a la paginación después de que refetchData se complete
        Swal.fire("Buen Trabajo!", "has eliminado un producto!", "success");
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="mt-5">
      <Container>
        <div className="contenedor_botones_datatable">
          <button
            className="botones_datatable"
            onClick={(e) => paginaClickAnterior(e)}
          >
            <AiOutlineArrowLeft />
          </button>
          <button
            className="botones_datatable"
            onClick={(e) => paginaClickSiguiente(e)}
          >
            <AiOutlineArrowRight />
          </button>
        </div>
      </Container>

      <Table responsive="sm" striped="columns" hover>
        <thead>
          <tr>
            {columnaServicio.map((colum) => (
              <th key={colum.key}>{colum.label}</th>
            ))}
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {data.map((servicio) => (
            <tr key={servicio[randomId]}>
              {columnaServicio.map((colum) => (
                <td key={colum.key}>{servicio[colum.key]}</td>
              ))}

              <td>
                <div>
                  <Link to={`${editUrl}/${servicio[randomId]}`}>
                    <button className="btn btn-primary font-weight-normal">
                      {<AiFillEdit />}
                    </button>
                  </Link>
                  <button
                    className="btn btn-danger font-weight-normal "
                    onClick={() => handleDelete(servicio[randomId])}
                  >
                    {<AiFillDelete />}
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Container>
        <div className="contenedor_botones_datatable">
          <button
            className="botones_datatable"
            onClick={(e) => paginaClickAnterior(e)}
          >
            <AiOutlineArrowLeft />
          </button>
          <button
            className="botones_datatable"
            onClick={(e) => paginaClickSiguiente(e)}
          >
            <AiOutlineArrowRight />
          </button>
        </div>
      </Container>
    </div>
  );
};

export default DataTable;
