import { useState } from "react";
import AuthService from "../services/auth.service";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // Por defecto, asignamos un array vacío que en el backend se convierte en "user". 
  // Permitimos que el usuario elija un rol.
  const [role, setRole] = useState("user");
  const [successful, setSuccessful] = useState(false);
  const [message, setMessage] = useState("");

  // Errores de validación
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!username) {
      newErrors.username = "¡Este campo es obligatorio!";
    } else if (username.length < 3 || username.length > 20) {
      newErrors.username = "El nombre de usuario debe tener entre 3 y 20 caracteres.";
    }

    if (!email) {
      newErrors.email = "¡Este campo es obligatorio!";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Este no es un correo electrónico válido.";
    }

    if (!password) {
      newErrors.password = "¡Este campo es obligatorio!";
    } else if (password.length < 6 || password.length > 40) {
      newErrors.password = "La contraseña debe tener entre 6 y 40 caracteres.";
    }

    return newErrors;
  };

  const handleRegister = (e) => {
    e.preventDefault();
    setMessage("");
    setSuccessful(false);

    const formErrors = validate();
    setErrors(formErrors);

    if (Object.keys(formErrors).length === 0) {
      // Enviamos el rol seleccionado como array
      const rolesArray = role ? [role] : ["user"];

      AuthService.register(username, email, password, rolesArray).then(
        (response) => {
          setMessage(response.data.message);
          setSuccessful(true);
        },
        (error) => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();

          setMessage(resMessage);
          setSuccessful(false);
        }
      );
    }
  };

  return (
    <div className="card-container">
      <div className="card">
        <h2>Registrarse</h2>
        <form onSubmit={handleRegister}>
          {!successful && (
            <>
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
                <label htmlFor="email">Correo electrónico</label>
                <input
                  type="email"
                  className="form-control"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                {errors.email && <div className="error-text">{errors.email}</div>}
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
                <label htmlFor="role">Rol</label>
                <select
                  className="form-control"
                  name="role"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                >
                  <option value="user">Usuario</option>
                  <option value="moderator">Moderador</option>
                  <option value="admin">Administrador</option>
                </select>
              </div>

              <div className="form-group">
                <button className="btn-primary">Registrarse</button>
              </div>
            </>
          )}

          {message && (
            <div className="form-group">
              <div
                className={successful ? "alert alert-success" : "alert alert-danger"}
                role="alert"
              >
                {message}
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default Register;