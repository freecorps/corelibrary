import {Badge, Dropdown, Navbar, Container, Grid} from '@nextui-org/react';
import React, { useEffect, useState } from 'react';
import {NotificationIcon} from '../icons/navbar/notificationicon';
import { api } from '@/pages/api/appwrite';

interface BookCardProps {
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
   book: BookCardProps
}

export const NotificationsDropdown = () => {
   const [notifications, setNotifications] = useState<reservationData[]>([]);
   
   useEffect(() => {
      const fetchNotifications = async () => {
         const reservationData = await api.getReservationData();
         const overdueReservations = reservationData.filter((reservation: reservationData) => {
            // Converter as datas para o formato Date do JavaScript
            const reservationDate = new Date(reservation.date);
            const currentDate = new Date();
            
            // Calcular a diferença em dias
            const differenceInTime = currentDate.getTime() - reservationDate.getTime();
            const differenceInDays = differenceInTime / (1000 * 3600 * 24);
            
            // Retornar verdadeiro se a diferença for maior que X dias
            return differenceInDays > 5;
         });
         
         setNotifications(overdueReservations);
      }
      
      fetchNotifications();
   }, []);

   return (
      <Dropdown placement="bottom-right">
         <Dropdown.Trigger>
            <Navbar.Item>
               <Container>
                  <Grid>
                  {notifications.length > 0 && 
                  <Badge size="xs" color="error">{notifications.length}</Badge>}
                  <NotificationIcon />
                  </Grid>
               </Container>
            </Navbar.Item>
         </Dropdown.Trigger>
         <Dropdown.Menu
            aria-label="Avatar Actions"
            css={{
               '$$dropdownMenuWidth': '340px',
               '$$dropdownItemHeight': '70px',
               '& .nextui-dropdown-item': {
                  'py': '$4',
                  // dropdown item left icon
                  'svg': {
                     color: '$secondary',
                     mr: '$4',
                  },
                  // dropdown item title
                  '& .nextui-dropdown-item-content': {
                     w: '100%',
                     fontWeight: '$semibold',
                  },
               },
            }}
         >
            <Dropdown.Section title="Notifications">
               {notifications.map((notification: reservationData, index: number) => (
                  <Dropdown.Item
                     key={index}
                     showFullDescription
                     description={`Sua reserva do livro ${notification.book.title} venceu, por favor devolva o livro.`}
                  >
                     📣 Reserva Vencida
                  </Dropdown.Item>
               ))}
            </Dropdown.Section>
         </Dropdown.Menu>
      </Dropdown>
   );
};