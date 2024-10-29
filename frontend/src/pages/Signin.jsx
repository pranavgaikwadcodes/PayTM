import React, { useState } from 'react'
import InputBox from '../components/Auth-Components/InputBox'
import Button from '../components/Auth-Components/Button'
import Heading from '../components/Auth-Components/Heading'
import SubHeading from '../components/Auth-Components/SubHeading'
import BottomWarning from '../components/Auth-Components/BottomWarning'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'


const Signin = () => {
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    username: '',
    password: '',
  })
  
  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const inputs = [
    {
      id: 1,
      title: 'Email',
      placeholder: 'jhondoe@gmail.com',
      inputType: 'text',
      name: "username",
    },
    {
      id: 2,
      title: 'Password',
      placeholder: '******',
      inputType: 'password',
      name: "password",
    },
  ]

  return (
    <div className='h-screen bg-grey flex items-center justify-center'>
      <div className="form bg-white rounded-lg p-8 justify-center items-center w-96">
        <Heading label={'Sign In'} />
        <SubHeading label={'Enter your information to create an account'} />

        {inputs.map(input => {
          return (
            <InputBox
              title={input.title}
              name={input.name}
              placeholder={input.placeholder}
              inputType={input.inputType}
              key={input.id}
              onChange={handleInputChange}
            />
          )
        })}

        <Button label={'Sign In'}
          onClick={() => {
            axios.post('http://localhost:5000/api/v1/user/signin', formData)
              .then(response => {
                localStorage.setItem("token", response.data.token)
                navigate('/dashboard')
              })
          }}
        />
        <BottomWarning label={`Don't have an account?`} buttonText={'Sign up'} to={'/signup'} />
      </div>
    </div>
  )
}

export default Signin