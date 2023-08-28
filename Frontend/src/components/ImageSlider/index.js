import "./index.css"

const ImageSlider = (props) => {
   const{imageSliderObject,getImageToShow} = props;
   const {image,imageId} = imageSliderObject;

   const showImageBig = () => {
    getImageToShow(imageId)
   }
    return(
        <img src={image} className="small-image" onClick={showImageBig} alt="productImage"/>  
    )
}
export default ImageSlider