import { zod } from "@ticketing/shared";
import { isValidObjectId } from "mongoose";

const CreateOrderSchema = zod.object({
    ticketId: zod.string().refine(val => isValidObjectId(val), { message: 'Invalid object id'})
})

export default CreateOrderSchema;
