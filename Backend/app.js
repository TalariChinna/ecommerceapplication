const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const bcrypt = require("bcrypt");
const { da } = require("date-fns/locale");
const jwt = require("jsonwebtoken");
const app = express();

app.use(express.json());
app.use(cors());

const connection = mysql.createConnection({
  host:"localhost",
  user:"root",
  password:"123j1a0314@P",
  database:"chinni"
}
);


app.post("/register", async (request,response) => {
  const {userName,email,password,gender} = request.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  console.log(hashedPassword);
  const checkUser = `SELECT * FROM users WHERE email = '${email}'`;
  connection.query(checkUser,(err,data)=>{
    if(err){console.log(err)}
    else{
      const queryData = data;
      console.log(queryData)
      if (queryData.length === 0){
        const sql1 =  `insert into users (user_name,email,gender,password) values('${userName}','${email}','${gender}','${hashedPassword}')`;
        connection.query(sql1,(err,data) => {
          if(err){console.log(err)}
          else{
            response.send(data)
            console.log(data)
            console.log("user created")
          }
        })
      }
      else{
        response.status(400);
        response.send({"msg":"User email already exists"})
        console.log(queryData)
        console.log(email)
        console.log('User email already exists')
      }
    }
  })
});
  
app.post("/login", (request,response) =>{
  const {userEmail,password} = request.body;
  console.log(request.body)
  const userQuery = `SELECT * FROM users WHERE email = '${userEmail}'`;
  connection.query(userQuery,async(err,data)=>{
    if (err) throw err
    if(data.length === 0){
      console.log("Invalid Email")
      response.status(400);
      return response.json("Invalid Email")
    }
    else{
      const isPasswordValid = await bcrypt.compare(password , data[0].password)
      if(isPasswordValid===true){
        const payload = {
          userEmail :userEmail
        }
        const jwtToken = jwt.sign(payload,"MY_SECRET_TOKEN")
        response.send({jwtToken})
      }
      else{
        console.log("Invalid Password")
        response.status(400);
        return response.json("Invalid Password")
      }
    }
  })
})

app.get("/products", (request,response)=>{
  const {subCategory,brand,discount,limit,offset,order_by,order,rating} = request.query;
  const split_of_elements = subCategory.split(",") 
 
  if(subCategory.length < 1){
    const productList =  `select * from product_details where (sub_category like "%${subCategory}%" && brand like '%${brand}%' && (average_rating>=${rating}) && discount>=${discount}) order by ${order_by} ${order} limit ${limit} offset ${offset};`;
    connection.query(productList ,(err,data)=>{
    if (err) throw err
    else{
      let dataObjet = {data}
      const productCategory = `select distinct(sub_category) from product_details`;
      connection.query(productCategory ,(err,categoryData)=>{
        if (err) throw err
          let subcategoryArry = []
          categoryData.map(each =>{ subcategoryArry.push(each.sub_category)});
          dataObjet["categoryData"] =subcategoryArry;
          response.json(dataObjet)
      })
    }
  })
  }else{
    const productList =  `select * from product_details where (((sub_category = "${split_of_elements[0]}") || (sub_category = "${split_of_elements[1]}") || (sub_category = "${split_of_elements[2]}") || (sub_category = "${split_of_elements[3]}") || (sub_category = "${split_of_elements[4]}")) && brand like '%${brand}%' && (average_rating>=${rating}) && discount>=${discount}) order by ${order_by} ${order} limit ${limit} offset ${offset};`;
    connection.query(productList ,(err,data)=>{
    if (err) throw err
    else{
      let dataObjet = {data}
      const productCategory = `select distinct(sub_category) from product_details`;
      connection.query(productCategory ,(err,categoryData)=>{
        if (err) throw err
          let subcategoryArry = []
          categoryData.map(each =>{ subcategoryArry.push(each.sub_category)});
          dataObjet["categoryData"] =subcategoryArry;
          response.json(dataObjet)
      })
    }
  })
  }
  
})

app.get("/products/:product_id/",(request,response)=>{
  const {product_id} = request.params;
  console.log(request.params)
  const productItem = `select * from product_details where product_id = '${product_id}'`;
  connection.query(productItem , (err,data)=>{
    if (err) throw err
    else{
      let productDetailsData = {data}
      const similarProducts = `select * from product_details where product_id > '${product_id}' limit 10`;
      connection.query(similarProducts , (err,data) =>{
        if (err) throw err
        else{
          let newProductArray = []
          data.map(each => newProductArray.push(each))
          productDetailsData["similarProducts"] = newProductArray
          response.json(productDetailsData)
        }
      }) 
    }
  })
})

app.listen(9000);