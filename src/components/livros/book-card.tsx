import React from 'react';
import { Card, Col, Row, Button, Text } from "@nextui-org/react";
import CardModal from '../modal/card-modal';

interface BookCardProps {
   title: string;
   subtitle: string;
}

export const BookCard: React.FC<BookCardProps> = ({ title, subtitle }) => {
   return (
      <Card
         css={{
            '@media (max-width: 600px)': {
               maxWidth: '90%',
               padding: '0 5%',
            },
            '@media (min-width: 601px)': {
               maxWidth: '80%',
               padding: '0 10%',
            },
            // Continue ajustando para outros breakpoints conforme necessário
            bg: '$blue600',
            borderRadius: '$xl',
            px: '$6',
         }}
      >
         <Card.Header css={{ position: "absolute", zIndex: 1, top: 5 }}>
            <Col>
               <Text size={12} weight="bold" transform="uppercase" color="#ffffffAA">
                  New
               </Text>
               <Text h3 color="black">
                  Acme camera
               </Text>
            </Col>
         </Card.Header>
         <Card.Body css={{ p: 0 }}>
            <Card.Image
               src="https://nextui.org/images/card-example-6.jpeg"
               width="100%"
               height="100%"
               objectFit="cover"
               alt="Card example background"
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
                     Available soon.
                  </Text>
                  <Text color="#000" size={'auto'}>
                     Get notified.
                  </Text>
               </Col>
               <Col>
                  <Row justify="center">
                     <CardModal />
                  </Row>
               </Col>
            </Row>
         </Card.Footer>
      </Card>
   );
};