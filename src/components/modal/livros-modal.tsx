import React from "react";
import { Modal, Input, Row, Checkbox, Button, Text } from "@nextui-org/react";
import { api } from "../../pages/api/appwrite";

export default function LivroModal() {
  const [visible, setVisible] = React.useState(false);
  const [title, setTitle] = React.useState("");
  const [author, setAuthor] = React.useState("");
  const [summary, setSummary] = React.useState("");
  const [quantity, setQuantity] = React.useState("");
  const [bookUrl, setBookUrl] = React.useState("");

  const handler = () => setVisible(true);
  const closeHandler = () => {
    setVisible(false);
    console.log("closed");
  };
  function adicionarlivros() {
    const numero = parseInt(quantity);
    if (numero < 1 || numero > 99) {
      alert("Quantidade deve ser um número entre 1 e 99");
      return;
    }
    if (
      !bookUrl.endsWith(".jpg") &&
      !bookUrl.endsWith(".png") &&
      !bookUrl.endsWith(".jpeg")
    ) {
      alert("Url da imagem da capa deve terminar com .jpg, .png ou .jpeg");
      return;
    }
    api.addBook(title, author, summary, numero, bookUrl);
  }

  return (
    <div>
      <Button auto color="warning" shadow onPress={handler}>
        + Livros
      </Button>
      <Modal
        closeButton
        blur
        aria-labelledby="modal-title"
        open={visible}
        onClose={closeHandler}
      >
        <Modal.Header>
          <Text id="modal-title" size={18}>
            Adicione um livro
          </Text>
        </Modal.Header>
        <Modal.Body>
          <Input
            clearable
            bordered
            fullWidth
            color="primary"
            size="lg"
            placeholder="Titulo"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <Input
            clearable
            bordered
            fullWidth
            color="primary"
            size="lg"
            placeholder="Autor"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
          />
          <Input
            clearable
            bordered
            fullWidth
            color="primary"
            size="lg"
            placeholder="Resumo"
            value={summary}
            onChange={(e) => setSummary(e.target.value)}
          />
          <Input
            clearable
            bordered
            fullWidth
            color="primary"
            size="lg"
            type="number" 
            placeholder="Quantidade"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
          />
          <Input
            clearable
            bordered
            fullWidth
            color="primary"
            size="lg"
            type="url"
            placeholder="Url da imagem da capa"
            value={bookUrl}
            onChange={(e) => setBookUrl(e.target.value)}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button auto flat color="error" onPress={closeHandler}>
            Fechar
          </Button>
          <Button auto onPress={adicionarlivros}>
            Adicionar
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
