import React from 'react'

const InputBox = (props) => {
  return (
    <div className='py-2'>
      <div className="inputTitle font-semibold">{props.title}</div>
        <input
          name={props.name}
          onChange={props.onChange}
          type={props.inputType}
          placeholder={props.placeholder}
          className='text-xl py-2 px-4 rounded-md border focus:ring-grey w-full mt-2'
        />
    </div>
  )
}

export default InputBox