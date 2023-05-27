import { Modal, useModal, Button, Text } from "@nextui-org/react";


export default function QrModal() {
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
        <Modal.Header>
          <Text id="modal-title" size={18}>
            QR-Code:
          </Text>
        </Modal.Header>
        <Modal.Body>
          <Text id="modal-description">
            Algo
          </Text>
        </Modal.Body>
        <Modal.Footer>
          <Button auto flat color="error" onPress={() => setVisible(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
