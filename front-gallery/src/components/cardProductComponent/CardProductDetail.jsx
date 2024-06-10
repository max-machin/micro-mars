// création du composant cardProduct
import React from 'react';
//intégration du css du composant
import './cardproduct.css';
import * as mockProducts from '../../mocks/mockProducts';

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

const CardProductDetail = ({ product, onCardClick, isDetail = false, elementStyle = {}}) => {
    const cardRef = React.useRef(null);
    const [elementProduct, setElementProduct] = React.useState(product);
    const [nbProduct, setNbProduct] = React.useState(1);
    const [exponentProducts, setExponentProducts] = React.useState([])
    const [exponentName, setExponentName] = React.useState(product.exponent_name)

    React.useEffect(() => {
        setExponentProducts(mockProducts.dataProduct.filter((product) => product.exponent_name === exponentName))
    }, [exponentName])


    const handleClick = (e) => {
        // Récupérer la position de la card par rapport à la fenêtre
        const rect = cardRef.current.getBoundingClientRect();
        //on récupère la position absolut de l'élément par rapport à toute la page
        const x = rect.left 
        const y = rect.top 
        return{
            position : {
            x,
            y,
            elementWidth: rect.width,
            elementHeight: rect.height },
            product
        };
    };


    return (    
        <div className="card background-element" ref={cardRef} onClick={(e) => {isDetail === false ? onCardClick(handleClick(e)) : null}} style={elementStyle} >
            {isDetail && 
            <>
                    <div className="detail-card-open-modale">
                        <img className= "img-product-detail" src={elementProduct.product_picture} alt="Image du produit" />
                        <div className="info-product-detail background-element">
                            <div className = "card-header">
                                <img className="img-exponent" src={elementProduct.exponent_picture} alt="Image de l'exposant" />
                                <h3>{elementProduct.product_name}</h3>
                            </div>
                            <p>{elementProduct.desc}</p>
                            <span className='product-price-detail'>{elementProduct.price} €</span>
                            <span className="exponent-name">Exposé par {elementProduct.exponent_name}</span>
                            <div className="footer-card-detail">
                                <div className="counter-product">
                                    <button onClick={() => {if(nbProduct > 1){setNbProduct(nbProduct - 1)} else {setNbProduct(1)}}}
                                    disabled={nbProduct === 1}
                                    className="button-control-product"
                                    >-</button>
                                    <span>{nbProduct}</span>
                                    <button onClick={() => setNbProduct(nbProduct + 1)}
                                    className="button-control-product"
                                    >+</button>
                                   <button className="button-add-panier">Ajouter au panier</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <hr />
                    <h4>Autres produits de l'exposant</h4>
                    <div className="exponent-products">
                        {exponentProducts.map((product, index) => (
                            <div key={index} className="product-exponent"
                            onClick={() => {
                                setNbProduct(1)
                                setElementProduct(product)}}
                            >
                                <img src={product.product_picture} alt="Image du produit" />
                               <div className="product-exponent-footer">
                                    <span>{product.product_name}</span>
                                    <span>{product.price} €</span></div> 
                                </div>
                        ))}
                    </div>
            </>
            }
        </div>
    );
}




export default CardProductDetail;
