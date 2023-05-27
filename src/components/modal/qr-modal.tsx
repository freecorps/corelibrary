import { Modal, useModal, Button, Text, Card } from "@nextui-org/react";
import QRCode from 'qrcode.react';

interface BookCardProps {
  id: string,
  title: string, 
  author: string, 
  resume: string, 
  quantity: number, 
  imageUrl: string
}

export default function QrModal(book: BookCardProps) {
  const { setVisible, bindings } = useModal();
  return (
    <div>
      <Button auto shadow color="secondary" onPress={() => setVisible(true)}>
        Reservar
      </Button>
      <Modal
        width="600px"
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
        {...bindings}
      >
        <Card>
        <Modal.Header>
          <Text id="modal-title" size={18}>
            QR-Code:
          </Text>
        </Modal.Header>
        <Modal.Body >
          <QRCode renderAs="svg" value={book.id} style={{minHeight: "300px", minWidth: "300px", marginLeft: "auto", marginRight: "auto"}} />
        </Modal.Body>
        </Card>
        <Modal.Footer>
          <Button auto flat color="error" onPress={() => setVisible(false)}>
            Fechar
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}
