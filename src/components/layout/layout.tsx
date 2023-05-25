import { Content } from "../home/content"
import { Box } from "../styles/box";

interface Props {
    children: React.ReactNode;
 }

export const Layout = ({ children }: Props) => (
  <Box
    css={{
      maxW: "100%"
    }}
  >
    {children}
    <Content />
  </Box>
);
