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
import { FaApple, FaGithub, FaMicrosoft } from 'react-icons/fa';

export default function Login() {
  // Adicione funções para lidar com o login de cada provedor
  const handleGoogleLogin = () => {
    // Lógica de login com o Google
  };

  const handleAppleLogin = () => {
    // Lógica de login com a Apple
  };

  const handleGithubLogin = () => {
    // Lógica de login com o GitHub
  };

  const handleMicrosoftLogin = () => {
    // Lógica de login com a Microsoft
  };

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
        <Card css={{ 
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
            Biblioteca Facamp
          </Text>
          <Input
            clearable
            underlined
            fullWidth
            color="primary"
            size="lg"
            placeholder="Email"
          />
          <Spacer y={1} />
          <Input
            clearable
            underlined
            fullWidth
            color="primary"
            size="lg"
            placeholder="Password"
            css={{ mb: '6px' }}
          />
          <Row justify="space-between">
            <Checkbox>
              <Text size={14}>Lembrar conta</Text>
            </Checkbox>
            <Text size={14}>Esqueceu a senha?</Text>
          </Row>
          <Spacer y={1} />
          <Button>Sign in</Button>
          <Spacer y={0.5} />
          <Text size={14} css={{textAlign: 'center'}}>Já tem uma conta?</Text>
          <Spacer y={0.5} />
          <Button>Login</Button>
          <Spacer y={0.5} />
          <Text size={16} css={{ textAlign: 'center', marginBottom: '1rem' }}>
            Ou entre com
          </Text>
          <Row justify="center">
            <Button auto onClick={handleGoogleLogin} icon={<FcGoogle />} />
            <Spacer x={0.5} />
            <Button auto onClick={handleAppleLogin} icon={<FaApple />} />
            <Spacer x={0.5} />
            <Button auto onClick={handleGithubLogin} icon={<FaGithub />} />
            <Spacer x={0.5} />
            <Button auto onClick={handleMicrosoftLogin} icon={<FaMicrosoft />} />
          </Row>
        </Card>
      </Container>
    </div>
  );
}