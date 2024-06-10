// création du composant cardProduct
import React from "react";
//intégration du css du composant
import "./cardproduct.css";

/**
 * Exemple de donnée du composant :
 * {
      "product_name": "Tomates",
      "price": 2.99,
      "desc": "Tomates fraîches de la région",
      "product_picture": "https://example.com/tomates.jpg",
      "category_id": 1,
      "category_name": "Fruits & Légumes",
      "exponent_name": "Expo Inc.",
      "exponent_picture": "https://example.com/logo_farmer_market.jpg"
    }
 */

const CardProduct = ({ product, onCardClick }) => {
  const cardRef = React.useRef(null);

  const handleClick = (e) => {
    // Récupérer la position de la card par rapport à la fenêtre
    const rect = cardRef.current.getBoundingClientRect();
    //on récupère la position absolut de l'élément par rapport à toute la page
    const x = rect.left;
    const y = rect.top;
    return {
      position: {
        x,
        y,
        elementWidth: rect.width,
        elementHeight: rect.height,
      },
      product,
    };
  };

  return (
    <div
      className="card background-element"
      ref={cardRef}
      onClick={(e) => onCardClick(handleClick(e))}
    >
      <img
        className="img-product"
        src={product.product_picture}
        alt="Image du produit"
      />
      <div className="card-content">
        <div className="card-header">
          <img
            className="img-exponent"
            src={product.exponent_picture}
            alt="Image de l'exposant"
          />
          <h3>{product.product_name}</h3>
        </div>
        <span>{product.price} €</span>
        <hr />
        <span className="exponent-name">
          Exposé par {product.exponent_name}
        </span>
      </div>
    </div>
  );
};

export default CardProduct;
