import React from 'react'
import { useParams, Navigate, useNavigate } from 'react-router-dom'

const Post = () => {
  const status = 200
  const navigate = useNavigate()
  if (status === 404) {
    return <Navigate to={'/notfound'} />
  }
  const onClick = (e)=>{
    console.log('hello')
    navigate('/about')
  }
  return (
    <div>
      <h1>Post </h1>
      <button onClick={onClick} >Click</button>
    </div>
  )
}

export default Post