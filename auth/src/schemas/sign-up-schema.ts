import z from '@/core/validators/zod';

const SignUpSchema = z.object({
    email: z.string().email(),
    password: z.string().min(4).max(20)    
});

export type SignUpPayload = z.infer<typeof SignUpSchema>;
export default SignUpSchema;
