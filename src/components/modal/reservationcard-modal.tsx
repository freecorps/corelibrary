import { Modal, useModal, Button, Text, Card, Grid, Image } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { api } from "@/pages/api/appwrite";

interface BookCardProps {
    id: string,
    title: string, 
    author: string, 
    resume: string, 
    quantity: number, 
    imageUrl: string
    date: string
}

interface Reservation {
    user: string,
    bookId: string,
    date: string,
    done: boolean,
}

export default function ReservationcardModal(props: BookCardProps) {
    const [isLibrarian, setIsLibrarian] = useState(false);
    const [reservation, setReservation] = useState<Reservation>();
    let date = new Date(props.date)  

    date.setDate(date.getDate() + 5);

    let cleber = date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear();

    const checkConditions = async () => {
        try {
          const isUserLibrarian = await api.checkIfUserIsLibrarian();
          setIsLibrarian(isUserLibrarian);
            const reservationData = await api.checkIfUserHasReservedBook(props.id);
            if (reservationData) {
                setReservation(reservationData);
            }
        } catch (error) {
          console.error(error);
        }
    };

    useEffect(() => {
        checkConditions();
    }, []);

    const { setVisible, bindings } = useModal();
    return (
        <div>
            <Button auto 
  as="a"
  rel="noopener noreferrer"
  target="_blank"
  css={{ 
    maxWidth: '$12', // space[12]
    borderRadius: '$xs', // radii.xs
    border: '$space$1 solid #3A3F42',
    background: '$transparent', // colors.gray800
    color: '#26292B',
    height: '$12', // space[12]
    boxShadow: '$md', // shadows.md
    borderBlock: '$space$1 solid #3A3F42',
    '&:hover': {
      background: '#26292B',
      color: '#9BA1A6',
    },
    '&:active': {
      background: '#2B2F31',
    },
    '&:focus': {
      borderColor: '#3A3F42',
    },
  }}
   onPress={() => setVisible(true)}>
                + Mais
            </Button>
            <Modal  
                width="600px"
                aria-labelledby="modal-title"
                aria-describedby="modal-description"
                {...bindings}
            >
                <Grid.Container gap={2} justify="center">
                    <Grid xs={12} sm={6}>
                        <Card css={{
                            borderRadius: '$xl',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            overflow: 'hidden'
                        }}>
                            <Image
                                src={props.imageUrl}
                                width="100%"
                                height="100%"
                                alt="Book Image"
                                style={{objectFit: 'cover', maxWidth: '100%', maxHeight: '100%'}}
                            />
                        </Card>
                    </Grid>
                    <Grid xs={12} sm={6}>
                        <Card>
                            <Modal.Header>
                                <Text id="modal-title" size={18}>
                                    Titulo: {props.title}
                                </Text>
                            </Modal.Header>
                            <Modal.Body style={{ overflowY: 'auto', maxHeight: 'calc(60vh - 50px)' }}>
                                <Text id="modal-description" size={14}>
                                    Autor: {props.author}
                                </Text> 
                                <Text id="modal-description" size={14}>
                                    Descricao: {props.resume}
                                </Text>
                                <Text id="modal-description" size={14}>
                                    Data máxima de devolução: {cleber}
                                </Text>
                            </Modal.Body>
                        </Card>
                    </Grid>
                </Grid.Container>
                    <Modal.Footer>
                        <Button auto flat color="error" onPress={() => setVisible(false)}>
                            Fechar
                        </Button>
                    </Modal.Footer>
            </Modal>
        </div>
    );
}



