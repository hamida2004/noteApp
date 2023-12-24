import React, { useState } from "react";
import styled from "styled-components";
import axios from "axios"
import { useNavigate } from "react-router-dom";
const FormAuth = styled.form`
height: 80%;
width : 400px;
display : flex;
flex-direction : column;
justify-content : center;
align-items : center;
border: lightgray solid 2px;
  border-radius: 15px;
  padding: 50px;
  color : lightgray;
  font-size :  20px;
justify-content: space-evenly;

`
const AuthButton = styled.button`
position: absolute;
top: 20px;
font-size : 16px;
  cursor: pointer;
  right: 40px;
color: lightgray ;
border : none ;
background-color : transparent;
`

const SubmitButton = styled.button`
width: 40%;
  cursor: pointer;
  border-radius: 5px;
height : fit-content;
padding:10px 20px;
display: flex;
justify-content : center;
align-items: center;
background-color: transparent;
font-size : 20px;
font-weight: bold;
color : lightgray;
margin: 20px;
border: 1.5px solid lightgray; 

`
const Ainput = styled.input`
outline : none;
background : none;
margin-left : auto;
padding :5px ;
color : lightgray;
font-size : 16px ;
border : 1px solid lightgray;
border-radius : 5px;

`
// const Flabel = styled.label`
//  display: flex;
// `
function Auth(){
    const [formName , setFormName] = useState('Sign Up')
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
      });
      const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({
          ...formData,
          [name]: value,
        });
      };
      const navigate = useNavigate();
      const handleSubmit = async (event) => {
        event.preventDefault();
        console.log('Form submitted with data:', formData);
        const pathToServer = formName ==='Sign Up' ? 'http://localhost:3030/auth/signup' : 'http://localhost:3030/auth/signin'
      try {
      const response = await axios.post(pathToServer, formData);
      console.log('Authenticated successfully:', response.data);
      localStorage.setItem('token', response.data.token);
      {formName == 'Sign Up' && setFormName('Sign In')}
      if(formName == 'Sign In'){ window.location.href = '/';}
    } catch (error) {
      navigate('/notFound')
      console.error('Error adding authentication:', error);
    }
        // setFormData({
        //   username: '',
        //   email: '',
        //   password: '',
        // });
      };
    
   return(<>
     <AuthButton 
     onClick={()=>{
      formName === 'Sign Up' ? setFormName('Sign In') : setFormName('Sign Up')}
      }>
        {formName === 'Sign Up' ? 'Sign In ' : 'Sign Up'}
      </AuthButton>
     <FormAuth onSubmit={handleSubmit}>
        <h2 style={{marginBottom : "50px"}}>{formName}</h2>
     {formName === 'Sign Up' && <div style={{margin:"10px",display: "flex" , width: "100%" ,justifyContent :"space-between"}}>
          <label htmlFor="username">Username:</label>
          <Ainput
            type="text"
            id="username"
            name="username"
            placeholder="your name here"
            value={formData.username}
            onChange={handleInputChange}
            required
          />
        </div>}
        <div style={{margin:"10px",marginBottom:"10px",display: "flex" , width: "100%" ,justifyContent :"space-between"}}>
          <label htmlFor="email">Email:</label>
          <Ainput
            type="email"
            id="email"
            placeholder="email ex(abc123@gmail.com)"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
        </div>
        <div style={{margin:"10px",display: "flex" , width: "100%" ,justifyContent :"space-between"}}>
          <label htmlFor="password">Password:</label>
          <Ainput
            type="password"
            placeholder="your password here"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            required
          />
        </div>
        <SubmitButton type="submit" >{formName}</SubmitButton>

     </FormAuth>
   
   </>)

} 
 
export default Auth;