import { Table, Button, Form, Row, Col } from "react-bootstrap";

const maquinas = [
  "PC1", "PC2", "PC3", "PC4", "PC5",
  "XCM", "WA200", "JD1", "JD2",
  "Moto.", "EIQ", "ETX",
  "Batea1", "Batea2", "Vibro", "Otros",
];

const formatearFecha = (fecha) => {
  const [anio, mes, dia] = fecha.split("-");
  return `${dia}/${mes}/${anio}`;
};

const TareasTabla = ({
  tareas,
  borrarTarea,
  abrirEditar,
  filtroMaquina,
  setFiltroMaquina,
  filtroResponsable,
  setFiltroResponsable,
  filtroEstado,
  setFiltroEstado,
  filtroUrgencia,
  setFiltroUrgencia,
  mostrarTerminadas,
  setMostrarTerminadas,
  abrirDetalle,
}) => {
  const tareasFiltradas = tareas.filter((t) => {
    if (!mostrarTerminadas && (t.estado || "Pendiente") === "Terminada") return false;
    if (filtroMaquina && t.maquina !== filtroMaquina) return false;
    if (filtroResponsable && t.responsable !== filtroResponsable) return false;
    if (filtroEstado && (t.estado || "Pendiente") !== filtroEstado) return false;
    if (filtroUrgencia && t.urgencia !== filtroUrgencia) return false;
    return true;
  });

  const responsablesUnicos = [...new Set(tareas.map((t) => t.responsable))];

  return (
    <>
      <Row className="tareas-filtros">
        <Col xs={6} md={3}>
          <div className="filtro-wrap">
            <Form.Select
              size="sm"
              value={filtroMaquina}
              onChange={(e) => setFiltroMaquina(e.target.value)}
              className={filtroMaquina ? "filtro-activo" : ""}
            >
              <option value="">Máquina: Todas</option>
              {maquinas.map((m) => (
                <option key={m} value={m}>{m}</option>
              ))}
            </Form.Select>
            {filtroMaquina && (
              <button className="filtro-clear" onClick={() => setFiltroMaquina("")}>
                <i className="bi bi-x"></i>
              </button>
            )}
          </div>
        </Col>
        <Col xs={6} md={3}>
          <div className="filtro-wrap">
            <Form.Select
              size="sm"
              value={filtroResponsable}
              onChange={(e) => setFiltroResponsable(e.target.value)}
              className={filtroResponsable ? "filtro-activo" : ""}
            >
              <option value="">Responsable: Todos</option>
              {responsablesUnicos.map((r) => (
                <option key={r} value={r}>{r}</option>
              ))}
            </Form.Select>
            {filtroResponsable && (
              <button className="filtro-clear" onClick={() => setFiltroResponsable("")}>
                <i className="bi bi-x"></i>
              </button>
            )}
          </div>
        </Col>
        <Col xs={6} md={3}>
          <div className="filtro-wrap">
            <Form.Select
              size="sm"
              value={filtroUrgencia}
              onChange={(e) => setFiltroUrgencia(e.target.value)}
              className={filtroUrgencia ? "filtro-activo" : ""}
            >
              <option value="">Urgencia: Todas</option>
              <option value="Baja">Baja</option>
              <option value="Media">Media</option>
              <option value="Alta">Alta</option>
            </Form.Select>
            {filtroUrgencia && (
              <button className="filtro-clear" onClick={() => setFiltroUrgencia("")}>
                <i className="bi bi-x"></i>
              </button>
            )}
          </div>
        </Col>
        <Col xs={6} md={3}>
          <div className="filtro-wrap">
            <Form.Select
              size="sm"
              value={filtroEstado}
              onChange={(e) => setFiltroEstado(e.target.value)}
              className={filtroEstado ? "filtro-activo" : ""}
            >
              <option value="">Estado: Todos</option>
              <option value="Pendiente">Pendiente</option>
              <option value="En proceso">Revisar</option>
              <option value="Terminada">Terminada</option>
            </Form.Select>
            {filtroEstado && (
              <button className="filtro-clear" onClick={() => setFiltroEstado("")}>
                <i className="bi bi-x"></i>
              </button>
            )}
          </div>
        </Col>
      </Row>
      <Form.Check
        type="checkbox"
        label="Mostrar terminadas"
        checked={mostrarTerminadas}
        onChange={(e) => setMostrarTerminadas(e.target.checked)}
        className="mb-2"
      />

      {tareasFiltradas.length === 0 ? (
        <div className="tareas-vacio">
          <p>
            {tareas.length === 0
              ? 'No hay tareas registradas. Haga clic en "Nueva Tarea" para agregar una.'
              : "No hay tareas que coincidan con los filtros seleccionados."}
          </p>
        </div>
      ) : (
        <div className="tareas-scroll">
        <Table striped bordered hover className="tareas-tabla">
          <thead className="table-dark">
            <tr>
              <th>Fecha</th>
              <th>Tarea</th>
              <th>Máquina</th>
              <th>Urgencia</th>
              <th>Responsable</th>
              <th>Estado</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {tareasFiltradas.map((tarea) => (
              <tr key={tarea._id}>
                <td>{formatearFecha(tarea.fecha)}</td>
                <td className="col-tarea">
                  <div className="col-tarea-content">
                    <span>{tarea.tarea}</span>
                    <Button
                      variant={tarea.detalle ? "outline-warning" : "outline-success"}
                      size="sm"
                      className="btn-plus"
                      onClick={() => abrirDetalle(tarea)}
                      title={tarea.detalle ? "Ver detalle" : "Agregar detalle"}
                    >
                      <i className={tarea.detalle ? "bi bi-eye" : "bi bi-plus"}></i>
                    </Button>
                  </div>
                </td>
                <td>{tarea.maquina}</td>
                <td>
                  <span
                    className={`badge ${
                      tarea.urgencia === "Alta"
                        ? "bg-danger"
                        : tarea.urgencia === "Media"
                        ? "bg-warning text-dark"
                        : "bg-success"
                    }`}
                  >
                    {tarea.urgencia}
                  </span>
                </td>
                <td>{tarea.responsable}</td>
                <td>
                  <span
                    className={`badge ${
                      (tarea.estado || "Pendiente") === "Terminada"
                        ? "bg-success"
                        : (tarea.estado || "Pendiente") === "En proceso"
                        ? "bg-info text-dark"
                        : "bg-secondary"
                    }`}
                  >
                    {(tarea.estado || "Pendiente") === "En proceso" ? "Revisar" : (tarea.estado || "Pendiente")}
                  </span>
                </td>
                <td>
                  <Button
                    variant="outline-warning"
                    size="sm"
                    onClick={() => abrirEditar(tarea)}
                    title="Editar tarea"
                    className="me-1"
                  >
                    <i className="bi bi-pencil"></i>
                  </Button>
                  <Button
                    variant="outline-danger"
                    size="sm"
                    onClick={() => borrarTarea(tarea._id)}
                    title="Borrar tarea"
                  >
                    <i className="bi bi-trash"></i>
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        </div>
      )}
    </>
  );
};

export default TareasTabla;
