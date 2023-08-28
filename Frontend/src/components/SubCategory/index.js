
const SubCategory = props=>{
    
   const {categoryObject,onCategoryFilter} = props;
   const {categoryId,category} = categoryObject;
   
   const onCategory =()=>{
    const activeCategory = document.getElementById(categoryId);
    activeCategory.classList.toggle("checked");
    console.log(activeCategory)
    if(activeCategory.className==="checked"){
        onCategoryFilter(category,categoryId,activeCategory)
    }   
   }
    

   return(
    <li><input id={categoryId} type="checkbox" onClick={onCategory}/>{category}</li>
   )
}
export default SubCategory