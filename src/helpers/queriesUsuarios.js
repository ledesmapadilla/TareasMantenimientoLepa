const API_USUARIOS = "http://localhost:3000/api/usuarios";

export const listarUsuarios = async () => {
  try {
    const respuesta = await fetch(API_USUARIOS);
    return respuesta;
  } catch (error) {
    console.error("Error al listar usuarios:", error);
    return null;
  }
};

export const obtenerUsuario = async (id) => {
  try {
    const respuesta = await fetch(`${API_USUARIOS}/${id}`);
    return respuesta;
  } catch (error) {
    console.error("Error al obtener usuario:", error);
    return null;
  }
};

export const crearUsuario = async (usuario) => {
  try {
    const respuesta = await fetch(API_USUARIOS, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(usuario),
    });
    return respuesta;
  } catch (error) {
    console.error("Error al crear usuario:", error);
    return null;
  }
};

export const editarUsuario = async (id, usuario) => {
  try {
    const respuesta = await fetch(`${API_USUARIOS}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(usuario),
    });
    return respuesta;
  } catch (error) {
    console.error("Error al editar usuario:", error);
    return null;
  }
};

export const borrarUsuario = async (id) => {
  try {
    const respuesta = await fetch(`${API_USUARIOS}/${id}`, {
      method: "DELETE",
    });
    return respuesta;
  } catch (error) {
    console.error("Error al borrar usuario:", error);
    return null;
  }
};
