import React from 'react';
import { Grid } from "@nextui-org/react";
import { BookCard } from './book-card';

interface Book {
  title: string;
  subtitle: string;
}

export default function BookGrid(books?: Book[]) {
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
        <Grid key={index} xs={2}>
          <BookCard title={book.title} subtitle={book.subtitle} />
        </Grid>
      ))}
    </Grid.Container>
  );
}

function ShowPlaceholder() {
  return (
    <div>
      <h1>Placeholder</h1>
    </div>
  );
}
