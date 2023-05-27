import React from "react";
import { Modal, Button, Text, Input, Loading } from "@nextui-org/react";
import { api } from "@/pages/api/appwrite";
import { useRouter } from "next/router";

interface BookCardProps {
  id: string,
  title: string, 
  author: string, 
  resume: string, 
  quantity: number, 
  imageUrl: string
}

export default function EditModal(prop: BookCardProps) {
  const [visible, setVisible] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [title, setTitle] = React.useState(prop.title);
  const [author, setAuthor] = React.useState(prop.author);
  const [resume, setResume] = React.useState(prop.resume);
  const [quantity, setQuantity] = React.useState(prop.quantity.toString());
  const [imageUrl, setImageUrl] = React.useState(prop.imageUrl);
  const handler = () => setVisible(true);
  const router = useRouter();

  const closeHandler = () => {
    setVisible(false);
    console.log("closed");
  };

  const edtiBook = async () => {
    setIsLoading(true);
    const title = document.getElementById("title") as HTMLInputElement;
    const author = document.getElementById("author") as HTMLInputElement;
    const resume = document.getElementById("resume") as HTMLInputElement;
    const quantity = document.getElementById("quantity") as HTMLInputElement;
    const imageUrl = document.getElementById("imageUrl") as HTMLInputElement;
    const numero = parseInt(quantity.value);

    if (numero < 1 || numero > 99) {
      alert("Quantidade deve ser um número entre 1 e 99");
      return;
    }
    if (
      !imageUrl.value.endsWith(".jpg") &&
      !imageUrl.value.endsWith(".png") &&
      !imageUrl.value.endsWith(".jpeg")
    ) {
      alert("Url da imagem da capa deve terminar com .jpg, .png ou .jpeg");
      return;
    }

    const response = await api.updateBook(prop.id, title.value, author.value, resume.value, numero, imageUrl.value);
    if (response) {
      setIsLoading(false);
      router.reload();
    } else {
      setIsLoading(false);
      alert("Erro ao editar o livro");
    }
  }

  const removeBook = async () => {
    setIsLoading(true);
    const response = await api.deleteBook(prop.id);
    if (response) {
      setIsLoading(false);
      router.reload();
    } else {
      setIsLoading(false);
      alert("Erro ao deletar o livro");
    }
  }

  return (
    <div>
      <Button auto shadow onPress={handler}>
        Editar
      </Button>
      <Modal
        closeButton
        aria-labelledby="modal-title"
        open={visible}
        onClose={closeHandler}
      >
        <Modal.Header>
          <Text id="modal-title" size={18}>
            Edite seu Livro
          </Text>
        </Modal.Header>
        <Modal.Body>
          <Input
            id="title"
            clearable
            value={title}
            onChange={e => setTitle(e.target.value)}
            bordered
            fullWidth
            color="primary"
            size="lg"
            placeholder="Titulo"
          />
          <Input
            id="author"
            clearable
            value={author}
            onChange={e => setAuthor(e.target.value)}
            bordered
            fullWidth
            color="primary"
            size="lg"
            placeholder="Autor"
          />
          <Input
            id="resume"
            clearable
            value={resume}
            onChange={e => setResume(e.target.value)}
            bordered
            fullWidth
            color="primary"
            size="lg"
            placeholder="Descrição"
          />
          <Input
            id="quantity"
            clearable
            value={quantity}
            onChange={e => setQuantity(e.target.value)}
            bordered
            fullWidth
            color="primary"
            size="lg"
            placeholder="Quantidade"
          />
          <Input
            id="imageUrl"
            clearable
            value={imageUrl}
            onChange={e => setImageUrl(e.target.value)}
            bordered
            fullWidth
            color="primary"
            size="lg"
            placeholder="URL da Imagem"
          />
        </Modal.Body>
        <Modal.Footer>
          <Button auto color="error" onPress={() => {closeHandler(); removeBook()}} disabled={isLoading}>
            {isLoading ? (
              <Loading type="points" color="currentColor" size="sm" />
            ) : (
              "Excluir"
            )}
          </Button>
          <Button auto onPress={() => {closeHandler(); edtiBook()}} disabled={isLoading}>
            {isLoading ? (
              <Loading type="points" color="currentColor" size="sm" />
            ) : (
              "Atualizar"
            )}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
