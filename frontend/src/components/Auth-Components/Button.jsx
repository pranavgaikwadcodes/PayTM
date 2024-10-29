import React from 'react'

const Button = ({ label, onClick }) => {
    return (
        <>
            <button
                onClick={onClick}
                type="button"
                class="w-full text-white bg-[#050708] hover:bg-[#050708]/80 focus:ring-4 focus:outline-none focus:ring-[#050708]/50 font-medium rounded-lg text-md px-2 py-6 text-center inline-flex items-center dark:hover:bg-[#050708]/40 dark:focus:ring-gray-600 me-2 mb-2 h-10 justify-center mt-2">
                {label}
            </button>
        </>
    )
}

export default Button