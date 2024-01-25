import axios from 'axios';
import React, { useEffect } from 'react';
import router from 'next/router';

const SignOut = () => {
    
    useEffect(() => {
    axios.post('/api/users/sign-out').then(() =>{
        router.push('/auth/signup')
    } )
        ;
    },[]);
    return (
        <div className='alert alert-info'> 
            signing out
        </div>
    )
}

export default SignOut;
