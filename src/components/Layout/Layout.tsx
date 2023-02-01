import { FC, ReactNode } from 'react';
import { Roboto } from '@next/font/google';
import Container from '@mui/material/Container';
const roboto = Roboto({
  weight: ['300', '400', '500', '700'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
});

interface LayoutProps {
  children: ReactNode;
}

export const Layout: FC<LayoutProps> = ({ children }) => {
  return (
    <Container maxWidth="md" className={roboto.className}>
      <main>{children}</main>
    </Container>
  );
};
