import React from "react";
import { Modal, Button, Text, Input, Tooltip, Grid} from "@nextui-org/react";
import { IconButton } from "../icons/table/icon-button";
import { EditIcon } from "../icons/table/edit-icon";

export default function UserEditModal() {
  const [visible, setVisible] = React.useState(false);
  const handler = () => setVisible(true);

  const closeHandler = () => {
    setVisible(false);
    console.log("closed");
  };

  return (
    <div>
      <Button bordered color="primary" auto ghost onPress={handler}>
      <Tooltip content="Edit user">
          <IconButton onClick={() => console.log("Edit user")}>
            <EditIcon size={20} fill="#979797" />
          </IconButton>
        </Tooltip>
      </Button>
      <Modal
        closeButton
        aria-labelledby="modal-title"
        open={visible}
        onClose={closeHandler}
      >
        <Modal.Header>
          <Text id="modal-title" size={18}>
          </Text>
        </Modal.Header>
        <Modal.Body>
          <Input
            clearable
            bordered
            fullWidth
            color="primary"
            size="lg"
            placeholder="avatar"
          />
        </Modal.Body>
        <Modal.Footer>
  <Grid.Container gap={1} justify="space-between">
    <Grid xs justify="flex-start">
      <Button size="sm" auto flat color="warning" onPress={closeHandler}>
        Suspender
      </Button>
    </Grid>
    <Grid xs justify="flex-end">
      <Button size="sm" auto flat color="error" onPress={closeHandler}>
        Excluir
      </Button>
    </Grid>
    <Grid xs justify="space-evenly">
      <Button size="sm" auto flat color="secondary" onPress={closeHandler}>
        Adicionar como bibliotecário
      </Button>
    </Grid>
    <Grid xs justify="flex-end">
      <Button size="sm" auto flat onPress={closeHandler}>
        Atualizar
      </Button>
    </Grid>
  </Grid.Container>
</Modal.Footer>
      </Modal>
    </div>
  );
}
