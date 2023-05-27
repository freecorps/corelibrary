import { Modal, useModal, Button, Text, Card, Grid, Image } from "@nextui-org/react";
import EditModal from "./Edit-modal";
import QrModal from "./qr-modal";

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
            <Button auto 
  as="a"
  rel="noopener noreferrer"
  target="_blank"
  css={{ 
    maxWidth: '$12', // space[12]
    borderRadius: '$xs', // radii.xs
    border: '$space$1 solid $gray400',
    background: '$transparent', // colors.gray800
    color: '$gray100',
    height: '$12', // space[12]
    boxShadow: '$md', // shadows.md
    borderBlock: '$space$1 solid $gray400',
    '&:hover': {
      background: '$gray100',
      color: '$gray800',
    },
    '&:active': {
      background: '$gray200',
    },
    '&:focus': {
      borderColor: '$gray400',
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
                    <QrModal />
                    <EditModal />
                </Modal.Footer>
            </Modal>
        </div>
    );
}



