import React from 'react';
import { Grid, Spacer } from "@nextui-org/react";
import { ReservationCard } from './reservation-card';
import { BookPlaceholderIcon } from '../icons/books/book-placeholder-icon';

interface Book {
  id: string,
  title: string, 
  author: string, 
  resume: string, 
  quantity: number, 
  imageUrl: string,
  date: string
}

interface Reservation {
    user: string,
    bookId: string,
    date: string,
 }
 
 interface reservationData extends Reservation {
    book: Book
 }

 interface ReservationGridProps {
    books: reservationData[];
  }

export default function ReservationGrid({books}: ReservationGridProps) {
  return CheckReservation(books);
}

function CheckReservation(books?: reservationData[]) {
  if (books && books.length > 0) {
    return ShowReservation(books);
  } else {
    return ShowPlaceholder();
  }
}

function ShowReservation(Books: reservationData[]) {
  return (
    <Grid.Container gap={2} >
      {Books.map((book, index) => (
        <Grid key={index} xs={12} sm={6} md={4} lg={3}>
          <ReservationCard id={book.book.id} title={book.book.title} author={book.book.author} quantity={book.book.quantity} imageUrl={book.book.imageUrl} resume={book.book.resume} date={book.date}/>
        </Grid>
      ))}
    </Grid.Container>
  );
  
}

const ShowPlaceholder = () => {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh',
      fontSize: '1.2rem',
      color: 'var(--nextui-colors-foreground)'
    }}>
      <BookPlaceholderIcon width="100" height="100" />
      <Spacer y={1.5} />
      <p>você não tem livros em sua reserva</p>
    </div>
  );
};