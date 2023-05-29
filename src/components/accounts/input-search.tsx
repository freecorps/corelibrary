import { Input, Spacer } from "@nextui-org/react";
export default function SearchInput() {
  return (
    <>
      <Input clearable bordered labelPlaceholder="Nome" initialValue="Pesquisar..." 
      css={{width: '100%', maxW: '410px'}} />
    </>
  );
}
