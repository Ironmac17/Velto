import React, { useState } from 'react'
import AuthLayout from '../../components/Layouts/AuthLayout'
import {useNavigate ,Link} from 'react-router-dom'
import Input from "../../components/Inputs/Input"
import { validateEmail } from '../../utils/helper'
import ProfilePhotoSelector from '../../components/Inputs/ProfilePhotoSelector'


const SignUp = () => {
    const navigate=useNavigate();
    const [profilePic,setProfilePic]=useState(null);
    const [fullName,setFullName]=useState("");
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");
    const [error,setError]=useState("");

    const handleSignUp= async (e)=>{
        e.preventDefault();

        let profielImageUrl="";
        
        if(!fullName){
          setError("Please enter your name");
          return;
        }
        if(!validateEmail(email)){
          setError("Please enter a valid email address");
          return;
        }
        if(!password){
          setError("Please enter the password");
          return;
        }
        if(password.length<=8){
          setError("Password must be atleast 8 characters long");
          return;
        }
        setError("");

        //API CALLS FOR SIGNUP HERE 
    
      }


  return (
    <AuthLayout>
      <div className="lg:w-[100%] h-auto md:h-full mt-10 md:mt-0 flex flex-col justify-center">
        <h3 className='text-xl font-semibold text-black'>Create an Account</h3>
        <p className='text-xs text-slate-700 mt-[5px] mb-6'>Join us today by entering your details here</p>

        <form onSubmit={handleSignUp}>

          <ProfilePhotoSelector image={profilePic} setImage={setProfilePic}/>


          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            <Input value={fullName} 
                  onChange={({target})=> setFullName(target.value)}
                  label="Full Name"
                  placeholder="Abc Xyz"
                  type="text"
            />
            <Input value={email} 
                  onChange={({target})=> setEmail(target.value)}
                  label="Email"
                  placeholder="abc@example.com"
                  type="text"
            />
            <div className='col-span-2'>
              <Input value={password} 
                    onChange={({target})=> setPassword(target.value)}
                    label="Password"
                    placeholder="Min 8 characters"
                    type="password"
              />
            </div>
          </div>

          {error && <p className='text-red-500 text-[12px] mt-1'>{error}</p>}

          <button type="submit" className="btn-primary">
            SignUp
          </button>

          <p className="text-[13px] text-slate-000 mt-3">
            Already have an account?{" "}
            <Link className="font-medium text-[#895bfc] underline" to="/login">
              Login 
            </Link>
          </p>
        </form>
      </div>
    </AuthLayout>
  )
}

export default SignUp