import { Table, Row, Col, Tooltip, Text, Badge } from "@nextui-org/react";
import { StyledBadge } from "./table-styled";
import { IconButton } from "../icons/table/icon-button";
import { EyeIcon } from "../icons/table/eye-icon";
import { EditIcon } from "../icons/table/edit-icon";
import { DeleteIcon } from "../icons/table/delete-icon";
import { Box } from "../styles/box";
import UserEditModal from "../modal/user-edit-modal";

import { useMediaQuery } from 'react-responsive'
import React, { useEffect, useState } from "react";
import { api } from "@/pages/api/appwrite";

interface UserAPI {
  user: string,
  blocked: boolean,
  blockedCount: number,
  isLibrarian: boolean,
  name: string,
  approved: boolean,
  photoURL?: string,
}

interface User {
  $id: string,
  name: string,
  email: string,
  isLibrarian: boolean,
  approved: boolean,
  blocked: boolean,
  blockedCount: number,
  avatar?: string,
}

export default function TableWrapper() {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const data = await api.getAllUsers();
      setUsers(
        data.map((user: UserAPI) => ({
          key: user.user,
          $id: user.user,
          name: user.name,
          email: user.user,
          isLibrarian: user.isLibrarian,
          approved: user.approved,
          blocked: user.blocked,
          blockedCount: user.blockedCount,
          avatar: user.photoURL,
        })),
      );
    };
    fetchUsers();
  }, []);  

  const columns = [
    { name: "NAME", uid: "name" },
    { name: "ROLE", uid: "role" },
    { name: "STATUS", uid: "status" },
    { name: "ACTIONS", uid: "actions" },
  ];

  const isBigScreen = useMediaQuery({ minWidth: 1824 })
  const isDesktopOrLaptop = useMediaQuery({ minWidth: 1224 })
  const isTabletOrMobile = useMediaQuery({ maxWidth: 1224 })

  let rowsPerPage = 8;
  if (isTabletOrMobile) {
    rowsPerPage = 4;
  } else if (isDesktopOrLaptop) {
    rowsPerPage = 6;
  } else if (isBigScreen) {
    rowsPerPage = 8;
  }

  const approveUser = async (userId: string) => {
    // Call your API method to approve the user
  };

  const blockUser = async (userId: string) => {
    // Call your API method to block the user
  };

  const renderCell = (user: User, columnKey: React.Key) => {
    const cellValue = user[columnKey as keyof User];
    switch (columnKey) {
      case "name":
        return <Text>{cellValue}</Text>;
      case "role":
        return <Text>{user.isLibrarian ? "Librarian" : "User"}</Text>;
      case "status":
        let status = "Normal";
        let statusColor = "success";
        if (user.blocked) {
          status = "Blocked";
          statusColor = "error";
        } else if (!user.approved) {
          status = "Not Approved";
          statusColor = "warning";
        }
        return <Badge color={"success"}>{status}</Badge>;
      case "actions":
        return (
          <Row gap={0.8}>
            <IconButton aria-label="Edit user" onClick={() => approveUser(user.$id)}>
              <EditIcon />
            </IconButton>
            <IconButton aria-label="Block user" onClick={() => blockUser(user.$id)}>
              <DeleteIcon />
            </IconButton>
          </Row>
        );
      default:
        return cellValue;
    }
  };

  const renderActions = (user: User) => (
    <Row justify="center" align="center">
      <Col css={{ d: "flex" }}>
        <UserEditModal />
      </Col>
    </Row>
  );  
  
  return (
    <Box css={{
      '& .nextui-table-container': {
         boxShadow: 'none',
      },
   }}>
    <Table 
      aria-label="Example table with custom cells"
      css={{
        height: "auto",
        minWidth: "100%",
        overflowX: 'auto',
        boxShadow: 'none',
        width: '100%',
        px: 0,
      }}
      selectionMode="multiple"
    >
      <Table.Header columns={columns}>
        {(column) => (
          <Table.Column
            key={column.uid}
            hideHeader={column.uid === "actions"}
            align={column.uid === "actions" ? "center" : "start"}
          >
            {column.name}
          </Table.Column>
        )}
      </Table.Header>
      <Table.Body items={users}>
          {(item: User) => (
            <Table.Row>
              {(columnKey) => (
                <Table.Cell>
                  {columnKey === 'actions' ? renderActions(item) : renderCell(item, columnKey)}
                </Table.Cell>
              )}
            </Table.Row>
          )}
      </Table.Body>
      <Table.Pagination
               shadow
               noMargin
               align="center"
               rowsPerPage={rowsPerPage}
              onPageChange={(page) => console.log({page})}
            />
    </Table>
  </Box>
  );
}
