import React from "react";
import { Modal, Button, Text, Input, Row, Checkbox } from "@nextui-org/react";


interface ConfigurationModalProps {
    visible: boolean;
    setVisible: (visible: boolean) => void;
  }
  
  export const ConfigurationModal: React.FC<ConfigurationModalProps> = ({ visible, setVisible }) => {
    const closeHandler = () => {
      setVisible(false);
      console.log("closed");
    };
  return (
    <div>
      <Modal
        blur
        closeButton
        aria-labelledby="modal-title"
        open={visible}
        onClose={closeHandler}
      >
        <Modal.Header>
          <Text id="modal-title" size={18}>
            Configurations
          </Text>
        </Modal.Header>
        <Modal.Body>
          <Input
            clearable
            bordered
            fullWidth
            color="primary"
            size="lg"
            placeholder="Mude seu avatar"
            //onChange={(e) => setAvatar(e.target.value)}  
          />
        </Modal.Body>
        <Modal.Footer>
          <Button auto flat color="error" onPress={closeHandler}>
            Close
          </Button>
          <Button auto onPress={closeHandler}>
            Atualizar
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
