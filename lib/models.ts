export type Concert = {
    id?: string,
    title: string,
    artist: string,
    description: string,
    venue: string,
    concert_date: string,
    poster_url: string,
    price: number,
    total_tickets: number,
    available_tickets: number
}

export type Ticket = {
    id: string,
    concerts: Concert,
    is_validated: boolean,
    validated_at: string,
    quantity: number
}