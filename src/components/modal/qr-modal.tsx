import React, { useEffect, useState } from 'react';
import { Modal, useModal, Button, Text, Card } from "@nextui-org/react";
import QRCode from 'qrcode.react';
import { api } from '@/pages/api/appwrite';

interface BookCardProps {
  id: string,
  title: string,
  author: string,
  resume: string,
  quantity: number,
  imageUrl: string
}

export default function QrModal(book: BookCardProps) {
  const { setVisible, bindings } = useModal();
  const [isReservable, setIsReservable] = useState(false);

  const checkConditions = async () => {
    try {
      await api.autoBlock();
      const isBlocked = await api.chekIfUserIsBlocked();
      const hasReserved = await api.checkIfUserHasReservedBook(book.id);
      //check if user has 3 reservations
      const reservations = await api.getReservedBooks()
      if (reservations.length >= 3) {
        setIsReservable(false);
        return;
      }
      if (isBlocked || hasReserved) {
        setIsReservable(false);
      }
      else {
        setIsReservable(true);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const reserv = async () => {
    try {
      await api.reserveBook(book.id);
    } catch (error) {
      alert("Não foi possível reservar o livro");
      console.error(error);
    }
  }

  useEffect(() => {
    checkConditions();
  }, []);

  return (
    <div>
      <Button auto shadow color="secondary" onPress={() => { setVisible(true); reserv() }} disabled={!isReservable}>
        Reservar
      </Button>
      <Modal
        width="600px"
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
        {...bindings}
      >
        <Card>
          <Modal.Header>
            <Text id="modal-title" size={18}>
              QR-Code:
            </Text>
          </Modal.Header>
          <Modal.Body >
            <QRCode renderAs="svg" value={book.id} style={{ minHeight: "300px", minWidth: "300px", marginLeft: "auto", marginRight: "auto" }} />
          </Modal.Body>
        </Card>
        <Modal.Footer>
          <Button auto flat color="error" onPress={() => setVisible(false)}>
            Fechar
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}
