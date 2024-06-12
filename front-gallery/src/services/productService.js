//Création d'un service pour gérer les appels à l'API de produits
import apiClient from "../axios-manager/apiClient";

const getProductsGallery = async () => {
  try {
    const response = await apiClient.get("/products/gallery");
    return response.data;
  } catch (error) {
    throw error;
  }
};

export { getProductsGallery };
