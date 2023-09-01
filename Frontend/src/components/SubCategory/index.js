import "./index.css"
const SubCategory = props=>{

   const {categoryObject,onCategoryFilter,activeFilters} = props;
   const {categoryId,category} = categoryObject;
   
   const onCategory =()=>{
    document.getElementById(categoryId).classList.add("category-active")
    onCategoryFilter(category,categoryId)   
   }
    

   return(
    <li id={categoryId} className={activeFilters.includes(category) ? "category category-active" : "category"} onClick={onCategory}>{category}</li>
   )
}
export default SubCategory