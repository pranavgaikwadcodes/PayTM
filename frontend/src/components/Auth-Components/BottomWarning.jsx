import React from 'react'
import { NavLink } from 'react-router-dom'

const BottomWarning = ({label, buttonText, to}) => {
    return (
        <>
            <div className='font-medium mt-2  text-center'>
                {label} <NavLink to={to} className={'underline'}>{buttonText}</NavLink>
            </div>
        </>
    )
}

export default BottomWarning