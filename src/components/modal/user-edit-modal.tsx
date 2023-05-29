import React from "react";
import { Modal, Button, Text, Input, Tooltip, Grid} from "@nextui-org/react";
import { IconButton } from "../icons/table/icon-button";
import { EditIcon } from "../icons/table/edit-icon";
import { api } from "@/pages/api/appwrite";

interface User {
  id: string,
  user: string,
  blocked: boolean,
  blockedCount: number,
  isLibrarian: boolean,
  name: string,
  approved: boolean,
  photoURL?: string,
}

interface UserEditModalProps {
  usuario: User;
}

export default function UserEditModal({ usuario }: UserEditModalProps) {
  const [user, setUser] = React.useState<User | null>(null);
  const [isLoading, setIsLoading] = React.useState(false);
  const [checkLibraryan, setCheck] = React.useState(false);
  const [visible, setVisible] = React.useState(false);
  const [avatar, setAvatar] = React.useState("");
  const handler = () => setVisible(true);

  React.useEffect(() => {
    const fetchUser = async () => {
      const data = await api.getUserById(usuario.user);
      console.log(data)
      if (data.isLibrarian) {
        setCheck(true);
      }
      setUser(data);
    };
    fetchUser();
  }, []);

  const atualizarUser = async () => {
    setIsLoading(true);
    const response = await api.setProfilePicture(usuario.id, avatar);
    if (response) {
      setIsLoading(false);
      window.location.reload();
    } else {
      setIsLoading(false);
      alert("Erro ao atualizar o usuário");
    }
  }

  const excluirUser = async () => {
    setIsLoading(true);
    const response = await api.removeUser(usuario.id);
    if (response) {
      setIsLoading(false);
      window.location.reload();
    } else {
      setIsLoading(false);
      alert("Erro ao excluir o usuário");
    }
  }

  const suspenderuser = async () => {
    setIsLoading(true);

    if(usuario.approved) {
      const response = await api.suspendUser(usuario.id);
      if (response) {
        setIsLoading(false);
        window.location.reload();
        return
      } else {
        setIsLoading(false);
        alert("Erro ao suspender o usuário");
        return
      }
    }
    const response = await api.approvUser(usuario.id);
    if (response) {
      setIsLoading(false);
      window.location.reload();
      return
    } else {
      setIsLoading(false);
      alert("Erro ao remover suspensão o usuário");
      return
    }
  }

  const setBibliotecario = async () => {
    setIsLoading(true);
    const response = await api.setUserAsLibrarian(usuario.id);
    if (response) {
      setIsLoading(false);
      window.location.reload();
    } else {
      setIsLoading(false);
      alert("Erro ao adicionar como bibliotecário");
    }
  }

  const bloquearUser = async () => {
    setIsLoading(true);

    if(usuario.blocked){
      const response = await api.unblockUser(usuario.id);
      if (response) {
        setIsLoading(false);
        window.location.reload();
        return
      } else {
        setIsLoading(false);
        alert("Erro ao desbloquear o usuário");
        return
      }
    }
    const response = await api.blockUser(usuario.user, usuario.id);
    console.log(response)
    if (response) {
      setIsLoading(false);
      return
    } else {
      setIsLoading(false);
      alert("Erro ao bloquear o usuário");
      return
    }
  }

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
            value={user?.photoURL || ""}
            onChange={(e) => setAvatar(e.target.value)}
          />
        </Modal.Body>
        <Modal.Footer>
  <Grid.Container gap={1} justify="space-between">
    <Grid xs justify="flex-start">
    <Button size="sm" auto flat color="warning" onPress={() => {closeHandler(); suspenderuser()}} disabled={isLoading}>
      { user?.approved ? "Suspender" : "Aprovar"}
    </Button>
    <Button size="sm" auto flat color="warning" onPress={() => {closeHandler(); bloquearUser()}} disabled={isLoading}>
      { user?.blocked ? "Desbloquear" : "Bloquear"}
    </Button>
    </Grid>
    <Grid xs justify="flex-end">
      <Button size="sm" auto flat color="error" onPress={() => {closeHandler(); excluirUser()}} disabled={isLoading}>
        Excluir
      </Button>
    </Grid>
    <Grid xs justify="space-evenly">
      <Button size="sm" auto flat color="secondary" onPress={() => {closeHandler(); setBibliotecario()}} disabled={checkLibraryan || isLoading}>
        Adicionar como bibliotecário
      </Button>
    </Grid>
    <Grid xs justify="flex-end">
      <Button size="sm" auto flat onPress={() => {closeHandler(); atualizarUser()}} disabled={isLoading}>
        Atualizar
      </Button>
    </Grid>
  </Grid.Container>
</Modal.Footer>
      </Modal>
    </div>
  );
}
