import React from 'react';
import { Card, Col, Row, Button, Text } from "@nextui-org/react";
import CardModal from '../modal/card-modal';
import { api } from '@/pages/api/appwrite';

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

export const ReservationCard: React.FC<BookCardProps> = ({id, title, author, resume, quantity, imageUrl, date }) => {
   const [reservations, setReservations] = React.useState<reservationData[]>([]);
   const [novo, setNovo] = React.useState("");
   const truncateText = (text: string, maxLength: number) => {
      if (text.length > maxLength) {
         return text.slice(0, maxLength) + '...';
      }
      return text;
   };

   React.useEffect(() => {
      const fetchReservations = async () => {
         const data = await api.getReservationData();
         //set setReservations
         setReservations(data);
      };
      fetchReservations();
   }, []);

   return (
      <Card
         css={{
            '@media (max-width: 600px)': {
               maxWidth: '90%',
            },
            '@media (min-width: 601px)': {
               maxWidth: '80%',
            },
            borderRadius: '$xl',
         }}
      >
         <Card.Header css={{ position: "absolute", zIndex: 1, top: 5 }}>
            <Col>
               <Text size={12} weight="bold" transform="uppercase" css={{
                  color: "#127189;",
                  backgroundImage: "-webkit-linear-gradient(45deg, #12828a 0%, #d90bba 50%);",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  letterSpacing: "0.1em",
                  width: "20%",
               }} >
                  {novo}
               </Text>
               <Text h3 color="white" >
                  {title}
               </Text>
            </Col>
         </Card.Header>
         <Card.Body css={{ p: 0 }}>
            <Card.Image
               src={imageUrl}
               width="100%"
               height="100%"
               objectFit="cover"
            />
         </Card.Body>
          <Card.Footer
            isBlurred
            css={{
               position: "absolute",
               bgBlur: "#ffffff66",
               borderTop: "$borderWeights$light solid rgba(255, 255, 255, 0.2)",
               bottom: 0,
               zIndex: 1,
               height: "25%",
            }}
         >
            {/*Podemos setar limite de caracteres para cada tipo de tela, futuramente*/}
            <Row align="center" css={{ height: "100%" }}>
               <Col>
                  <Text color="#000" size={'auto'} >
                     {truncateText(title, 14)} {/* Limita o título a 20 caracteres */}
                  </Text>
                  <Text color="#000" size={'auto'} >
                     {truncateText(author, 14)} {/* Limita o autor a 30 caracteres */}
                  </Text>
                  <Text color="#000" size={'auto'} >
                     - {quantity} unid.
                  </Text>
               </Col>
               <Col  css={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                     <CardModal id={id} title={title} author={author} resume={resume} quantity={quantity} imageUrl={imageUrl} date={date} />
               </Col>
            </Row>
         </Card.Footer>
      </Card>
   );
};