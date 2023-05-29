import { api } from './api/appwrite'

import { useRouter } from 'next/router'
import { useEffect } from 'react'

import React from 'react';
import {
  Card,
  Spacer,
  Button,
  Text,
  Input,
  Row,
  Checkbox,
  Container,
} from '@nextui-org/react';

export default function Register() {
  // Adicione funções para lidar com o login de cada provedor

  const router = useRouter()

  const checkUser = async () => {
    const userId = await api.getCurrentUser();
    if (userId) {
      router.push('/home')
    }
  }

  const toLogin = () => {
    router.push('/')
  }

  useEffect(() => {
    document.title = "Registro";
    checkUser()
  }, [])

  const handleRegister = async () => {
    //get email and password
    const email = (document.getElementById('email') as HTMLInputElement).value;
    const password = (document.getElementById('password') as HTMLInputElement).value;
    const confirmPassword = (document.getElementById('confirmPassword') as HTMLInputElement).value;
    //check if password is valid and long enough
    if(password.length < 6){
      alert('Senha deve ter no mínimo 6 caracteres');
      return;
    }
    //check if passwords match
    if(password !== confirmPassword){
      alert('Senhas não coincidem');
      return;
    }
    //checar se é email ou ra
    if(email.includes('@')){
      //check if email is valid whit regex
      const emailRegex = /\S+@\S+\.\S+/;
      if(!emailRegex.test(email)){
        alert('Email inválido');
        return;
      }
      const response = await api.normalRegister(email, password);
      if (response) {
        // Registro bem-sucedido, redirecione o usuário
        checkUser();
      }
    } else {
      const raRegex = /^[0-9]{9}$/;
      if(!raRegex.test(email)){
        alert('RA inválido');
        return;
      }
      const response = await api.normalRegister(email, password);
      if (response) {
        alert('Registro bem-sucedido no sistema, por favor, confirme seu email para acessar');
        checkUser();
      }
    }
  }
  return (
    <div>
      <div className="background">
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
    </div>
    <Container
          className='border'
          display="flex"
          alignItems="center"
          justify="center"
          css={{ 
            minHeight: '100vh',
          }}
        >
        <Card className='gradient-border' css={{ 
          mw: '420px', 
          p: '20px',
          background: 'rgba( 0, 0, 0, 0.25 )',
          boxShadow: '0 8px 32px 0 rgba( 31, 38, 135, 0.37 )',
          backdropFilter: 'blur( 4px )',
          WebkitBackdropFilter: 'blur( 4px )',
          borderRadius: '10px',
          border: '1px solid rgba( 255, 255, 255, 0.18 )',
      }} variant="bordered">
          <Text
            size={24}
            weight="bold"
            css={{
              as: 'center',
              mb: '20px',
            }}
          >
            Cadastro Biblioteca
          </Text>
          <Input
            clearable
            underlined
            fullWidth
            color="primary"
            size="lg"
            placeholder="Email"
            id='email'
          />
          <Spacer y={0.5} />
          <Input
            clearable
            underlined
            fullWidth
            color="primary"
            size="lg"
            placeholder="Senha"
            type="password"
            id='password'
            css={{ mb: '6px' }}
          />
          <Input
            clearable
            underlined
            fullWidth
            color="primary"
            size="lg"
            placeholder="Confirme sua senha"
            type="password"
            id='confirmPassword'
            css={{ mb: '6px' }}
          />
          <Spacer y={0.5} />
          <Button auto onPress={handleRegister}>Registrar</Button>
          <Spacer y={0.5} />
          <Button auto onPress={toLogin}>Voltar</Button>
        </Card>
      </Container>
    </div>
  );
}