import React from 'react';
import { Card, Col, Row, Button, Text } from "@nextui-org/react";
import CardModal from '../modal/card-modal';

interface BookCardProps {
   id: string,
   title: string, 
   author: string, 
   resume: string, 
   quantity: number, 
   imageUrl: string
}

export const BookCard: React.FC<BookCardProps> = ({id, title, author, resume, quantity, imageUrl }) => {
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
               <Text size={12} weight="bold" transform="uppercase" color="#ffffffAA">
                  New
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
            <Row>
               <Col>
                  <Text color="#000" size={'auto'}>
                     {title}
                  </Text>
                  <Text color="#000" size={'auto'}>
                     {author} - {quantity} unid.
                  </Text>
               </Col>
               <Col>
                  <Row justify="center">
                     <CardModal id={id} title={title} author={author} resume={resume} quantity={quantity} imageUrl={imageUrl} />
                  </Row>
               </Col>
            </Row>
         </Card.Footer>
      </Card>
   );
};