import { Modal, Button, Form } from "react-bootstrap";

const UsuarioModal = ({
  show,
  onHide,
  editando,
  onSubmit,
  register,
  handleSubmit,
  errors,
  cerrarModal,
}) => {
  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>
          {editando ? "Editar Usuario" : "Nuevo Usuario"}
        </Modal.Title>
      </Modal.Header>

      <Form onSubmit={handleSubmit(onSubmit)}>
        <Modal.Body>
          <Form.Group className="mb-2">
            <Form.Label>Nombre*</Form.Label>
            <Form.Control
              type="text"
              placeholder="Nombre del usuario"
              {...register("nombre", {
                required: "El nombre es obligatorio",
                minLength: {
                  value: 2,
                  message: "El nombre debe tener al menos 2 caracteres",
                },
                maxLength: {
                  value: 100,
                  message: "El nombre no puede superar los 100 caracteres",
                },
              })}
            />
            <Form.Text className="text-danger">
              {errors.nombre?.message}
            </Form.Text>
          </Form.Group>

          <Form.Group className="mb-2">
            <Form.Label>Rol*</Form.Label>
            <Form.Select
              {...register("rol", {
                required: "El rol es obligatorio",
              })}
            >
              <option value="">Seleccione rol</option>
              <option value="Admin">Admin</option>
              <option value="Operario">Operario</option>
            </Form.Select>
            <Form.Text className="text-danger">
              {errors.rol?.message}
            </Form.Text>
          </Form.Group>

          <Form.Group className="mb-2">
            <Form.Label>Contraseña*</Form.Label>
            <Form.Control
              type="text"
              placeholder="Contraseña"
              {...register("contraseña", {
                required: "La contraseña es obligatoria",
                minLength: {
                  value: 4,
                  message: "La contraseña debe tener al menos 4 caracteres",
                },
                maxLength: {
                  value: 100,
                  message: "La contraseña no puede superar los 100 caracteres",
                },
              })}
            />
            <Form.Text className="text-danger">
              {errors.contraseña?.message}
            </Form.Text>
          </Form.Group>
        </Modal.Body>

        <Modal.Footer className="justify-content-center">
          <Button variant="outline-secondary" onClick={cerrarModal}>
            Cancelar
          </Button>
          <Button variant="outline-success" type="submit">
            Guardar
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default UsuarioModal;
