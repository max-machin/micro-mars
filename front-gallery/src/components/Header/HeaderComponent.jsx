// Header component
import React from "react";
//intégration du css du composant
import "./HeaderStyle.css";
import reactLogo from "../../../public/micro-mars_logo.svg";

const HeaderComponent = ({ handlOpenModalConexion }) => {
  const [isConnectd, setIsConnected] = React.useState(false);

  return (
    <header id="headerApp">
      <div>
        <a href="#" target="_blank">
          <img src={reactLogo} id="logo-header" alt="React logo" />
        </a>
        <span>Mirco Mars</span>
      </div>
      <div>
        {!isConnectd ? (
          <>
            <button onClick={(e) => handlOpenModalConexion(e)}>
              Connexion
            </button>
          </>
        ) : (
          <>
            <button>Mon compte</button>
            <button>Déconnexion</button>
          </>
        )}
      </div>
    </header>
  );
};

export default HeaderComponent;
