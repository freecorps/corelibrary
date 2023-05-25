import React from 'react';
import { Grid } from "@nextui-org/react";
import { BookCard } from './book-card';
import { BookPlaceholderIcon } from '../icons/books/book-placeholder-icon';

interface Book {
  title: string, 
   autor: string, 
   resume: string, 
   quantity: number, 
   imageUrl: string
}

interface BookGridProps {
  books: Book[];
}

export default function BookGrid({books}: BookGridProps) {
  return CheckBook(books);
}

function CheckBook(books?: Book[]) {
  if (books) {
    return ShowBook(books);
  } else {
    return ShowPlaceholder();
  }
}

function ShowBook(Books: Book[]) {
  return (
    <Grid.Container gap={2} justify="center">
      {Books.map((book, index) => (
        <Grid key={index} xs={12} sm={6} md={4} lg={3}>
          <BookCard title={book.title} author={book.autor} quantity={book.quantity} imageUrl={book.imageUrl} resume={book.resume} />
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
      color: 'white'
    }}>
      <BookPlaceholderIcon width="100" height="100" />
      <p>Nenhum livro no acervo, por favor, adicione para visualizar.</p>
    </div>
  );
};





