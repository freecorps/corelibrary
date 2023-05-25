import { Container } from "@nextui-org/react";
import { UserNavbarWrapper } from "../components/user-navbar/user-navbar";
import { Content } from "../components/home/content";

export default function Home() {
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
