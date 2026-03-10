import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Container, Button } from "react-bootstrap";
import Swal from "sweetalert2";
import {
  listarTareas,
  obtenerTarea,
  crearTarea,
  editarTarea as editarTareaAPI,
  borrarTarea as borrarTareaAPI,
} from "../../helpers/queriesTareas.js";
import TareasModal from "./tareas/TareasModal";
import TareasTabla from "./tareas/TareasTabla";
import DetalleModal from "./tareas/DetalleModal";
import "../../styles/tareas.css";

const hoy = () => new Date().toISOString().split("T")[0];

const valoresIniciales = {
  fecha: hoy(),
  tarea: "",
  maquina: "",
  urgencia: "",
  responsable: "",
  estado: "Pendiente",
};

const DistribucionTareas = () => {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: valoresIniciales,
    mode: "onChange",
  });

  const [tareas, setTareas] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editando, setEditando] = useState(false);
  const [tareaId, setTareaId] = useState(null);
  const [responsableOtro, setResponsableOtro] = useState(false);
  const [filtroMaquina, setFiltroMaquina] = useState("");
  const [filtroResponsable, setFiltroResponsable] = useState("");
  const [filtroEstado, setFiltroEstado] = useState("");
  const [filtroUrgencia, setFiltroUrgencia] = useState("");
  const [mostrarTerminadas, setMostrarTerminadas] = useState(false);
  const [showDetalle, setShowDetalle] = useState(false);
  const [tareaDetalle, setTareaDetalle] = useState(null);

  useEffect(() => {
    cargarTareas();
  }, []);

  const cargarTareas = async () => {
    const respuesta = await listarTareas();
    if (respuesta?.ok) {
      const data = await respuesta.json();
      setTareas(data);
    }
  };

  const cerrarModal = () => {
    setShowModal(false);
    setEditando(false);
    setTareaId(null);
    setResponsableOtro(false);
    reset({ ...valoresIniciales, fecha: hoy() });
  };

  const onSubmit = async (data) => {
    try {
      let respuesta;

      if (editando) {
        respuesta = await editarTareaAPI(tareaId, data);
      } else {
        respuesta = await crearTarea(data);
      }

      if (!respuesta.ok) {
        const errorData = await respuesta.json();
        Swal.fire({
          icon: "error",
          title: "Error",
          text: errorData.mensaje || "No se pudo guardar la tarea",
        });
        return;
      }

      const resData = await respuesta.json();

      if (editando) {
        setTareas(tareas.map((t) => (t._id === tareaId ? resData.tarea : t)));
        Swal.fire({
          icon: "success",
          title: "Tarea editada",
          timer: 2000,
          showConfirmButton: false,
        });
      } else {
        setTareas([...tareas, resData.tarea]);
        Swal.fire({
          icon: "success",
          title: "Tarea creada",
          timer: 2000,
          showConfirmButton: false,
        });
      }

      cerrarModal();
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error inesperado",
        text: "No se pudo procesar la solicitud",
      });
    }
  };

  const borrarTarea = async (id) => {
    const result = await Swal.fire({
      title: "¿Borrar tarea?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, borrar",
      cancelButtonText: "Cancelar",
      customClass: {
        popup: "swal-dark",
        confirmButton: "swal-btn-outline-danger",
        cancelButton: "swal-btn-outline-secondary",
      },
      buttonsStyling: false,
    });

    if (result.isConfirmed) {
      const respuesta = await borrarTareaAPI(id);

      if (respuesta?.ok) {
        setTareas(tareas.filter((t) => t._id !== id));

        Swal.fire({
          icon: "success",
          title: "Tarea borrada",
          timer: 2000,
          showConfirmButton: false,
        });
      }
    }
  };

  const abrirDetalle = (tarea) => {
    setTareaDetalle(tarea);
    setShowDetalle(true);
  };

  const borrarDetalle = async (id) => {
    try {
      const respuesta = await editarTareaAPI(id, { detalle: "" });
      if (respuesta.ok) {
        const resData = await respuesta.json();
        setTareas(tareas.map((t) => (t._id === id ? resData.tarea : t)));
        setShowDetalle(false);
        Swal.fire({
          icon: "success",
          title: "Detalle borrado",
          timer: 2000,
          showConfirmButton: false,
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "No se pudo borrar el detalle",
      });
    }
  };

  const guardarDetalle = async (id, detalle) => {
    try {
      const respuesta = await editarTareaAPI(id, { detalle });
      if (respuesta.ok) {
        const resData = await respuesta.json();
        setTareas(tareas.map((t) => (t._id === id ? resData.tarea : t)));
        setShowDetalle(false);
        Swal.fire({
          icon: "success",
          title: "Detalle guardado",
          timer: 2000,
          showConfirmButton: false,
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "No se pudo guardar el detalle",
      });
    }
  };

  const abrirCrear = () => {
    setEditando(false);
    setTareaId(null);
    reset({ ...valoresIniciales, fecha: hoy() });
    setResponsableOtro(false);
    setShowModal(true);
  };

  const abrirEditar = async (tareaLocal) => {
    await cargarTareas();
    const respuesta = await obtenerTarea(tareaLocal._id);
    const tarea = respuesta?.ok ? await respuesta.json() : tareaLocal;

    setEditando(true);
    setTareaId(tarea._id);

    const esResponsablePredefinido = ["Nelson", "Zamorano", "Mauricio"].includes(
      tarea.responsable
    );
    setResponsableOtro(!esResponsablePredefinido);

    reset({
      fecha: tarea.fecha,
      tarea: tarea.tarea,
      maquina: tarea.maquina,
      urgencia: tarea.urgencia,
      responsable: tarea.responsable,
      estado: tarea.estado || "Pendiente",
    });

    setShowModal(true);
  };

  return (
    <Container className="tareas-page mt-3">
      <h2 className="text-center mb-2">Tareas de Mantenimiento</h2>
      <div className="tareas-header">
        <span></span>
        <Button variant="outline-primary" onClick={abrirCrear}>
          <i className="bi bi-plus-circle me-2"></i>
          Nueva Tarea
        </Button>
      </div>

      <TareasTabla
        tareas={tareas}
        borrarTarea={borrarTarea}
        abrirEditar={abrirEditar}
        filtroMaquina={filtroMaquina}
        setFiltroMaquina={setFiltroMaquina}
        filtroResponsable={filtroResponsable}
        setFiltroResponsable={setFiltroResponsable}
        filtroEstado={filtroEstado}
        setFiltroEstado={setFiltroEstado}
        filtroUrgencia={filtroUrgencia}
        setFiltroUrgencia={setFiltroUrgencia}
        mostrarTerminadas={mostrarTerminadas}
        setMostrarTerminadas={setMostrarTerminadas}
        abrirDetalle={abrirDetalle}
      />

      <TareasModal
        show={showModal}
        onHide={cerrarModal}
        editando={editando}
        onSubmit={onSubmit}
        register={register}
        handleSubmit={handleSubmit}
        errors={errors}
        cerrarModal={cerrarModal}
        setValue={setValue}
        responsableOtro={responsableOtro}
        setResponsableOtro={setResponsableOtro}
      />
      <DetalleModal
        show={showDetalle}
        onHide={() => setShowDetalle(false)}
        tarea={tareaDetalle}
        onGuardar={guardarDetalle}
        onBorrar={borrarDetalle}
      />
    </Container>
  );
};

export default DistribucionTareas;
