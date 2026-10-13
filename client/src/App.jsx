import { useState, useEffect } from "react";
import { Routes, Route, Link, useNavigate, useLocation } from "react-router-dom";
import AuthService from "./services/auth.service";

import Login from "./components/Login";
import Register from "./components/Register";
import Home from "./components/Home";
import Profile from "./components/Profile";
import BoardUser from "./components/BoardUser";
import BoardModerator from "./components/BoardModerator";
import BoardAdmin from "./components/BoardAdmin";

const App = () => {
  const [currentUser, setCurrentUser] = useState(undefined);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const user = AuthService.getCurrentUser();
    if (user) {
      setCurrentUser(user);
    }
  }, []);

  // Cerrar menú móvil al cambiar de ruta
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  const isAdmin = currentUser?.roles?.includes("ROLE_ADMIN");
  const isModerator = currentUser?.roles?.includes("ROLE_MODERATOR");
  // Se muestra el panel de usuario únicamente a los usuarios con rol estándar
  const isRegularUser = Boolean(currentUser && !isAdmin && !isModerator);

  const logOut = () => {
    AuthService.logout();
    setCurrentUser(undefined);
    setIsMenuOpen(false);
    navigate("/login");
  };


  return (
    <div>
      <nav className="navbar">
        <div className="navbar-container">
          <Link to="/" className="nav-brand">
            MiApp
          </Link>

          {/* Botón Hamburguesa para Móviles */}
          <button
            className={`hamburger-btn ${isMenuOpen ? "open" : ""}`}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Alternar navegación"
          >
            <span className="hamburger-line"></span>
            <span className="hamburger-line"></span>
            <span className="hamburger-line"></span>
          </button>

          {/* Menú de enlaces responsivo */}
          <div className={`nav-links ${isMenuOpen ? "open" : ""}`}>
            <Link
              to="/home"
              className={`nav-link ${location.pathname === "/home" || location.pathname === "/" ? "active" : ""}`}
            >
              Inicio
            </Link>

            {/* Solo se muestra el panel específico del rol activo */}
            {isAdmin && (
              <Link
                to="/admin"
                className={`nav-link ${location.pathname === "/admin" ? "active" : ""}`}
              >
                Panel Administrador
              </Link>
            )}

            {isModerator && (
              <Link
                to="/mod"
                className={`nav-link ${location.pathname === "/mod" ? "active" : ""}`}
              >
                Panel Moderador
              </Link>
            )}

            {isRegularUser && (
              <Link
                to="/user"
                className={`nav-link ${location.pathname === "/user" ? "active" : ""}`}
              >
                Panel Usuario
              </Link>
            )}

            {currentUser ? (
              <>
                <Link
                  to="/profile"
                  className={`nav-link ${location.pathname === "/profile" ? "active" : ""}`}
                >
                  {currentUser.username}
                </Link>
                <button className="nav-btn-logout" onClick={logOut}>
                  Cerrar Sesión
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className={`nav-link ${location.pathname === "/login" ? "active" : ""}`}
                >
                  Iniciar Sesión
                </Link>
                <Link to="/register" className="nav-btn">
                  Registrarse
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>

      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/user" element={<BoardUser />} />
          <Route path="/mod" element={<BoardModerator />} />
          <Route path="/admin" element={<BoardAdmin />} />
        </Routes>
      </main>
    </div>
  );
};

export default App;