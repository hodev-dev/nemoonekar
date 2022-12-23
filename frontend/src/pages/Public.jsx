import React from 'react'
import { useSelector } from 'react-redux'

const Public = () => {
    const { isLoggedin } = useSelector((state) => state.auth);
    return (
        <div>{isLoggedin.toString()}</div>
    )
}

export default Public