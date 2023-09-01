import { Component } from "react"
import Header from "../Header"
import ProductsList from "../ProductsList"

import SubCategory from "../SubCategory"
import Discount from "../Discount"
import Rating from "../Rating"
import {ThreeDots} from "react-loader-spinner"

import './index.css' 

const ratingList = [
    {ratingId:'1',rating:"5"},{ratingId:'2',rating:"4"},{ratingId:'3',rating:"3"}
]
const discountList=[
    {discountId:'25',discount:"25 % off & more"},{discountId:'30',discount:"30 % off & more"},{discountId:'40',discount:"40 % off & more"},
    {discountId:'50',discount:"50 % off & more"},{discountId:'60',discount:"60 % off & more"},{discountId:'70',discount:"70 % off & more"}
]
/*const brandList = [
    {brandId:"1",brand:"AXMA"},{brandId:"2",brand:"Oka"},{brandId:"3",brand:"REEB"},{brandId:"4",brand:"Zack Fo"},{brandId:"5",brand:"Shoef"}
];*/
let categoryList = [];

const apiStatusConstants = {
    initial: "INITIAL",
    success: "SUCCESS",
    failure: "FAILURE",
    inProgress: "IN_PROGRESS",
};
let currentItems ;
let pages;

class Products extends Component {

    state = {apiStatus:apiStatusConstants.initial,productsList:[],subCategory:[],rating:3,discount:25,
        brand:'',order_by:'item_id',order:'asc',currentPage:1,itemsPerPage:40,
        pageNumberLimit:10,maxPageNumberLimit:10,minPageNumberLimit:0,activeFilters:[]
    }

    componentDidMount(){
        this.getProducts()
    }

    onRatingClick =(rating) =>{ 
        const {activeFilters} = this.state  
        
        this.setState({rating:rating,activeFilters:[...activeFilters,rating]})
    }
    
    onDiscount = (discountId)=>{
       const {activeFilters} = this.state
        this.setState({discount:discountId,activeFilters:[...activeFilters,discountId]});
    }
    
    onCategoryFilter = (category)=>{
        
        const {subCategory,activeFilters} = this.state;
        const checkCategory = subCategory.includes(category)
        if (checkCategory !== true){
            const updateCategory = [...subCategory,category]
            this.setState({subCategory:updateCategory,activeFilters:[...activeFilters,category]})
        }
    }
    
    filtersApply=()=>{
        this.getProducts()
    }

    clearfilters=()=>{
       
        this.setState({
            subCategory:"",rating:3,activeFilters:[]},this.getProducts);
    }
    brandFilter = (brandList) =>{
        this.setState({brand:brandList})
    }

    getProducts = async () => {
        
        this.setState({apiStatus:apiStatusConstants.inProgress})

        const {subCategory,rating,discount,brand,order_by,order,limit,offset} = this.state;
       
        const url = `http://localhost:9000/products?subCategory=${subCategory}&brand=${brand}&discount=${discount}&rating=${rating}&order_by=${order_by}&order=${order}&limit=${limit}&offset=${offset}`;
        const options = {
            method : "Get"
        } 
        const dataFetching = await fetch(url,options)
        if(dataFetching.ok === true){
            const productsData = await dataFetching.json()
            
            const updatedData = productsData.data.map(product => {
                const oneImage =  product.images
                const newArry = oneImage.split("'")
                return{
                    title : product.title,
                    actualPrice : product.actual_price,
                    rating : product.average_rating,
                    discount: product.discount,
                    brand : product.brand,
                    images :newArry[1],
                    id : product.product_id,
                    sellingPrice: product.selling_price,
                    productId : product.item_id
                }
            })
            
            let categoryId = "categoryid" + parseInt(0);
            categoryList = productsData.categoryData.map(eachProduct=>{  
                categoryId = categoryId + 1;
                return {
                    categoryId:categoryId,
                    category:eachProduct
                }
            })
            this.setState({apiStatus:apiStatusConstants.success,productsList:updatedData});
        }else{
            this.setState({apiStatus:apiStatusConstants.failure})
        }
    }

