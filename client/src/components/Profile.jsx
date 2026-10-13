import { useState } from "react";
import AuthService from "../services/auth.service";

const Profile = () => {
  const currentUser = AuthService.getCurrentUser();
  const [copied, setCopied] = useState(false);

  if (!currentUser) {
    return (
      <div className="container">
        <div className="alert alert-danger">
          Debes iniciar sesión para ver esta página.
        </div>
      </div>
    );
  }

  // Título dinámico según el rol del usuario
  const getRoleTitle = (roles = []) => {
    if (roles.includes("ROLE_ADMIN")) return "Perfil de Administrador";
    if (roles.includes("ROLE_MODERATOR")) return "Perfil de Moderador";
    return "Perfil de Usuario";
  };

  const handleCopyToken = () => {
    if (currentUser?.accessToken) {
      navigator.clipboard.writeText(currentUser.accessToken);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="container">
      <div
        className="jumbotron"
        style={{
          textAlign: "center",
          padding: "40px 20px",
          maxWidth: "600px",
          margin: "30px auto",
        }}
      >
        {/* Imagen de perfil circular sin borde */}
        <img
          src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&h=200&fit=crop&crop=face"
          alt="Foto de perfil"
          style={{
            width: "140px",
            height: "140px",
            borderRadius: "50%",
            objectFit: "cover",
            marginBottom: "20px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
          }}
        />

        {/* Nombre de usuario */}
        <h2 style={{ marginBottom: "10px" }}>
          {currentUser.username}
        </h2>
        <p style={{ color: "#666", marginBottom: "25px" }}>
          {getRoleTitle(currentUser.roles)}
        </p>

        {/* Información del usuario ordenada */}
        <div
          style={{
            textAlign: "left",
            maxWidth: "450px",
            margin: "0 auto",
            backgroundColor: "#f8f9fa",
            padding: "20px",
            borderRadius: "10px",
            border: "1px solid #e9ecef"
          }}
        >
          <div style={{ marginBottom: "12px", display: "flex", justifyContent: "space-between", borderBottom: "1px solid #eee", paddingBottom: "8px" }}>
            <span style={{ color: "#6c757d", fontWeight: "600" }}>ID:</span>
            <span style={{ fontWeight: "600" }}>#{currentUser.id}</span>
          </div>

          <div style={{ marginBottom: "12px", display: "flex", justifyContent: "space-between", borderBottom: "1px solid #eee", paddingBottom: "8px" }}>
            <span style={{ color: "#6c757d", fontWeight: "600" }}>Correo electrónico:</span>
            <span style={{ fontWeight: "500" }}>{currentUser.email}</span>
          </div>

          <div style={{ marginTop: "15px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "6px" }}>
              <span style={{ color: "#6c757d", fontWeight: "600" }}>Token de acceso:</span>
              <button
                type="button"
                onClick={handleCopyToken}
                style={{
                  padding: "4px 10px",
                  fontSize: "0.8rem",
                  cursor: "pointer",
                  borderRadius: "5px",
                  border: "1px solid #ced4da",
                  backgroundColor: copied ? "#d4edda" : "#ffffff",
                  color: copied ? "#155724" : "#495057",
                  fontWeight: "600",
                  transition: "all 0.2s"
                }}
              >
                {copied ? "✓ Copiado" : "Copiar Token"}
              </button>
            </div>
            <div
              style={{
                backgroundColor: "#ffffff",
                padding: "10px",
                borderRadius: "6px",
                border: "1px solid #dee2e6",
                wordBreak: "break-all",
                fontSize: "0.85rem",
                fontFamily: "monospace",
                color: "#495057"
              }}
            >
              {currentUser.accessToken
                ? `${currentUser.accessToken.substring(0, 24)}...${currentUser.accessToken.substring(currentUser.accessToken.length - 24)}`
                : "No disponible"}
            </div>
          </div>

          <div style={{ marginTop: "18px" }}>
            <span style={{ color: "#6c757d", fontWeight: "600", display: "block", marginBottom: "8px" }}>
              Roles / Autoridades:
            </span>
            <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
              {currentUser.roles &&
                currentUser.roles.map((role, index) => (
                  <span
                    key={index}
                    style={{
                      backgroundColor: "#e7f1ff",
                      padding: "4px 12px",
                      borderRadius: "15px",
                      fontSize: "0.85rem",
                      fontWeight: "600"
                    }}
                  >
                    {role}
                  </span>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;