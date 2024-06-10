import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import * as mocks from "./mocks/mockProducts";
import CardProduct from "./components/cardProductComponent/CardProduct";
import HeaderComponent from "./components/Header/HeaderComponent";
import CardProductDetail from "./components/cardProductComponent/CardProductDetail";

function App() {
  const dataProduct = mocks.dataProduct;
  const [detailIsOpen, setDetailIsOpen] = useState(false);
  const [elementDetail, setElementDetail] = useState({});

  const onCardClick = (e) => {
    console.log(e);
    if (!detailIsOpen) {
      setDetailIsOpen(true);
    }

    setElementDetail(e);

    setTimeout(() => {
      console.log("IS in timeout");
      // On transforme le style pour l'apliquer en modale
      setElementDetail((prevState) => ({
        ...prevState,
        position: {
          ...prevState.position,
          x: "10vw",
          y: "10vh",
          elementHeight: "calc(100% - 20vh)",
          elementWidth: "calc(100% - 20vw)",
        },
      }));
    }, 133);
    // on récupère le exponent_name et on filytre tout les produits qui ont le même exponent_name
  };

  const closeModale = (e) => {
    //On s'assure que la propagation est au niveau de la modale est pas de son enfant CardProduct
    if (e.target.className === "modale-detail-product") {
      setDetailIsOpen(false);
    }
  };

  return (
    <>
      <HeaderComponent />
      <div className="hero-banner">
        <h1>Gallery</h1>
        <p>Click on the cards to see more details</p>
      </div>
      {detailIsOpen && (
        <div
          className="modale-detail-product"
          style={{
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            zIndex: 1000,
          }}
          onClick={(e) => closeModale(e)}
        >
          <CardProductDetail
            product={elementDetail.product}
            onCardClick={() => setDetailIsOpen(false)}
            isDetail={true}
            elementStyle={{
              position: "absolute",
              top: elementDetail.position.y,
              left: elementDetail.position.x,
              width: elementDetail.position.elementWidth,
              height: elementDetail.position.elementHeight,
              zIndex: 100,
              cursor: "default",
              overflow: "auto",
            }}
          />
        </div>
      )}

      <div className="cardGallery">
        {dataProduct.map((product, index) => (
          <CardProduct
            key={index}
            product={product}
            onCardClick={onCardClick}
          />
        ))}
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
}

export default App;
