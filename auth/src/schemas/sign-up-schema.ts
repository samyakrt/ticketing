import { zod } from "@ticketing/shared";

const SignUpSchema = zod.object({
    email: zod.string().email(),
    password: zod.string().min(4).max(20)    
});

export type SignUpPayload = zod.infer<typeof SignUpSchema>;
export default SignUpSchema;
