const API_TAREAS = `${import.meta.env.VITE_API_URL}/api/tareas`;

export const listarTareas = async () => {
  try {
    const respuesta = await fetch(API_TAREAS);
    return respuesta;
  } catch (error) {
    console.error("Error al listar tareas:", error);
    return null;
  }
};

export const obtenerTarea = async (id) => {
  try {
    const respuesta = await fetch(`${API_TAREAS}/${id}`);
    return respuesta;
  } catch (error) {
    console.error("Error al obtener tarea:", error);
    return null;
  }
};

export const crearTarea = async (tarea) => {
  try {
    const respuesta = await fetch(API_TAREAS, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(tarea),
    });
    return respuesta;
  } catch (error) {
    console.error("Error al crear tarea:", error);
    return null;
  }
};

export const editarTarea = async (id, tarea) => {
  try {
    const respuesta = await fetch(`${API_TAREAS}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(tarea),
    });
    return respuesta;
  } catch (error) {
    console.error("Error al editar tarea:", error);
    return null;
  }
};

export const borrarTarea = async (id) => {
  try {
    const respuesta = await fetch(`${API_TAREAS}/${id}`, {
      method: "DELETE",
    });
    return respuesta;
  } catch (error) {
    console.error("Error al borrar tarea:", error);
    return null;
  }
};
