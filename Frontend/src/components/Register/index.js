import {Component} from 'react'

import Cookies from 'js-cookie';
import{Navigate} from 'react-router-dom'
import { FaEye,FaEyeSlash } from "react-icons/fa";

import './index.css'


class Register extends Component {
    
    state = {userName : "",email:"",password:"",gender:"",passwordLengthCheck:false,
                userNameErr:false,emailErr:false,genderErr:false,passwordErr:false,fieldType:"password",navigateTOLogin:false
    };
    
    onSubmitSuccess = () => {
        this.setState({navigateTOLogin:true})
        
    }

    onChangeName = (event) => {
        this.setState ({
            userName: event.target.value
        })
    }

    onChangeGender = (event) => {
        this.setState ({
            gender: event.target.value
        })
    }

    onChangeEmail = (event) => {
        this.setState ({
            email: event.target.value
        })
    }

    onChangePassword = (event) => {
        this.setState ({
            password: event.target.value
        })    
    }

    showPassword = () => {
        this.setState({fieldType:"text"})
    }

    hidePassword = ()=>{this.setState({fieldType:"password"})}

    submitForm = async event =>{
        event.preventDefault()
        const {userName,email,password,gender} = this.state;
        const userDetails = {userName,email,password,gender}
        console.log(userDetails);
        const url = "http://localhost:9000/register" 
        const options = {
            method:"POST",
            headers:{
                "Content-type":"application/json"
            },
            body:JSON.stringify(userDetails)
        }
        if (userName !=="" && email !== ""  && gender!== "" && password !== "" && password.length > 8){
            let apiResponse = await fetch(url,options);
            let data = await apiResponse.json();
            console.log(data) 
            console.log(apiResponse.ok)
            if (apiResponse.ok === true){
                this.onSubmitSuccess()
            }
        }
        else{
            console.log("api not called");
        }
        console.log(password.length)
        
        if (password.length < 8 && password.length !== 0){
            this.setState({passwordLengthCheck:true})
        }
        else{
            this.setState({passwordLengthCheck:false})
        }
        if (userDetails.userName===""){
                this.setState({userNameErr:true})
        }else {
            this.setState({userNameErr:false})
        }
        if (userDetails.email===""){
            this.setState({emailErr:true})
        }else {
            this.setState({emailErr:false})
        }
        if (userDetails.gender===""){
            this.setState({genderErr:true})
        }else {
            this.setState({genderErr:false})
        }if (userDetails.password===""){
            this.setState({passwordErr:true})
        }else {
        this.setState({passwordErr:false})
        }
    }

    render(){
        const {userName,email,password,gender,userNameErr,emailErr,genderErr,
                passwordErr,passwordLengthCheck,fieldType,navigateTOLogin} = this.state
        console.log(navigateTOLogin)
        const checkToken = Cookies.get("AccessToken")
        if (checkToken !== undefined){
            console.log(checkToken)
            return <Navigate to="/"/>
        }        

        return( (navigateTOLogin ? <Navigate to='/login'/> : ( 
                <div className='register-form-container'>
                    <form className='form-container' onSubmit={this.submitForm}>
                        <div className='input-items'>
                            <label className='input-label' htmlFor="name">Name</label>
                            <input className='input-filed' id="name" type="text" value={userName} 
                                onChange={this.onChangeName}
                                placeholder ="Enter Your Name"
                            /> 
                            {userNameErr && <p className='err-msg'>Please enter user name</p>}  
                        </div>
                        <div className='input-items'>
                            <label className='input-label' htmlFor="gender">Gender</label>
                            <input className='input-filed'  id="gender" type='text' value={gender} 
                                onChange={this.onChangeGender}
                                placeholder ="Your Gender"
                            />
                            {genderErr && <p className='err-msg'>Please mention your gender</p>}        
                        </div>
                        <div className='input-items'>
                            <label className='input-label' htmlFor="email">Email</label>
                            <input className='input-filed'  id="email" type="email" value={email}  
                                onChange={this.onChangeEmail}
                                placeholder ="Enter Your Email"
                            />    
                            {emailErr && <p className='err-msg'>Please enter email</p>}    
                        </div>
                        <div className='input-items'>
                            <label className='input-label' htmlFor="password">Password</label>
                            <div className='password-contaniner'>
                                <input className='password-field' id="password" type={fieldType} value={password} 
                                    onChange={this.onChangePassword}
                                    placeholder ="Enter Your Password"
                                />
                                { fieldType === "password" ? <i className='eye-icon' onClick={this.showPassword}>< FaEye/></i> :
                                <i className='eye-icon' onClick={this.hidePassword}><FaEyeSlash  /></i>}
                            </div>     
                            {passwordErr && <p className='err-msg'>Please provide password</p>} 
                            { passwordLengthCheck && <p className='err-msg'>password should be more than 8 characters </p> }    
                        </div>
                        <button type="submit" className='register-button'>Register</button>
                    </form>
                </div>   
            ))
        )
    }
}

export default Register