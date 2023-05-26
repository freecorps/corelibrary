import { Input, Link, Navbar, Text } from '@nextui-org/react';
import React from 'react';
import { GithubIcon } from '../icons/navbar/github-icon';
import { SearchIcon } from '../icons/search-icon';
import { Box } from '../styles/box';
import { NotificationsDropdown } from './notifications-dropdown';
import { BookerDropdown } from './booker-dropdown';
import LivroModal from '../modal/livros-modal';
import UserModal from '../modal/users-modal';
import { api } from "../../pages/api/appwrite";

interface Props {
   children: React.ReactNode;
}

export const NavbarWrapper = ({ children }: Props) => {

   const [isLibrarian, setIsLibrarian] = React.useState(false);

   React.useEffect(() => {
      api.checkIfUserIsLibrarian().then(setIsLibrarian);
   }, []);
   
   const collapseItems = [
      'Profile',
      'Dashboard',
      'Activity',
      'Analytics',
      'System',
      'Deployments',
      'My Settings',
      'Team Settings',
      'Help & Feedback',
      'Log Out',
   ];
   return (
      <Box
         css={{
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
            flex: '1 1 auto',
            overflowY: 'auto',
            overflowX: 'hidden',
         }}
      >
         <Navbar
            isBordered
            css={{
               'borderBottom': '1px solid $border',
               'justifyContent': 'space-between',
               'width': '100%',
               '@md': {
                  justifyContent: 'space-between',
               },

               '& .nextui-navbar-container': {
                  'border': 'none',
                  'maxWidth': '100%',

                  'gap': '$6',
                  '@md': {
                     justifyContent: 'space-between',
                  },
               },
            }}
         >
            <Navbar.Content
               css={{
                  width: '100%',
                  '@media (max-width: 600px)': {
                     width: '90%',
                     padding: '0 5%',
                  },
                  '@media (min-width: 601px)': {
                     width: '80%',
                     padding: '0 10%',
                  },
               }}
            >
               <Input
                  clearable
                  contentLeft={
                     <SearchIcon
                        fill="var(--nextui-colors-accents6)"
                        size={16}
                     />
                  }
                  contentLeftStyling={false}
                  css={{
                     'w': '100%',
                     'transition': 'all 0.2s ease',
                     '@xsMax': {
                        w: '100%',
                        // mw: '300px',
                     },
                     '& .nextui-input-content--left': {
                        h: '100%',
                        ml: '$4',
                        dflex: 'center',
                     },
                  }}
                  placeholder="Search..."
               />
            </Navbar.Content>
            <Navbar.Content>
               <Navbar.Content>
               {  isLibrarian && <LivroModal />}
               {  isLibrarian && <UserModal />}
               </Navbar.Content>
            </Navbar.Content>
            <Navbar.Content>
               <Navbar.Content>
                  <NotificationsDropdown />
               </Navbar.Content>
               <Navbar.Content>
                  <Link
                     href="https://github.com/freecorps"
                     target={'_blank'}
                  >
                     <GithubIcon />
                  </Link>
               </Navbar.Content>
               <Navbar.Content>
                  <BookerDropdown />
               </Navbar.Content>
            </Navbar.Content>

            <Navbar.Collapse>
               {collapseItems.map((item, index) => (
                  <Navbar.CollapseItem
                     key={item}
                     activeColor="secondary"
                     css={{
                        color:
                           index === collapseItems.length - 1 ? '$error' : '',
                     }}
                     isActive={index === 2}
                  >
                     <Link
                        color="inherit"
                        css={{
                           minWidth: '100%',
                        }}
                        href="#"
                     >
                        {item}
                     </Link>
                  </Navbar.CollapseItem>
               ))}
            </Navbar.Collapse>
         </Navbar>
         {children}
      </Box>
   );
};