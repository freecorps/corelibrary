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
import { FcGoogle } from 'react-icons/fc';
import { FaDiscord, FaGithub } from 'react-icons/fa';

export default function Login() {

  const router = useRouter()

  const checkUser = async () => {
    const userId = await api.getCurrentUser();
    if (userId) {
        router.push('/home')
    }
  }

  const toRegister = () => {
    router.push('/register')
  }

  useEffect(() => {
      checkUser()
  }, [])

  // Adicione funções para lidar com o login de cada provedor
  const handleGoogleLogin = async () => {
    // Lógica de login com o Google
    try {
      await api.loginWithGoogle();
    } catch (error: any) {
      console.log(error.message);
    }
  };

  const handleDiscordLogin = async () => {
    try {
      await api.loginWithDiscord();
    }
    catch (error: any) {
      console.log(error.message);
    }
  };

  const handleGithubLogin = async () => {
    try {
      await api.loginWithGithub();
    }
    catch (error: any) {
      console.log(error.message);
    }
  };

  const handleNormalLogin = async () => {
    const email = (document.getElementById('email') as HTMLInputElement).value;
    const password = (document.getElementById('password') as HTMLInputElement).value;
    const response = await api.normalLogin(email, password);
    if (response) {
      // Login bem-sucedido, redirecione o usuário
      checkUser();
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
            Login Biblioteca
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
          <Spacer y={1} />
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
          <Spacer y={1} />
          <Button auto onPress={handleNormalLogin}>Login</Button>
          <Spacer y={0.5} />
          <Text size={14} css={{textAlign: 'center'}}>Näo tem uma conta?</Text>
          <Spacer y={0.5} />
          <Button auto onPress={toRegister}>Faça o registro</Button>
          <Spacer y={0.5} />
          <Text size={16} css={{ textAlign: 'center', marginBottom: '1rem' }}>
            Ou entre com
          </Text>
          <Row justify="center">
            <Button auto onPress={handleGoogleLogin} icon={<FcGoogle />} aria-labelledby='Botão login Google'/>
            <Spacer x={0.5} />
            <Button auto onPress={handleDiscordLogin} icon={<FaDiscord />} aria-labelledby='Botão login Discrod'/>
            <Spacer x={0.5} />
            <Button auto onPress={handleGithubLogin} icon={<FaGithub />} aria-labelledby='Botão login Github'/>
          </Row>
        </Card>
      </Container>
    </div>
  );
}