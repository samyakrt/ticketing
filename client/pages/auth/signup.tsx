import axios, { AxiosError } from 'axios';
import router from 'next/router';
import React from 'react';
import { useForm, SubmitHandler, FieldValues } from 'react-hook-form';

interface FormField extends FieldValues{
    email: string;
    password: string;
}

interface ValidationFailedResponse<T extends string> {
    errors: Record<T,string[]>
}
const SignUp = () => {
    const { register, handleSubmit, setError, formState: { errors} } = useForm<FormField>();

    const onSubmit: SubmitHandler<FormField> = async (val) => {
        await axios.post('/api/users/sign-up',val).catch((res: AxiosError<ValidationFailedResponse<'email' | 'password'>,any> )=> {
            if(res.response?.data.errors) {
                Object.entries(res.response?.data.errors).map(([key, errors]) => {
                    setError(key,{
                        message:errors[0]
                    })
                })
            }
        })
        router.push('/')

    }
    return (
        <form onSubmit={handleSubmit(onSubmit)} className='container'>
            <h1>Sign up</h1>
            <div className="form-group">
                <label htmlFor="email">Email </label>
                <input type="email" className='form-control' {...register('email')} /></div>
                <span className="text-danger">{errors['email']?.message}</span>
            <div className="form-group">
                <label htmlFor="password">Password</label>
                <input type="password" className='form-control'  {...register('password') } />
                <span className="text-danger">{errors['password']?.message}</span>
            
            </div>

            <div className="form-group">
                <button type='submit' className='btn btn-primary'>Submit</button>
            </div>
        </form>
    )
}

export default SignUp
