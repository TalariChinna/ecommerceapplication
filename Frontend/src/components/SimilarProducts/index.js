
import { Link } from "react-router-dom";

import "./index.css"

const SimilarProducts = (props) => {
    
    const {similarItems} = props
    const {title,actualPrice,id,rating,sellingPrice,brand,discount,images} = similarItems;

    return(

        <Link to={`/products/${id}`} className="link-item">
            <li className="list-container" >
                <div className="image-container">
                    <img className="image" src={images} alt="productimage"/>
                </div>    
                <div className="details-container">
                    <h1 className="brand-heading">{brand}</h1>
                    <p className="title">{title}</p>
                    <div className="price-container">
                        <p className="selling-price">Rs :{sellingPrice}</p>
                        <p className="actual-price">Rs :{actualPrice}</p>
                        <p className="discount">{discount}</p>
                    </div>
                    <p className="rating">Rating:{rating}</p>
                </div>
            </li>
        </Link>
    )
}
export default SimilarProducts