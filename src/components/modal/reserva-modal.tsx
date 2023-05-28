import { Modal, useModal, Button, Text } from "@nextui-org/react";
import { ContentReservations } from "../home/reservation-content";

export default function ReservationModal() {
  const { setVisible, bindings } = useModal();
  return (
    <div>
      <Button auto shadow color="warning" onPress={() => setVisible(true)}>
        Reservas
      </Button>
      <Modal
        width="50%"
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
        {...bindings}
      >
        <Modal.Header>
          <Text id="modal-title" size={18}>
            Minhas Reservas
          </Text>
        </Modal.Header>
        <Modal.Body>
          <ContentReservations />
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
