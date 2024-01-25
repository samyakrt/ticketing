import React from 'react';
import { FieldValues, UseFormSetError, useForm } from 'react-hook-form';
import { FormField, OnSubmit } from '../pages/auth/signup';

interface Props {
    onSubmit:OnSubmit
    title: string
}
const AuthForm:React.FC<Props> = ({ onSubmit, title }) => {
    const { register, handleSubmit, setError, formState: { errors} } = useForm<FormField>();

    return (
        <form onSubmit={handleSubmit(onSubmit(setError))} className='container'>
        <h1>{title}</h1>
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

export default AuthForm;
