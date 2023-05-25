import React from "react";
import { Modal, Input, Row, Checkbox, Button, Text } from "@nextui-org/react";
import { AccountTable } from "../accounts/accounts-table";

export default function UserModal() {
  const [visible, setVisible] = React.useState(false);
  const handler = () => setVisible(true);
  const closeHandler = () => {
    setVisible(false);
    console.log("closed");
  };
  return (
    <div>
      <Button auto color="warning" shadow onPress={handler}>
        Usuarios
      </Button>
      <Modal css={{
            '& .nextui-table-container': {
               boxShadow: 'none',
            },
         }}
        scroll
        width="50%"
        closeButton
        blur
        aria-labelledby="modal-title"
        open={visible}
        onClose={closeHandler}
      >
        <Modal.Header>
          <AccountTable />
        </Modal.Header>
        <Modal.Footer>
          <Button auto flat color="error" onPress={closeHandler}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

