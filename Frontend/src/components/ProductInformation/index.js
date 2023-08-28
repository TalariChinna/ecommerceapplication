import ImageSlider from "../ImageSlider"
import { useState } from "react";

import "./index.css"


const ProductInformation =(props)=>{
    
    const {Product} = props;
    const {actualPrice,rating,brand,category,description,images,productDetails,discount,outOfStock,
        seller,sellingPrice,title } = Product;

    const [showIndexImage , setImageIndex] = useState(  {activeImageIndex : 0})

    let imageAvailable = [];

    let imageIndex = 0;
        images.map(eachone => {imageIndex = imageIndex +1 ;
            return imageAvailable.push({imageId:imageIndex,image:eachone})
        })
    
    const getImageToShow = (id) =>{
        let indexValue = id - 1 ;
        setImageIndex({activeImageIndex:indexValue})
    }
    const {activeImageIndex} = showIndexImage;
   
    return(
        <div className="product-details-container">
            <div className="product-image-container">
                <div className="small-image-container">
                    {imageAvailable.length > 0 && (imageAvailable.map(eachImage=>{
                        return <ImageSlider imageSliderObject={eachImage} getImageToShow={getImageToShow}  key={eachImage.imageId}/>}))}
                </div>
                
                <div className="big-image-container">
                    <img src={images[activeImageIndex]} className="big-image" alt="1"/>
                </div>
            </div>
            <div className="product-descriprion-container">
                <p className="product-title">{title}</p>
                <div className="price-container">
                    <p className="product-selling-price">Rs : {sellingPrice}</p>
                    <p className="product-actual-price">Rs : {actualPrice}</p>
                    <p className="product-discount">Discount : {discount}</p>
                </div>
                <p className="text">Rating : {rating}</p>
                <p className="text">Brand : {brand}</p>
                <p className="text">Category : {category}</p>
                <p className="text"><span className="description-span" >Description :  </span>{description}</p>
                <p className="text">{productDetails}</p>
                {outOfStock ? <p className="text">Stock : Out of stock </p> : <p className="text">Stock :Stock Available </p>}
                <p className="text">Seller Name : {seller}</p>
            </div>
        </div>
    )
}
export default ProductInformation