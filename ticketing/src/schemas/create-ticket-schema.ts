import { zod } from '@ticketing/shared';

const CreateTicketSchema = zod.object({
    title: zod.string().min(1,'please provide title'),
    price: zod.number().positive('must be positive')
})

export default CreateTicketSchema;
