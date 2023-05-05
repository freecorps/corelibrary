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

export default function Login() {
  // Adicione funções para lidar com o login de cada provedor

  const handleRegister = () => {
    // Lógica de login normal

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
            placeholder="Email/RA"
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
          <Input
            clearable
            underlined
            fullWidth
            color="primary"
            size="lg"
            placeholder="Confirme sua senha"
            type="password"
            id='password'
            css={{ mb: '6px' }}
          />
          <Spacer y={0.5} />
          <Button auto onPress={handleRegister}>Registrar</Button>
        </Card>
      </Container>
    </div>
  );
}