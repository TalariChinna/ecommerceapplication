import { useState,useEffect } from "react"
import { useParams } from "react-router-dom"
import {TailSpin} from 'react-loader-spinner'
import Header from "../Header"
import ProductInformation from "../ProductInformation"
import SimilarProducts from "../SimilarProducts"

import './index.css'

const apiStatusConstants = {
    initial: "INITIAL",
    success: "SUCCESS",
    failure: "FAILURE",
    inProgress: "IN_PROGRESS",
  };

const ProductItemDetails =(props) =>{
    
    const [apiResponseData , setApiResponse] = useState(
        {
            status:apiStatusConstants.initial,
            productData:null,
            similarProducts:null,
            errMsg:null,
        }
    )
    const {id} = useParams();
    
    useEffect(()=>{
        const getProductDetails = async () =>{
            
            setApiResponse({
                status:apiStatusConstants.inProgress,
                productData:null,
                similarProducts:null,
                errMsg:null,
            })

            const url = `http://localhost:9000/products/${id}`;
            const options = {
                method : "GET"
            }
            const apiResponse = await fetch(url,options)
            const apiData = await apiResponse.json()
            const updateData = apiData.data.map(each=>{
                const imageArray = each.images.split("'");
                let newImageArray = []
                imageArray.map(each=>{
                    if(each !== ', '){
                         newImageArray.push(each)
                    }
                    return newImageArray
                })
                newImageArray.pop()
                newImageArray.shift()
                const productArray = each.product_details.split(', ')
                let newProducrArray = []
                productArray.map(each => {
                    if (each.startsWith("[")){
                        let splitElement = each.split('[')
                        return newProducrArray.push(splitElement[1])
                    }else if (each.endsWith("]")){
                        let splitElement = each.split(']')
                        return newProducrArray.push(splitElement[0])
                    }else{
                        return newProducrArray.push(each)
                    }
                })
    
                return { 
                    actualPrice : each.actual_price,
                    rating : each.average_rating,
                    brand : each.brand,
                    category: each.category,
                    description : each.description,
                    images: newImageArray,
                    productDetails : newProducrArray,
                    discount : each.discount,
                    outOfStock : each.out_of_stock,
                    productId : each.product_id,
                    seller : each.seller,
                    sellingPrice : each.selling_price,
                    title : each.title
                }
            })
            const updateSimilarProducts = apiData.similarProducts.map(product => {
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

            let productObject
             
            updateData.map(each=>{return productObject=each})
        
            if(apiResponse.ok){
                setApiResponse(prevApiDetails =>({
                    ...prevApiDetails,
                    status:apiStatusConstants.success,
                    productData :productObject,
                    similarProducts:updateSimilarProducts,
                }))
            }
            else{
                setApiResponse(prevApiDetails =>({
                    ...prevApiDetails,
                    status:apiStatusConstants.failure,
                    errMsg:apiData.err_msg,  
                }))
            }
        }
        getProductDetails()
    }, [id])

    const renderLoadingView =() =>{
       return (
            <div className="load-container">
                <div>
                    <TailSpin color="black" height="50" width="50" />
                </div>
            </div>
        )
    }

    const renderSuccessView = () =>{
        const {productData ,similarProducts} = apiResponseData;
       
        return (
            <div>
                <div>
                    <ProductInformation Product={productData} key={productData.productId}  />
                </div>
                <h1>SimilarProducts</h1>
                <div>
                    <ul className="product-list-container">
                        {similarProducts.map(each => 
                            (<SimilarProducts similarItems ={each}                           
                              key ={each.id}/>
                            ))
                        }
                    </ul>            
                </div>
            </div>
        )
    }

    const renderFailureView = () => {

    }
    const renderProductDetailsSection = () =>{
        const {status} = apiResponseData;
        switch (status){
            case (apiStatusConstants.inProgress):
                return renderLoadingView()
            case (apiStatusConstants.success):
                return renderSuccessView()
            case (apiStatusConstants.failure):
                return renderFailureView ()
            default:
                return null        
        }
    }
    return(
        <>
            <Header/>
            {renderProductDetailsSection()
        }</>
    )
        
}

export default ProductItemDetails