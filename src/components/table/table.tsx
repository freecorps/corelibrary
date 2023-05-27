import { Table, Row, Col, Tooltip, User, Text } from "@nextui-org/react";
import { StyledBadge } from "./table-styled";
import { IconButton } from "../icons/table/icon-button";
import { EyeIcon } from "../icons/table/eye-icon";
import { EditIcon } from "../icons/table/edit-icon";
import { DeleteIcon } from "../icons/table/delete-icon";
import { Box } from "../styles/box";

import { useMediaQuery } from 'react-responsive'

type UserType = {
  id: string | number,
  name?: string,
  email?: string,
  role?: string,
  team?: string,
  status: "active" | "suspended" ,
  age?: string,
  avatar?: string,
};

export default function TableWrapper() {
  const columns = [
    { name: "NAME", uid: "name" },
    { name: "ROLE", uid: "role" },
    { name: "STATUS", uid: "status" },
    { name: "ACTIONS", uid: "actions" },
  ];
const users: UserType[] = [
    {
      id: 1,
      name: "Tony Reichert",
      role: "CEO",
      team: "Management",
      status: "active",
      age: "29",
      avatar: "https://i.pravatar.cc/150?u=a042581f4e29026024d",
      email: "tony.reichert@example.com",
    },
    {
      id: 2,
      name: "Zoey Lang",
      role: "Technical Lead",
      team: "Development",
      status: "suspended",
      age: "25",
      avatar: "https://i.pravatar.cc/150?u=a042581f4e29026704d",
      email: "zoey.lang@example.com",
    },
    {
      id: 3,
      name: "Jane Fisher",
      role: "Senior Developer",
      team: "Development",
      status: "active",
      age: "22",
      avatar: "https://i.pravatar.cc/150?u=a04258114e29026702d",
      email: "jane.fisher@example.com",
    },
    {
      id: 4,
      name: "William Howard",
      role: "Community Manager",
      team: "Marketing",
      status: "suspended",
      age: "28",
      avatar: "https://i.pravatar.cc/150?u=a048581f4e29026701d",
      email: "william.howard@example.com",
    },
    {
      id: 5,
      name: "Kristen Copper",
      role: "Sales Manager",
      team: "Sales",
      status: "active",
      age: "24",
      avatar: "https://i.pravatar.cc/150?u=a092581d4ef9026700d",
      email: "kristen.cooper@example.com",
    },
    {
        id: 6,
        name: 'Tony Reichert',
        role: 'CEO',
        team: 'Management',
        status: 'active',
        age: '29',
        avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026024d',
        email: 'tony.reichert@example.com',
     },
     {
        id: 10,
        name: 'Kristen Copper',
        role: 'Sales Manager',
        team: 'Sales',
        status: 'active',
        age: '24',
        avatar: 'https://i.pravatar.cc/150?u=a092581d4ef9026700d',
        email: 'kristen.cooper@example.com',
     },
     {
        id: 8,
        name: 'Jane Fisher',
        role: 'Senior Developer',
        team: 'Development',
        status: 'active',
        age: '22',
        avatar: 'https://i.pravatar.cc/150?u=a04258114e29026702d',
        email: 'jane.fisher@example.com',
     },
     {
        id: 7,
        name: 'Zoey Lang',
        role: 'Technical Lead',
        team: 'Development',
        status: 'suspended',
        age: '25',
        avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026704d',
        email: 'zoey.lang@example.com',
     },
  
     {
        id: 9,
        name: 'William Howard',
        role: 'Community Manager',
        team: 'Marketing',
        status: 'suspended',
        age: '28',
        avatar: 'https://i.pravatar.cc/150?u=a048581f4e29026701d',
        email: 'william.howard@example.com',
     },
     {
        id: 11,
        name: 'Tony Reichert',
        role: 'CEO',
        team: 'suspended',
        status: 'active',
        age: '29',
        avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026024d',
        email: 'tony.reichert@example.com',
     },
     {
        id: 12,
        name: 'Kristen Copper',
        role: 'Sales Manager',
        team: 'Sales',
        status: 'active',
        age: '24',
        avatar: 'https://i.pravatar.cc/150?u=a092581d4ef9026700d',
        email: 'kristen.cooper@example.com',
     },
     {
        id: 13,
        name: 'Jane Fisher',
        role: 'Senior Developer',
        team: 'Development',
        status: 'active',
        age: '22',
        avatar: 'https://i.pravatar.cc/150?u=a04258114e29026702d',
        email: 'jane.fisher@example.com',
     },
     {
        id: 14,
        name: 'Zoey Lang',
        role: 'Technical Lead',
        team: 'Development',
        status: 'suspended',
        age: '25',
        avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026704d',
        email: 'zoey.lang@example.com',
     },
     {
        id: 15,
        name: 'Tony Reichert',
        role: 'CEO',
        team: 'Management',
        status: 'active',
        age: '29',
        avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026024d',
        email: 'tony.reichert@example.com',
     },
     {
        id: 16,
        name: 'Kristen Copper',
        role: 'Sales Manager',
        team: 'Sales',
        status: 'active',
        age: '24',
        avatar: 'https://i.pravatar.cc/150?u=a092581d4ef9026700d',
        email: 'kristen.cooper@example.com',
     },
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

  const renderCell = (user: any, columnKey: React.Key) => {
    const cellValue = user[columnKey];
    switch (columnKey) {
      case "name":
        return (
          <User squared src={user?.avatar} name={cellValue} css={{ p: 0 }}>
            {user?.email}
          </User>
        );
      case "role":
        return (
          <Col>
            <Row>
              <Text b size={14} css={{ tt: "capitalize" }}>
                {cellValue}
              </Text>
            </Row>
            <Row>
              <Text b size={13} css={{ tt: "capitalize", color: "$accents7" }}>
                {user?.team}
              </Text>
            </Row>
          </Col>
        );
      case "status":
        return <Row justify="flex-start" align="baseline">
        <StyledBadge type={user?.status}>{cellValue}</StyledBadge>
        </Row>

      case "actions":
        return (
          <Row justify="center" align="center">
            <Col css={{ d: "flex" }}>
              <Tooltip content="Details">
                <IconButton onClick={() => console.log("View user", user?.id)}>
                  <EyeIcon size={20} fill="#979797" />
                </IconButton>
              </Tooltip>
            </Col>
            <Col css={{ d: "flex" }}>
              <Tooltip content="Edit user">
                <IconButton onClick={() => console.log("Edit user", user?.id)}>
                  <EditIcon size={20} fill="#979797" />
                </IconButton>
              </Tooltip>
            </Col>
            <Col css={{ d: "flex" }}>
              <Tooltip
                content="Delete user"
                color="error"
                onClick={() => console.log("Delete user", user?.id)}
              >
                <IconButton>
                  <DeleteIcon size={20} fill="#FF0080" />
                </IconButton>
              </Tooltip>
            </Col>
          </Row>
        );
      default:
        return cellValue;
    }
  };
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
        {(item: UserType) => (
          <Table.Row>
            {(columnKey) => (
              <Table.Cell>{renderCell(item, columnKey)}</Table.Cell>
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
