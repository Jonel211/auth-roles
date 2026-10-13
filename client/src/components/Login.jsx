import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import AuthService from "../services/auth.service";

const Login = () => {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // Errores de validación
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!username) {
      newErrors.username = "¡El nombre de usuario es obligatorio!";
    }
    if (!password) {
      newErrors.password = "¡La contraseña es obligatoria!";
    }
    return newErrors;
  };

  const handleLogin = (e) => {
    e.preventDefault();
    setMessage("");

    const formErrors = validate();
    setErrors(formErrors);

    if (Object.keys(formErrors).length === 0) {
      setLoading(true);

      AuthService.login(username, password).then(
        () => {
          navigate("/profile");
          window.location.reload();
        },
        (error) => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();

          setLoading(false);
          setMessage(resMessage);
        }
      );
    }
  };

  return (
    <div className="card-container">
      <div className="card">
        <h2>Iniciar Sesión</h2>
        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label htmlFor="username">Nombre de usuario</label>
            <input
              type="text"
              className="form-control"
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            {errors.username && <div className="error-text">{errors.username}</div>}
          </div>

          <div className="form-group">
            <label htmlFor="password">Contraseña</label>
            <input
              type="password"
              className="form-control"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {errors.password && <div className="error-text">{errors.password}</div>}
          </div>

          <div className="form-group">
            <button className="btn-primary" disabled={loading}>
              {loading ? (
                <span>Cargando...</span>
              ) : (
                <span>Iniciar Sesión</span>
              )}
            </button>
          </div>

          {message && (
            <div className="form-group">
              <div className="alert alert-danger" role="alert">
                {message}
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default Login;