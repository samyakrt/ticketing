import Ticket from "../ticket"

it('implements OCC', async () => {
    const newTicket = Ticket.build({
        title: 'concert',
        price: 20,
        userId: '23'
    });
    await newTicket.save();

    const firstInstance = await Ticket.findById(newTicket.id);
    const secondInstance = await Ticket.findById(newTicket.id);

    firstInstance?.set({ price: 10})
    secondInstance?.set({ price: 15})

    await firstInstance?.save();
     expect(secondInstance?.save()).rejects.toThrow();
})

it('increments the version number on each update', async () => {
    const newTicket = Ticket.build({
        title: 'concert',
        price: 20,
        userId: '23'
    });
    await newTicket.save();
    expect(newTicket.version).toEqual(0);
    
    const firstInstance = await Ticket.findById(newTicket.id);
    
    firstInstance?.set({ price: 10});
    await firstInstance?.save();
    expect(firstInstance!.version).toEqual(1);

    const secondInstance = await Ticket.findById(newTicket.id);
    secondInstance?.set({ price: 15});
    await secondInstance?.save();
    expect(secondInstance!.version).toEqual(2);
})
