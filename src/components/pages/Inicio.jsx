import { Container, Card } from "react-bootstrap";
import { Link } from "react-router-dom";

const tarjetas = [
  { nombre: "Tareas Zamorano", ruta: "/zamorano" },
  { nombre: "Tareas Nelson", ruta: "/nelson" },
  { nombre: "Tareas Mauricio", ruta: "/mauricio" },
];

const Inicio = () => {
  return (
    <div className="d-flex justify-content-center inicio-wrapper">
      <div className="inicio-cards">
        {tarjetas.map((t) => (
          <Card
            key={t.ruta}
            as={Link}
            to={t.ruta}
            className="mb-2 text-center text-decoration-none"
            text="light"
            style={{ backgroundColor: "#2a2a2a", border: "1px solid #444" }}
          >
            <Card.Body className="inicio-card-body">
              <Card.Title className="mb-0 inicio-card-title">{t.nombre}</Card.Title>
            </Card.Body>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Inicio;
