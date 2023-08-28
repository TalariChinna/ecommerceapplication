const Discount = props =>{
    const {DiscountItem,onDiscount} = props;
    const {discountId,discount} = DiscountItem;
    const onDiscountFilter = ()=>{
        const activeDiscount = document.getElementById(discountId);
        activeDiscount.classList.toggle("Checked");
        if(activeDiscount.className==="Checked"){
            onDiscount(discountId,activeDiscount)
        }
    }
    return(
        <li><input id={discountId} type="checkbox" onClick={onDiscountFilter}/>{discount}</li>
    )
}
export default Discount