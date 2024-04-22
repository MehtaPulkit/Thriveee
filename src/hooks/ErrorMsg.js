import React from 'react'
import ErrorRed from './IconHooks.js/ErrorRed'
import Subheading from './Subheading'
import CancelBtn from '../elements/CancelBtn'
import { useNavigate } from 'react-router-dom'

const ErrorMsg = () => {
    
  const navigate = useNavigate();
  return (
    <div className="flex flex-col gap-6 items-center min-h-300px">
        <ErrorRed />
        <Subheading subheading="Sorry.. there was some error! " />
        <CancelBtn text="Go back" handleClick={() => navigate(-1)} />
      </div>
  )
}

export default ErrorMsg
