import { Container } from "@nextui-org/react";
import { NavbarWrapper } from "../components/navbar/Navbar";
import { Content } from "../components/home/content";

export default function Home() {
   return (
     <>
       <NavbarWrapper/>
        <Container>
            <Content/>
        </Container>
     </>
   );
 }