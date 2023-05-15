import {FC} from 'react'

interface ButtonProps{
    bgColor?:string,
    text?:string,
    onClick?:()=>void
}

const Button:FC<ButtonProps> = ({text,onClick,bgColor}) => {
  return (
      <button
      className={`bg-blue-500 py-[0.4rem] px-3 rounded-lg text-white flex items-center justify-center gap-2 cursor-pointer`}
      onClick={onClick}
    >
      {text}
    </button>

  )
}

export default Button