import React from 'react'
import {useSelector} from 'react-redux'
import Loader from '../components/loader/Loader'
import {Navigate} from 'react-router-dom'

function ProtectedRoute({element,adminOnly=false}) {
    const {isAuthenticated,loading,user}=useSelector(state=>state.user);

    if(loading){
        return <Loader />
    }

    if(!isAuthenticated){
        return <Navigate to="/login" replace />
    }
    if(adminOnly && user?.role!=='admin'){
        return <Navigate to="/" replace />
    }
  return element
}

export default ProtectedRoute

// Without replace
// User:
// Opens profile
// Gets redirected to login
// Presses back
// goes back to profile (BUG )