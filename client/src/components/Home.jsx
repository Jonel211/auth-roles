import { useState, useEffect } from "react";
import UserService from "../services/user.service";

const Home = () => {
  const [content, setContent] = useState("");

  useEffect(() => {
    UserService.getPublicContent().then(
      (response) => {
        setContent(response.data);
      },
      (error) => {
        const _content =
          (error.response && error.response.data) ||
          error.message ||
          error.toString();

        setContent(_content);
      }
    );
  }, []);

  return (
    <div className="container">
      <div className="jumbotron" style={{ textAlign: "center", padding: "40px 20px" }}>
        <h1 style={{ marginBottom: "20px" }}>Bienvenido a MiApp</h1>

        <img
          src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&auto=format&fit=crop&q=80"
          alt="Bienvenido a MiApp"
          style={{
            maxWidth: "100%",
            height: "auto",
            borderRadius: "12px",
            marginBottom: "25px",
            boxShadow: "0 4px 15px rgba(0,0,0,0.15)"
          }}
        />

        <h3>{content}</h3>
      </div>
    </div>
  );
};

export default Home;