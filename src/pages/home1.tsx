import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { api } from './api/appwrite'; // Importar sua API
import { Container } from "@nextui-org/react";
import { UserNavbarWrapper } from "../components/user-navbar/user-navbar";
import { Content } from "../components/home/content";

export default function Home() {
    const router = useRouter();
  
    useEffect(() => {
      const checkUser = async () => {
        const userId = await api.getCurrentUser();
        if (!userId) {
          // Se o usuário não está logado, redirecioná-lo para a página de login
          router.push('/');
        } else {
          // Se o usuário estiver logado, verificar se é um bibliotecário
          const isLibrarian = await api.checkIfUserIsLibrarian();
          if (!isLibrarian) {
            // Se o usuário for um bibliotecário, redirecioná-lo para a página do bibliotecário
            router.push('/home');
          } else {
            // Se o usuário for um usuário comum, mantê-lo nesta página
          }
        }
      }
    
      checkUser();
    }, []);
  
    return (
      <>
        <UserNavbarWrapper>
          {/* Aqui são colocados os elementos filhos que serão renderizados pela NavbarWrapper */}
        </UserNavbarWrapper>
        <Container>
          <Content />
        </Container>
      </>
    );
  }