    renderFilterSection = () =>{ 
        const{activeFilters} = this.state;
        
        return( 
        <div className="filter-section">
            <h1 className="filter">Filters</h1>
            <button onClick={this.filtersApply}>Apply Filters</button>
            <button onClick={this.clearfilters}>Clear Filters</button>
            <hr/>
            <h1 className="filter-heading">Category</h1>
            <ul className="filter-heading-list">
                {categoryList.map(each=>(<SubCategory categoryObject={each} activeFilters = {activeFilters}
                 onCategoryFilter={this.onCategoryFilter} key={each.categoryId}/>))}
            </ul>
            <h1 className="filter-heading">Discount</h1>
            <ul className="filter-heading-list">
                {discountList.map(eachList=> ( 
                    <Discount 
                        DiscountItem={eachList}
                        key={eachList.discountId} 
                        activeFilters={activeFilters}
                        onDiscount={this.onDiscount}
                    />
                    ))
                }
            </ul>
            <h1 className="filter-heading">
                Customer Ratings
            </h1>
            <ul className="filter-heading-list">
                {ratingList.map(eachList =>(    
                    <Rating 
                        RatingItem={eachList}
                        key={eachList.ratingId}
                        activeFilters={activeFilters}
                        onRatingClick = {this.onRatingClick}
                    />))
                }
            </ul>
        </div>
    )}

   renderFewMoreProducts =(id) =>{
    this.setState({currentPage:id})
   }
   
   getProductsPerPage =  async(eachPage) => {
        await this.setState({currentPage:eachPage})
       
        const{currentPage,maxPageNumberLimit,minPageNumberLimit} = this.state;
        let updateMinPageNumber
        let updateMaxPageNumber
        console.log(currentPage)
        if(currentPage >= maxPageNumberLimit){ 
            updateMaxPageNumber = maxPageNumberLimit +  5;
            updateMinPageNumber = minPageNumberLimit + 5
            this.setState({maxPageNumberLimit:updateMaxPageNumber,minPageNumberLimit:updateMinPageNumber})
        }else if(currentPage === (parseInt(minPageNumberLimit) + 1) && currentPage !== 1 ){
            updateMinPageNumber = minPageNumberLimit - 5;
            updateMaxPageNumber = minPageNumberLimit + 5
            this.setState({minPageNumberLimit:updateMinPageNumber,maxPageNumberLimit:updateMaxPageNumber})
        }
   }

    renderPagination =() =>{
        const {productsList,itemsPerPage,currentPage,maxPageNumberLimit,minPageNumberLimit} = this.state;
        
        pages = [];
         for( let i=1; i <= Math.ceil(productsList.length/itemsPerPage); i++ ) {
            pages.push(i);
        }
       
        return pages.map(eachPage=> { 
             
            if(eachPage < maxPageNumberLimit + 1 && eachPage > minPageNumberLimit){
                
                return (
                    <li id={eachPage} key={eachPage} onClick={()=>this.getProductsPerPage(eachPage)}>
                    <button className={currentPage === eachPage ? "button button-active":"button"}>{eachPage}
                    </button></li>
                    )
            } 
        });   
    }

    renderProducts = () => { 
        const{productsList,currentPage,itemsPerPage} = this.state;
        const indexOfLastItem = currentPage * itemsPerPage;
        const indexOfFirstItem = indexOfLastItem - itemsPerPage;
        currentItems = productsList.slice(indexOfFirstItem,indexOfLastItem)
        
        return ( 
            <div>
                <Header/>
                <div className="products-filter-section">
                    {this.renderFilterSection()}
                    <div className="products-section">
                        <p className="show-product-para">Showing {(currentItems.length*currentPage - currentItems.length + 1)} - {currentItems.length*currentPage} products of {productsList.length} products</p>
                        <ul className="product-list-container">
                            {currentItems.map((eachProduct) => (<ProductsList productItem={eachProduct} key={eachProduct.id}/>))}
                        </ul>
                        <p className="page-no">Page {currentPage} of {Math.ceil(productsList.length/itemsPerPage)} pages</p>
                        <div className="pagination-container">
                            <ul className="pagination"> {this.renderPagination()}</ul>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    renderLoadingView = () => ( 
        <div className="load-container">
            <div>
                <ThreeDots color="#0b69ff" height="50" width="50"/>
            </div>
        </div>
    )
    
    render (){
        const {apiStatus} =this.state;
        
        switch (apiStatus) {
            case apiStatusConstants.success:
                return this.renderProducts()
            case apiStatusConstants.inProgress:
                return this.renderLoadingView()
            case apiStatusConstants.failure:
                return this.renderFailureView()
            default:
                return null
        }
    }
}

export default Products