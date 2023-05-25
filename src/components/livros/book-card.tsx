import {Card, Text} from '@nextui-org/react';
import React from 'react';
import {Box} from '../styles/box';
import {Flex} from '../styles/flex';

interface BookCardProps {
   title: string;
   subtitle: string;
 }
 
 export const BookCard: React.FC<BookCardProps> = ({ title, subtitle }) => {
    return (
       <Card
          css={{
             mw: '375px',
             bg: '$blue600',
             borderRadius: '$xl',
             px: '$6',
          }}
       >
          <Card.Body css={{py: '$10'}}>
             <Flex css={{gap: '$5'}}>
                <Flex direction={'column'}>
                   <Text span css={{color: 'white'}}>
                      {title}
                   </Text>
                   <Text span css={{color: 'white'}} size={'$xs'}>
                      {subtitle}
                   </Text>
                </Flex>
             </Flex>
          </Card.Body>
       </Card>
    );
 };