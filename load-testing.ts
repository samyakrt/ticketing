const baseUrl = 'http://ticketing.dev/api'
const signIn = async () => {
    const res = await fetch(`${baseUrl}/users/sign-in`, {
        method: 'post',
        body: JSON.stringify({
            email: "samyak1@mail.com",
            password: "password"
        }),
        headers: {
            'Content-Type': 'application/json'
        }

    })

    return res.headers.getSetCookie()
}


const createTicket = async (cookie) => {
    const res = await fetch(`${baseUrl}/tickets`, {
        method: 'post',
        body: JSON.stringify({
            "title": "test",
            "price": 400
        }),
        headers: {
            'Content-Type': 'application/json',
            cookie
        }
    })
    return await res.json();
}

const updateTicket = async (cookie, ticket, price) => {
    const res = await fetch(`${baseUrl}/tickets/${ticket.id}`, {
        method: 'PATCH',
        body: JSON.stringify({
            "title": "test",
            price
        }),
        headers: {
            'Content-Type': 'application/json',
            cookie
        }
    })
    return await res.json();
}

const range = (end: number) => {
    const ar: number[] = [];
    let index=  0;
    while(index <= end) {
        ar.push(index);
        index++;
    } 

    return ar;
}

(async () => {
    const cookie = await signIn();
    
    await Promise.all(range(1000).map(async (val) => {
        console.log(val)
        const ticket = await createTicket(cookie);
        console.log(ticket)
        await updateTicket(cookie,ticket,10);
        setTimeout(async () => {
            await updateTicket(cookie,ticket,15);
        },2000)
        return;
    }))

    await fetch(`${baseUrl}/orders/`)
})()
