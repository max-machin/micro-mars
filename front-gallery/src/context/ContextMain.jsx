/**
 * Création d'un context général pour la gestion du panier l'authenticaiton
 * et le système de paiement
 */
import { createContext, useMemo, useState } from "react";
//Création d'un service pour gérer les appels à l'API de produits
import apiClient from "../axios-manager/apiClient";

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

  const getProducts = () => {
    return orderProducts;
  };

  const handleCreateOrder = async () => {
      let productFormatterArray = {
        userAuth: {},
        productsOrder: []
      }
      orderProducts.map((item) => {
        let productFormat = {
          productId: item.product.product_id,
          quantity: item.nbProduct
        }
        productFormatterArray.productsOrder.push(productFormat);
      })

      try {
        let test = await apiClient.post("/commands/order", 
          productFormatterArray
        )
        return test
      } catch (error) {
        throw error;
      }  
  }

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
        handleCreateOrder
      }}
    >
      {children}
    </ContextMain.Provider>
  );
};

export { ContextMain, ContextMainProvider };
