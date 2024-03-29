import React, { useEffect, useState } from 'react';
import BookGrid from "../livros/books";
import { api } from "../../pages/api/appwrite";

interface Book {
    id: string,
    title: string, 
    autor: string, 
    resume: string, 
    quantity: number, 
    imageUrl: string
    date: string
}

export const Content = () => {
    const [books, setBooks] = useState<Book[]>([]);

    useEffect(() => {
        const fetchBooks = async () => {
            const availableBooks = await api.getAvailableBooks();
            setBooks(availableBooks);
        };
        fetchBooks();
    }, []);

    return (
        <BookGrid books={books} />
    );
};
