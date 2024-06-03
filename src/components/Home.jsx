import { useNavigate } from "react-router-dom";
import { useState } from "react";
import "./home.css";
import { usePermission } from "../context/PermissionContext";

function generateRoomId() {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  for (let i = 0; i < 4; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
}

const Home = () => {
  const [code, setCode] = useState("");
  const navigate = useNavigate();
  const { permission, togglePermission } = usePermission();

  function handleCheckboxChange(event) {
    togglePermission(event.target.checked);
  }

  const redirect = () => {
    navigate(`/documents/${generateRoomId()}`);
  };

  return (
    <div className="home-container">
      <header className="navigation">
        <h1 className="title">Sync</h1>
        <h3 className="subtitle">The Rhythm Of Productivity</h3>
      </header>
      <main className="main-container">
        <section className="section section-one">
          <h2 className="section-title">Enter Your 4 digit code to sync in...</h2>
          <div className="input-group">
            <input
              type="text"
              placeholder="Enter code..."
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="input-code"
              maxLength={4}
              required
            />
            <button
              onClick={() => {
                if (code) navigate(`/documents/${code}`);
                else alert("Enter 4 digit code");
              }}
              className="btn"
            >
              Go
            </button>
          </div>
        </section>
        <section className="section section-two">
          <div className="text-group">
            <h2><span>Connect.</span> Share. Create</h2>
            <h2>Write better, together. <span>AI</span> at your fingertips</h2>
            <h2>Your space. Your rules. Your best <span>work</span></h2>
          </div>
          <div className="create-room">
            <h2 className="para">Create a sync room</h2>
            <button onClick={redirect} className="btn2" style={{
              marginTop:'0.5rem',
            }}>Create</button>
            <div className="permission-group">
              <input
                type="checkbox"
                checked={permission === false ? false : true}
                onChange={handleCheckboxChange}
              />
              <label>Allow everyone to edit this document</label>
            </div>
          </div>
        </section>
      </main>
      <footer>
        <a href="https://twitter.com/ParekhDivy">Created by - Divy Parekh</a>
      </footer>
    </div>
  );
};

export default Home;
