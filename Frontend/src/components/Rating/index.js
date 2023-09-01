import './index.css'

const Rating = props =>{
    const {RatingItem,onRatingClick,activeFilters} = props;
    const {rating,ratingId} = RatingItem
    
    const onRatingItem = () => {
        document.getElementById(ratingId).classList.add("active-rating-filter");
        onRatingClick(rating) 
    }
    return(
        <li className={activeFilters.includes(rating) ? "active-rating rating-list":"rating-list"} id= {ratingId} onClick={onRatingItem}>{rating} stars</li>
    )
}
export default Rating