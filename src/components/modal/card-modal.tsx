import { Modal, useModal, Button, Text } from "@nextui-org/react";
import EditModal from "./Edit-modal";

export default function CardModal() {
    const { setVisible, bindings } = useModal();
    return (
        <div>
            <Button auto shadow color="gradient" onPress={() => setVisible(true)}>
                + Mais
            </Button>
            <Modal
                scroll
                width="600px"
                aria-labelledby="modal-title"
                aria-describedby="modal-description"
                {...bindings}
            >
                <Modal.Header>
                    <Text id="modal-title" size={18}>
                        Modal with a lot of content
                    </Text>
                </Modal.Header>
                <Modal.Body>
                    <Text id="modal-description">
                        magna, vel scelerisque nisl consectetur et. Cras mattis consectetur
                    </Text>
                </Modal.Body>
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