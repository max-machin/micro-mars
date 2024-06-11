/**
 * Création d'un context général pour la gestion du panier l'authenticaiton
 * et le système de paiement
 */
import { createContext, useMemo, useState } from "react";

const ContextMain = createContext();

const ContextMainProvider = ({ children }) => {
  const [orderProducts, setOrderProducts] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isPayment, setIsPayment] = useState(false);

  const addProductToOrder = (product, nbProduct) => {
    const productIsInOrder = orderProducts.find(
      (el) => el.product.product_id === product.product_id
    );
    if (productIsInOrder) {
      //on prépare le produit à replacer dans le tableau
      const productToReplace = {
        ...productIsInOrder,
        nbProduct: productIsInOrder.nbProduct + nbProduct,
      };
      //on remplace le produit dans le tableau
      setOrderProducts((prevState) =>
        prevState.map((el) =>
          el.product.product_id === product.product_id ? productToReplace : el
        )
      );
    } else {
      //on ajoute le produit au tableau
      setOrderProducts((prevState) => [...prevState, { product, nbProduct }]);
    }
  };

  const getNbProducts = () => {
    return orderProducts.length;
  };

  const removeProductToOrder = (product) => {
    setOrderProducts((prevState) => prevState.filter((el) => el !== product));
  };

  const clearOrder = () => {
    setOrderProducts([]);
  };

  const login = () => {
    setIsAuthenticated(true);
  };

  const logout = () => {
    setIsAuthenticated(false);
  };

  const payment = () => {
    setIsPayment(true);
  };

  const resetPayment = () => {
    setIsPayment(false);
  };

  return (
    <ContextMain.Provider
      value={{
        orderProducts,
        addProductToOrder,
        removeProductToOrder,
        clearOrder,
        isAuthenticated,
        login,
        logout,
        isPayment,
        payment,
        resetPayment,
        getNbProducts,
      }}
    >
      {children}
    </ContextMain.Provider>
  );
};

export { ContextMain, ContextMainProvider };
