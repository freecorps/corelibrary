import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { api } from './api/appwrite'; // Importar sua API
import { Container } from "@nextui-org/react";
import { NavbarWrapper } from "../components/navbar/Navbar";
import { Content } from "../components/home/content";

export default function Home() {
  //set tile of page
  useEffect(() => {
    document.title = "Home";
  }, []);

  const router = useRouter();
  useEffect(() => {
    const checkUser = async () => {
      const userId = await api.getCurrentUser();
      if (!userId) {
        // Se o usuário não está logado, redirecioná-lo para a página de login
        router.push('/');
      } else {
        const userData = await api.getUserData();
        if(!userData) {
          api.createUser({
            user: userId.$id,
            blocked: false,
            blockedCount: 0,
            isLibrarian: false,
            name: userId.name,
            approved: false
          })
          router.push('/home');
          return
        }
        if (!userData.approved) {
          // Se o usuário não está aprovado, alerta-lo, destruir a sessão e redirecioná-lo para a página de login
          alert('Usuário não aprovado');
          await api.userLogout();
          router.push('/');
        }
        router.push('/home');
      }
    }
  
    checkUser();
  }, []);

  return (
    <>
    
      <NavbarWrapper>
        {/* Aqui são colocados os elementos filhos que serão renderizados pela NavbarWrapper */}
      </NavbarWrapper>
      <Container>
        <Content />
      </Container>
    </>
  );
}
