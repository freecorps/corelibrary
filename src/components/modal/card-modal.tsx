import { Modal, useModal, Button, Text, Card, Grid, Image } from "@nextui-org/react";
import EditModal from "./Edit-modal";

interface BookCardProps {
    id: string,
    title: string, 
    author: string, 
    resume: string, 
    quantity: number, 
    imageUrl: string
}

export default function CardModal(props: BookCardProps) {
    const { setVisible, bindings } = useModal();
    return (
        <div>
            <Button auto shadow color="gradient" onPress={() => setVisible(true)}>
                + Mais
            </Button>
            <Modal  
                css={{
                    '@media (max-width: 600px)': {
                    maxWidth: '90%',
                    maxHeight: '300vh',
                    overflow: 'auto', // Adicionado overflow aqui
                    minWidth: '350px',  // Adicionado minWidth aqui
                    },
                    '@media (min-width: 601px)': {
                    maxWidth: '80%',
                    },
                    borderRadius: '$xl',
                }}
                scroll
                width="50%"
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
                                height="100%" // altere para 100%
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
                            <Modal.Body style={{ overflowY: 'auto', maxHeight: '60vh' }}>
                                <Text id="modal-description" size={14}>
                                    Autor: {props.author}
                                </Text> 
                                <Text id="modal-description" size={14}>
                                    Descricao: {props.resume}
                                </Text>
                                <Text id="modal-description" size={14}>
                                    Quantidade: {props.quantity}
                                </Text>
                            </Modal.Body>
                        </Card>
                    </Grid>
                </Grid.Container>

                <Modal.Footer>
                    <Button auto flat color="error" onPress={() => setVisible(false)}>
                        Close
                    </Button>
                    <EditModal />
                </Modal.Footer>
            </Modal>
        </div>
    );
}
