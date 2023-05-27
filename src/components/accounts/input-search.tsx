import { Input, Spacer } from "@nextui-org/react";
export default function SearchInput() {
  return (
    <>
      <Input clearable bordered labelPlaceholder="Name" initialValue="Search Users" 
      css={{width: '100%', maxW: '410px'}} />
    </>
  );
}
