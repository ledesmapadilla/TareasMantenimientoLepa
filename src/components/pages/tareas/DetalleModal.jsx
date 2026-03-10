import { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";

const DetalleModal = ({ show, onHide, tarea, onGuardar, onBorrar, soloLectura = false }) => {
  const [detalle, setDetalle] = useState("");

  useEffect(() => {
    if (tarea) {
      setDetalle(tarea.detalle || "");
    }
  }, [tarea]);

  const handleGuardar = () => {
    onGuardar(tarea._id, detalle);
  };

  return (
    <Modal show={show} onHide={onHide} centered size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Detalle de tarea</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Control
          as="textarea"
          rows={10}
          value={detalle}
          onChange={(e) => setDetalle(e.target.value)}
          placeholder="Escriba el detalle de la tarea..."
          readOnly={soloLectura}
        />
      </Modal.Body>
      <Modal.Footer className="justify-content-center">
        {!soloLectura && (
          <Button variant="outline-danger" onClick={() => onBorrar(tarea._id)}>
            Borrar
          </Button>
        )}
        <Button variant="outline-secondary" onClick={onHide}>
          {soloLectura ? "Cerrar" : "Cancelar"}
        </Button>
        {!soloLectura && (
          <Button variant="outline-success" onClick={handleGuardar}>
            Guardar
          </Button>
        )}
      </Modal.Footer>
    </Modal>
  );
};

export default DetalleModal;
