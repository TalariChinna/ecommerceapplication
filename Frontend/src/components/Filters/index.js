import './index.css'

const Filters = props => {

    const renderCategoryFilter =() =>{
        const {categoryList} = props;

        return categoryList.map(category =>{
            const {onCategoryFilter,activeCategoryId} = props
            const onClickCategory = () => onCategoryFilter(category.category)
            const categoryClassName = activeCategoryId === category.category ? 'category-item active-category' : 'category-item'
            return(
                <li className={categoryClassName} key ={category.categoryId} onClick={onClickCategory}>{category.category}</li>
            )
        })
    }

    const renderCategoryFilterList =()=>{
        <div>
            <h1>Category</h1>
            <ul>{renderCategoryFilter()}</ul>
        </div>
    }
    return(
        <div>
            {renderCategoryFilterList()}
        </div>
    )
}

export default Filters