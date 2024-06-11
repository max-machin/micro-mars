import React, { useContext } from "react";
import { ContextMain } from "../../context/ContextMain";
import "./panier.css";

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

const PanierComponent = (isOpen) => {
  const useMainContext = useContext(ContextMain);
  const [panierIsOpen, setPanierIsOpen] = React.useState(isOpen);
  const [productsPanier, setProductsPanier] = React.useState([]);
  const [totalPrice, setTotalPrice] = React.useState(0);
  const [totalProducts, setTotalProducts] = React.useState(0);
  const [isConnected, setIsConnected] = React.useState(false);

  const handlePanier = () => {
    setPanierIsOpen(!panierIsOpen);
  };

  const handleAddProduct = (product) => {
    setProductsPanier([...productsPanier, product]);
    setTotalPrice(totalPrice + product.price);
    setTotalProducts(totalProducts + 1);
  };

  const handleRemoveProduct = (product) => {
    setProductsPanier(
      productsPanier.filter((productPanier) => productPanier !== product)
    );
    setTotalPrice(totalPrice - product.price);
    setTotalProducts(totalProducts - 1);
  };

  return (
    <div className="wrapper-panier">
      <h1>Panier {useMainContext.getNbProducts()}</h1>
    </div>
  );
};

export default PanierComponent;
