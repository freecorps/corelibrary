import React, { useEffect, useState } from 'react';
import ReservationGrid from "../livros/reservations";
import { api } from "../../pages/api/appwrite";

interface BookCardProps {
    id: string,
    title: string, 
    author: string, 
    resume: string, 
    quantity: number, 
    imageUrl: string,
    date: string,
 }
 
 interface Reservation {
    user: string,
    bookId: string,
    date: string,
 }
 
 interface reservationData extends Reservation {
    book: BookCardProps
 }

export const ContentReservations = () => {
    const [books, setBooks] = useState<reservationData[]>([]);

    useEffect(() => {
        const fetchBooks = async () => {
            const availableReservations = await api.getReservationData();
            setBooks(availableReservations);
        };
        fetchBooks();
    }, []);

    return (
        <ReservationGrid books={books} />
    );
};
