import { Table, Button } from "react-bootstrap";

const UsuariosTabla = ({ usuarios, borrarUsuario, abrirEditar }) => {
  return (
    <>
      <div className="tareas-scroll">
        <Table striped bordered hover className="tareas-tabla">
          <thead className="table-dark">
            <tr>
              <th>Nombre</th>
              <th>Rol</th>
              <th>Contraseña</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Superadministrador</td>
              <td>
                <span className="badge bg-warning text-dark">
                  Superadmin
                </span>
              </td>
              <td>lep1</td>
              <td></td>
            </tr>
            {usuarios.map((usuario) => (
              <tr key={usuario._id}>
                <td>{usuario.nombre}</td>
                <td>
                  <span
                    className={`badge ${
                      usuario.rol === "Admin"
                        ? "bg-danger"
                        : "bg-info text-dark"
                    }`}
                  >
                    {usuario.rol}
                  </span>
                </td>
                <td>{usuario.contraseña}</td>
                <td>
                  <Button
                    variant="outline-warning"
                    size="sm"
                    onClick={() => abrirEditar(usuario)}
                    title="Editar usuario"
                    className="me-1"
                  >
                    <i className="bi bi-pencil"></i>
                  </Button>
                  <Button
                    variant="outline-danger"
                    size="sm"
                    onClick={() => borrarUsuario(usuario._id)}
                    title="Borrar usuario"
                  >
                    <i className="bi bi-trash"></i>
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </>
  );
};

export default UsuariosTabla;
