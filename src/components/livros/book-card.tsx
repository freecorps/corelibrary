import { Card, Text } from '@nextui-org/react';
import React from 'react';
import { Box } from '../styles/box';
import { Flex } from '../styles/flex';

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
         <Card.Body css={{ py: '$10' }}>
            <Flex css={{ gap: '$5' }}>
               <Flex direction={'column'}>
                  <Text span css={{ color: 'white' }}>
                     {title}
                  </Text>
                  <Text span css={{ color: 'white' }} size={'$xs'}>
                     {subtitle}
                  </Text>
               </Flex>
            </Flex>
         </Card.Body>
      </Card>
   );
};