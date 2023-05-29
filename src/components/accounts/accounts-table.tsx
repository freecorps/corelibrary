import { Flex } from '../styles/flex';
import  TableWrapper from '../table/table';
import  InputSearch  from './input-search';

export const AccountTable = () => {
   return (
      <Flex css={{
        'mt': '$5',
        'px': '$6',
        '@sm': {
           mt: '$10',
           px: '$16',
        },
     }}
     justify={'center'}
     direction={'column'}
  >
    <Flex
            css={{gap: '$8'}}
            align={'center'}
            justify={'between'}
            wrap={'wrap'}
         >
            <Flex
               css={{
                  'gap': '$6',
                  'flexWrap': 'wrap',
                  '@sm': {flexWrap: 'nowrap'},
               }}
               align={'center'}
            >
               <InputSearch />
            </Flex>
            </Flex>
            <TableWrapper />
            </Flex>
   );
};