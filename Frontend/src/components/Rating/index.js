import './index.css'

const Rating = props =>{
    const {RatingItem,onRatingClick} = props;
    const {rating,ratingId} = RatingItem
    
    const onRatingItem = () => {
        document.getElementById(ratingId).classList.add("active-rating-filter");
        onRatingClick(rating) 
    }
    return(
        <li className="rating-list"><button className="rating-button" id= {ratingId} onClick={onRatingItem}>{rating}</button></li>
    )
}
export default Rating