
import React, { useRef } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import {useNavigate } from "react-router-dom";

import styled from "styled-components";



const Contact = () => {
  const form = useRef();
  const user = useSelector((state) => state.user)
  const navigate = useNavigate()
  const handleSend = async(e) => {
    e.preventDefault();
    const formData = new FormData(form.current);
    const data = {};
    formData.forEach((value, key) => {
      data[key] = value;
    });
    const{name, email, message} = data
        if(name && email && message){
            if(user.email){
                const fetchdata = await fetch(`${process.env.REACT_APP_SERVER_DOMIN}/queries`,{
                    method : "POST",
                    headers : {
                        "Content-type":"application/json"
                    },
                    body : JSON.stringify(data)
                })
                const dataRes = await fetchdata.json()
                // console.log(dataRes)
                
                // alert(dataRes.message)
                toast(dataRes.message)
                if(dataRes.alert){
                    navigate("/")
                }
                
            }else {
                toast("You have not Logged In...!");
                setTimeout(() => {
                    navigate("/login");
                }, 1000);
            }
        }else{
            toast("Please enter required feilds..!")
        }

  }

  return (
    <div className="p-3 md:py-8">
    <div className="w-full max-w-sm bg-white m-auto flex-col p-4">
         <h1 className="text-center underline font-bold ">Contact Us</h1> 
    <StyledContactForm>
      <form ref={form} onSubmit={handleSend}>
        <label>Name</label>
        <input type="text" name="name" />
        <label>Email</label>
        <input type="email" name="email" />
        <label>Message</label>
        <textarea name="message" />
        <input type="submit" value="Send" />
      </form>
    </StyledContactForm>
    </div>
    </div>
  );
};

export default Contact;

// Styles
const StyledContactForm = styled.div`
  width: 400px;

  form {
    display: flex;
    align-items: flex-start;
    flex-direction: column;
    width: 100%;
    font-size: 16px;

    input {
      width: 90%;
      height: 35px;
      padding: 7px;
      outline: none;
      border-radius: 5px;
      border: 1px solid rgb(220, 220, 220);

      &:focus {
        border: 2px solid rgba(0, 206, 158, 1);
      }
    }

    textarea {
      max-width: 90%;
      min-width: 90%;
      width: 90%;
      max-height: 100px;
      min-height: 100px;
      padding: 7px;
      outline: none;
      border-radius: 5px;
      border: 1px solid rgb(220, 220, 220);

      &:focus {
        border: 2px solid rgba(0, 206, 158, 1);
      }
    }

    label {
      margin-top: 1rem;
    }

    input[type="submit"] {
      margin-top: 2rem;
      cursor: pointer;
      background: rgb(249, 105, 14);
      color: white;
      border: none;
    }
  }
`;