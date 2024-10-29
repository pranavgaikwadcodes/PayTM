import React, { useState } from 'react'
import InputBox from '../components/Auth-Components/InputBox'
import Button from '../components/Auth-Components/Button'
import Heading from '../components/Auth-Components/Heading'
import SubHeading from '../components/Auth-Components/SubHeading'
import BottomWarning from '../components/Auth-Components/BottomWarning'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'



const Signup = () => {
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        password: '',
        username: '',
    })
    
    const handelInputChnage = (e) => {
        const {name, value} = e.target
        setFormData({...formData, [name]: value})
    }

    const inputs = [
        {
            id: 1,
            title: 'First Name',
            placeholder: 'Jhon',
            inputType: 'text',
            name: 'firstName',
        },
        {
            id: 2,
            title: 'Last Name',
            placeholder: 'Doe',
            inputType: 'text',
            name: 'lastName',
        },
        {
            id: 3,
            title: 'Email',
            placeholder: 'jhondoe@gmail.com',
            inputType: 'email',
            name: 'username',
        },
        {
            id: 4,
            title: 'Password',
            placeholder: '******',
            inputType: 'password',
            name: 'password',
        },
    ]
    return (
        <div className='h-screen bg-grey flex items-center justify-center'>
            <div className="form bg-white rounded-lg p-8 justify-center items-center w-96">
                <Heading label={'Sign Up'} />
                <SubHeading label={'Enter your information to create an account'} />

                {inputs.map(input => {
                    return (
                        <InputBox
                            title={input.title}
                            placeholder={input.placeholder}
                            inputType={input.inputType}
                            key={input.id}
                            name={input.name}
                            onChange={handelInputChnage}
                            />
                    )
                })}

                <Button label={'Sign Up'} 
                    onClick={() => {
                        axios.post('http://localhost:5000/api/v1/user/signup', formData )
                        .then( response => {
                            localStorage.setItem("token", response.data.token)
                            navigate('/dashboard')
                        })
                    }}
                />
                <BottomWarning label={'Already have an account?'} buttonText={'Sign in'} to={'/signin'} />
            </div>
        </div>
    )
}

export default Signup