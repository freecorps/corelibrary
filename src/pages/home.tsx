import { Container } from "@nextui-org/react";
import { NavbarWrapper } from "../components/navbar/Navbar";
import { Content } from "../components/home/content";

export default function Home() {
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
