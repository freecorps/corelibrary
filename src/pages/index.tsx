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
      <Container
        display="flex"
        alignItems="center"
        justify="center"
        css={{ minHeight: '100vh' }}
      >
        <Card css={{ mw: '420px', p: '20px' }} variant="bordered">
          <Text
            size={24}
            weight="bold"
            css={{
              as: 'center',
              mb: '20px',
            }}
          >
            NextUI Login
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
              <Text size={14}>Remember me</Text>
            </Checkbox>
            <Text size={14}>Forgot password?</Text>
          </Row>
          <Spacer y={1} />
          <Button>Sign in</Button>
          <Spacer y={2} />
          <Text size={16} css={{ textAlign: 'center', marginBottom: '1rem' }}>
            Or sign in with
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