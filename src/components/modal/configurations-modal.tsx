import React from "react";
import { Modal, Button, Text, Input, Row, Checkbox, User } from "@nextui-org/react";
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
interface ConfigurationModalProps {
  visible: boolean;
  setVisible: (visible: boolean) => void;
  link: string | undefined;
  id: string | undefined;
}
  
export const ConfigurationModal: React.FC<ConfigurationModalProps> = ({ visible, setVisible, link, id }) => {
  const [isLoading, setIsLoading] = React.useState(false);
  const [profilePicture, setProfilePicture] = React.useState(link);
  const updateAvatar = async () => {
    setIsLoading(true);
    if(!id || !profilePicture) {
      //check if profilePicture ends with .jpg, .png or .jpeg or .gif
      setIsLoading(false);

      if(profilePicture && !profilePicture.endsWith(".jpg") &&
      !profilePicture.endsWith(".png") &&
      !profilePicture.endsWith(".jpeg") &&
      !profilePicture.endsWith(".gif")) {
        alert("Url da imagem da capa deve terminar com .jpg, .png ou .jpeg");
        return;
      }
      alert("Erro ao atualizar o avatar");
      return;
    }
    const response = await api.setProfilePicture(id, profilePicture);
    if (response) {
      setIsLoading(false);
      window.location.reload();
    } else {
      setIsLoading(false);
      alert("Erro ao atualizar o avatar");
    }
  }
  const closeHandler = async () => {
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
            onChange={(e) => setProfilePicture(e.target.value)}  
          />
        </Modal.Body>
        <Modal.Footer>
          <Button auto flat color="error" onPress={closeHandler}>
            Close
          </Button>
          <Button auto onPress={() => {closeHandler(); updateAvatar()}} disabled={isLoading} >
            Atualizar
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
