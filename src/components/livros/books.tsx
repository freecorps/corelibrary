import React from 'react';
import { Grid } from "@nextui-org/react";
import { BookCard } from './book-card';

interface Book {
  title: string;
  subtitle: string;
}

const books = true;

const bookList: Book[] = [
  {
    title: "Auto Insurance",
    subtitle: "1311 Cars",
  },
  {
    title: "Home Insurance",
    subtitle: "900 Houses",
  },
  {
    title: "Travel Insurance",
    subtitle: "200 Trips",
  },
];

export default function BookGrid() {
  return CheckBook();
}

function CheckBook() {
  if (books) {
    return ShowBook(bookList);
  } else {
    return ShowPlaceholder();
  }
}

function ShowBook(Books: Book[]) {
  return (
    <Grid.Container gap={2} justify="center">
      {Books.map((book, index) => (
        <Grid key={index} xs={4}>
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
