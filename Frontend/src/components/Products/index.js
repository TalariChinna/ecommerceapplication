import { Component } from "react"
import Header from "../Header"
import ProductsList from '../ProductsList'

import SubCategory from "../SubCategory"
import Discount from '../Discount'
import Rating from "../Rating"
import Pagination from "../Pagination"
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

 

class Products extends Component {

    state = {apiStatus:apiStatusConstants.initial,productsList:[],subCategory:[],rating:3,discount:25,
        brand:'',order_by:'item_id',order:'asc',limit:40,offset:0
    }

    componentDidMount(){
        this.getProducts()
    }

    onRatingClick =(rating) =>{   
        this.setState({rating:rating})
    }
    
    onDiscount = (id)=>{
       
        this.setState({discount:id});
    }
    
    onCategoryFilter = (category)=>{
        
        const {subCategory} = this.state;
        const checkCategory = subCategory.includes(category)
        
        if (checkCategory !== true){
            const updateCategory = [...subCategory,category]
            this.setState({subCategory:updateCategory})
        }
    }
    
    filtersApply=()=>{
        this.getProducts()
    }

    clearfilters=()=>{
       
        this.setState({
            subCategory:"",rating:3,activeId:''},this.getProducts);
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

    renderFilterSection = () =>(
        <div className="filter-section">
            <h1>Filters</h1>
            <button onClick={this.filtersApply}>Apply Filters</button>
            <button onClick={this.clearfilters}>Clear Filters</button>
            <hr/>
            <h1>SubCategory</h1>
            <ul>
                {categoryList.map(each=>(<SubCategory categoryObject={each} 
                 onCategoryFilter={this.onCategoryFilter} key={each.categoryId}/>))}
            </ul>
            <h1>Discount</h1>
            <ul>{discountList.map(eachList=> ( 
                    <Discount 
                        DiscountItem={eachList}
                        key={eachList.discountId} 
                        onDiscount={this.onDiscount}
                    />))}
            </ul>
            <h1>
                Customer Ratings
            </h1>
            <ul>
                {ratingList.map(eachList =>(    
                    <Rating 
                        RatingItem={eachList}
                        key={eachList.ratingId}
                        onRatingClick = {this.onRatingClick}
                        clearfilters = {this.clearfilters}
                    />))
                }
            </ul>
            <ul>
                {ratingList.map(ratingObject=>
                    (<li className="rating-button" key={ratingObject.ratingId} onClick={this.onRatingClickNew}>
                        {ratingObject.rating}</li>))}
            </ul>
        </div>
    )

   renderFewMoreProducts =(id) =>{
    this.setState({currentPage:id})
   }
    
    renderProducts = () => { 
        const{productsList} = this.state;
        return ( 
            <div>
                <Header/>
                <div className="products-filter-section">
                    {this.renderFilterSection()}
                    <div className="products-section">
                        <ul className="product-list-container">
                            {productsList.map((eachProduct) => (<ProductsList productItem={eachProduct} key={eachProduct.id}/>))}
                        </ul>
                        <div>
                            <Pagination allProducts = {productsList}/>
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