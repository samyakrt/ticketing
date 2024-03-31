import { zod } from "@ticketing/shared";

const createPaymentSchema = zod.object({
    token: zod.string(),
    orderId: zod.string()
})

export default createPaymentSchema;
