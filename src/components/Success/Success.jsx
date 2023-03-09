import React from 'react'

const Success = ({setOpen}) => {
  return (
    <div>
        <h3>Success</h3>
        <button className='btn btn-primary' onClick={() => setOpen(false)}>Ok</button>
    </div>
  )
}

export default Success