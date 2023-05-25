import { Text, Spacer } from "@nextui-org/react"
import { Box } from "../styles/box"
import BookGrid from "../livros/books";

interface Book {
    title: string;
    subtitle: string;
}

const bookList: Book[] = [
    {
      title: "Auto Insurance Auto Insurance Auto Insurance Auto Insurance Auto Insurance",
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
    {
        title: "Health Insurance",
        subtitle: "200 Trips",
    },
    {
        title: "Life Insurance",
        subtitle: "200 Trips",
    },
    {
        title: "Health Insurance",
        subtitle: "200 Trips",
    },
    {
        title: "Life Insurance",
        subtitle: "200 Trips",
    },
    {
        title: "Health Insurance",
        subtitle: "200 Trips",
    },
    {
        title: "Life Insurance",
        subtitle: "200 Trips",
    },
    {
        title: "Health Insurance",
        subtitle: "200 Trips",
    },
    {
        title: "Life Insurance",
        subtitle: "200 Trips",
    },
    
];

export const Content = () => (
    BookGrid(bookList)
);
