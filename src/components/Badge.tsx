import {FC} from 'react'

interface BadgeProps{
    text?:string,
}

const Badge:FC<BadgeProps> = ({text}) => {
  return (
    <div>
    {
       text === "active" ? (
            <span className='bg-green-400 w-20 py-1 px-4 rounded-full font-semibold text-green-900'>active</span>
        ) : (
            <span className='bg-gray-300 w-20 py-1 px-4 rounded-full font-semibold text-gray-900'>invited</span>
        )
    }
    </div> 
  )
}

export default Badge