import { useState } from "react";
import { Button, Container } from "react-bootstrap";
import Select from "react-select/dist/declarations/src/Select";

const BusquedaParaFiltrar = ({
  options,
  onChange,
  value,
  onSearch,
  placeholder,
  buttonText,
  title,
}) => {
  return (
    <Container>
      <h3>{title}</h3>
      <Select
        options={options}
        menuPlacement="bottom"
        onChange={onChange}
        value={value}
        placeholder={placeholder}
      />
      <div className="col-md-6">
        <Button variant="primary" onClick={onSearch}>
          {buttonText}
        </Button>
      </div>
    </Container>
  );
};

export default BusquedaParaFiltrar;
