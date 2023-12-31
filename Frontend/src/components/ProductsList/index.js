import {BsCurrencyRupee} from "react-icons/bs";
import { Link } from "react-router-dom";

import './index.css'

const ProductsList = props =>{
    const {productItem} = props;
    const {title,actualPrice,id,rating,sellingPrice,brand,discount,images} = productItem;
    return(
        <Link to={`/products/${id}`}  className="link-item">
            <li className="list-container-small">
                <div className="image-container-small">
                    <img className="image-small" src={images} alt="productimage"/>
                </div>    
                <div className="details-container-small">
                    <h1 className="brand-heading">{brand}</h1>
                    <p className="title">{title}</p>
                    <div className="price-container">
                        <p className="selling-price"><span className="rupee-icon"><BsCurrencyRupee/></span>{sellingPrice}</p>
                        <p className="actual-price"><span className="rupee-icon"><BsCurrencyRupee/></span>{actualPrice}</p>
                        <p className="discount">{discount}</p>
                    </div>
                    <p className="rating-small">Rating:{rating}</p>
                </div>
            </li>
        </Link>
    );
};
export default ProductsList