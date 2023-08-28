import { useState } from "react"

const Pagination = (props) => {
    
    const {allProducts} = props
    console.log(allProducts)
    const pages = []
    const [itemsPerPage,setItemsPerPage] = useState(10);

    for( let i=1; i <= Math.ceil(allProducts.length/itemsPerPage); i++ ) {
        pages.push(i);
    }
    console.log(pages)
    /*const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const productsPerPage = productsList.slice(indexOfFirstItem,indexOfLastItem)
    this.setState({currentItems:productsPerPage})
    console.log(currentItems)*/
    return(
        <div>

        </div>
    )
}
export default Pagination