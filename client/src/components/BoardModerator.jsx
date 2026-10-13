import { useState, useEffect } from "react";
import UserService from "../services/user.service";

const BoardModerator = () => {
  const [content, setContent] = useState("");

  useEffect(() => {
    UserService.getModeratorBoard().then(
      (response) => {
        setContent(response.data);
      },
      (error) => {
        const _content =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();

        setContent(_content);
      }
    );
  }, []);

  return (
    <div className="container">
      <div className="jumbotron" style={{ textAlign: "center", padding: "40px 20px" }}>
        <h1 style={{ marginBottom: "20px" }}>Panel de Moderador</h1>

        <img
          src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&auto=format&fit=crop&q=80"
          alt="Panel de Moderador"
          style={{
            maxWidth: "100%",
            height: "auto",
            borderRadius: "12px",
            marginBottom: "25px",
            boxShadow: "0 4px 15px rgba(0,0,0,0.15)"
          }}
        />

        <p style={{ fontSize: "1.1rem", marginBottom: "15px" }}>
          Bienvenido al panel de moderación. Desde aquí puedes revisar contenido, gestionar reportes y mantener el orden de la aplicación.
        </p>

        <h3>{content}</h3>
      </div>
    </div>
  );
};

export default BoardModerator;