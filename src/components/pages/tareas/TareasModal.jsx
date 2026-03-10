import { Modal, Button, Form } from "react-bootstrap";

const maquinas = [
  "PC1", "PC2", "PC3", "PC4", "PC5",
  "XCM", "WA200", "JD1", "JD2",
  "Moto.", "EIQ", "ETX",
  "Batea1", "Batea2", "Vibro", "Otros",
];

const responsablesPredefinidos = ["Nelson", "Zamorano", "Mauricio"];

const TareasModal = ({
  show,
  onHide,
  editando,
  onSubmit,
  register,
  handleSubmit,
  errors,
  cerrarModal,
  setValue,
  responsableOtro,
  setResponsableOtro,
}) => {
  return (
    <Modal show={show} onHide={onHide} centered scrollable>
      <Modal.Header closeButton>
        <Modal.Title>{editando ? "Editar Tarea" : "Nueva Tarea"}</Modal.Title>
      </Modal.Header>

      <Form onSubmit={handleSubmit(onSubmit)}>
        <Modal.Body>
          <Form.Group className="mb-2">
            <Form.Label>Fecha*</Form.Label>
            <Form.Control
              type="date"
              {...register("fecha", { required: "La fecha es obligatoria" })}
            />
            <Form.Text className="text-danger">
              {errors.fecha?.message}
            </Form.Text>
          </Form.Group>

          <Form.Group className="mb-2">
            <Form.Label>Tarea*</Form.Label>
            <Form.Control
              as="textarea"
              rows={2}
              placeholder="Descripción de la tarea"
              {...register("tarea", { required: "La tarea es obligatoria" })}
            />
            <Form.Text className="text-danger">
              {errors.tarea?.message}
            </Form.Text>
          </Form.Group>

          <Form.Group className="mb-2">
            <Form.Label>Máquina*</Form.Label>
            <Form.Select
              {...register("maquina", {
                required: "La máquina es obligatoria",
              })}
            >
              <option value="">Seleccione máquina</option>
              {maquinas.map((m) => (
                <option key={m} value={m}>
                  {m}
                </option>
              ))}
            </Form.Select>
            <Form.Text className="text-danger">
              {errors.maquina?.message}
            </Form.Text>
          </Form.Group>

          <Form.Group className="mb-2">
            <Form.Label>Urgencia*</Form.Label>
            <Form.Select
              {...register("urgencia", {
                required: "La urgencia es obligatoria",
              })}
            >
              <option value="">Seleccione urgencia</option>
              <option value="Baja">Baja</option>
              <option value="Media">Media</option>
              <option value="Alta">Alta</option>
            </Form.Select>
            <Form.Text className="text-danger">
              {errors.urgencia?.message}
            </Form.Text>
          </Form.Group>

          <Form.Group className="mb-2">
            <Form.Label>Responsable*</Form.Label>
            {!responsableOtro ? (
              <>
                <Form.Select
                  {...register("responsable", {
                    required: "El responsable es obligatorio",
                  })}
                  onChange={(e) => {
                    if (e.target.value === "__otro__") {
                      setResponsableOtro(true);
                      setValue("responsable", "");
                    } else {
                      setValue("responsable", e.target.value);
                    }
                  }}
                >
                  <option value="">Seleccione responsable</option>
                  {responsablesPredefinidos.map((r) => (
                    <option key={r} value={r}>
                      {r}
                    </option>
                  ))}
                  <option value="__otro__">Otro...</option>
                </Form.Select>
                <Form.Text className="text-danger">
                  {errors.responsable?.message}
                </Form.Text>
              </>
            ) : (
              <>
                <div className="responsable-input">
                  <Form.Control
                    type="text"
                    placeholder="Escriba el nombre"
                    {...register("responsable", {
                      required: "El responsable es obligatorio",
                    })}
                    autoFocus
                  />
                  <Button
                    variant="outline-secondary"
                    size="sm"
                    onClick={() => {
                      setResponsableOtro(false);
                      setValue("responsable", "");
                    }}
                    title="Volver a la lista"
                  >
                    <i className="bi bi-arrow-left"></i>
                  </Button>
                </div>
                <Form.Text className="text-danger">
                  {errors.responsable?.message}
                </Form.Text>
              </>
            )}
          </Form.Group>

          {editando && (
            <Form.Group className="mb-2">
              <Form.Label>Estado*</Form.Label>
              <Form.Select
                {...register("estado", {
                  required: "El estado es obligatorio",
                })}
              >
                <option value="Pendiente">Pendiente</option>
                <option value="En proceso">Revisar</option>
                <option value="Terminada">Terminada</option>
              </Form.Select>
              <Form.Text className="text-danger">
                {errors.estado?.message}
              </Form.Text>
            </Form.Group>
          )}
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

export default TareasModal;
