import z from 'zod';

const SignUpSchema = z.object({
    email: z.string().email(),
    password: z.string().min(4).max(20)    
});

export default SignUpSchema;
