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
  const [user, setUser] = useState({});

  const getUserInfo = () => {
    return user;
  };

  const setUserInfo = (userInfo) => {
    return setUser(userInfo);
  };

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

  const getProducts = () => {
    return orderProducts;
  };

  const addQuantityOfProduct = (product) => {
    console.log("ADD QUANTITY OF PRODUCT", product);
    const findElement = orderProducts.find((el) => el.product === product);
    if (findElement) {
      const productToReplace = {
        ...findElement,
        nbProduct: findElement.nbProduct + 1,
      };
      setOrderProducts((prevState) =>
        prevState.map((el) =>
          el.product.product_id === product.product_id ? productToReplace : el
        )
      );
    }
  };

  const removeQuantityOfProduct = (product) => {
    console.log("REMOVE QUANTITY OF PRODUCT", product);
    const findElement = orderProducts.find((el) => el.product === product);
    if (findElement && findElement.nbProduct > 1) {
      const productToReplace = {
        ...findElement,
        nbProduct: findElement.nbProduct - 1,
      };
      setOrderProducts((prevState) =>
        prevState.map((el) =>
          el.product.product_id === product.product_id ? productToReplace : el
        )
      );
    }
  };

  const getNbProducts = () => {
    return orderProducts.length;
  };

  const removeProductToOrder = (product) => {
    console.log("REMOVE PRODUCT TO ORDER", product);
    setOrderProducts((prevState) =>
      prevState.filter((el) => el.product !== product)
    );
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

  const getTotalPrice = () => {
    return orderProducts.reduce(
      (acc, el) => acc + el.product.price * el.nbProduct,
      0
    );
  };

  return (
    <ContextMain.Provider
      value={{
        orderProducts,
        getProducts,
        addProductToOrder,
        addQuantityOfProduct,
        removeQuantityOfProduct,
        removeProductToOrder,
        clearOrder,
        getTotalPrice,
        isAuthenticated,
        login,
        logout,
        isPayment,
        payment,
        resetPayment,
        getNbProducts,
        getUserInfo,
        setUserInfo,
      }}
    >
      {children}
    </ContextMain.Provider>
  );
};

export { ContextMain, ContextMainProvider };
