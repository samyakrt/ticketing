import axios, { AxiosError } from 'axios';
import router from 'next/router';
import React from 'react';
import { useForm, SubmitHandler, FieldValues, UseFormSetError } from 'react-hook-form';
import AuthForm from '../../components/auth-form';

export interface FormField extends FieldValues {
    email: string;
    password: string;
}

interface ValidationFailedResponse<T extends string> {
    errors: Record<T, string[]>
}

export type OnSubmit = (setErrors: UseFormSetError<FormField>) => (val: FormField) => Promise<void>

const SignIn = () => {

    const onSubmit:OnSubmit = (setError) => async (val) => {
        axios.post('/api/users/sign-in', val)
            .then(() => router.push('/'))
            .catch((res: AxiosError<ValidationFailedResponse<'email' | 'password'>, any>) => {
                if (res.response?.data.errors) {
                    Object.entries(res.response?.data.errors).map(([key, errors]) => {
                        setError(key, {
                            message: errors[0]
                        })
                    })
                }
            })


    }
    return (
        <AuthForm
            onSubmit={onSubmit}
            title='Signup Form'
        />
    )
}

export default SignIn
