import "./index.css"
const Discount = props =>{
    
    const {DiscountItem,onDiscount,activeFilters} = props;
    const {discountId,discount} = DiscountItem;
    
    const onDiscountFilter = ()=>{
        onDiscount(discountId) 
    }

    return(
        <li id={discountId} 
        className={(activeFilters.includes(discountId)) ? "rating-list active-rating" : "rating-list"} 
        onClick={onDiscountFilter}>{discount}</li>
    )
}

export default Discount