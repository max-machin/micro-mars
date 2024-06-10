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

const CardProduct = ({
  product,
  onCardClick,
  isDetail = false,
  elementStyle = {},
}) => {
  const cardRef = React.useRef(null);
  const [nbProduct, setNbProduct] = React.useState(1);

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
      onClick={(e) => {
        isDetail === false ? onCardClick(handleClick(e)) : null;
      }}
      style={elementStyle}
    >
      <img
        className={isDetail ? "img-produc-detail-open" : "img-product"}
        src={product.product_picture}
        alt="Image du produit"
      />
      <div
        className={isDetail ? "card-content-detail-open" : "card-content"}
        elementIsdetail={isDetail}
      >
        {!isDetail && (
          <>
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
          </>
        )}
      </div>
      {isDetail && (
        <>
          <div className="detail-card-open-modale">
            <img
              className="img-product-detail"
              src={product.product_picture}
              alt="Image du produit"
            />
            <div className="info-product-detail background-element">
              <div className="card-header">
                <img
                  className="img-exponent"
                  src={product.exponent_picture}
                  alt="Image de l'exposant"
                />
                <h3>{product.product_name}</h3>
              </div>
              <p>{product.desc}</p>
              <span className="product-price-detail">{product.price} €</span>
              <span className="exponent-name">
                Exposé par {product.exponent_name}
              </span>
              <div className="footer-card-detail">
                <div className="counter-product">
                  <button
                    onClick={() => {
                      if (nbProduct > 1) {
                        setNbProduct(nbProduct - 1);
                      } else {
                        setNbProduct(1);
                      }
                    }}
                    disabled={nbProduct === 1}
                    className="button-control-product"
                  >
                    -
                  </button>
                  <span>{nbProduct}</span>
                  <button
                    onClick={() => setNbProduct(nbProduct + 1)}
                    className="button-control-product"
                  >
                    +
                  </button>
                  <button className="button-add-panier">
                    Ajouter au panier
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default CardProduct;
