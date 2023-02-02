import { FC, ReactNode } from 'react';
import { Roboto } from '@next/font/google';
import styled from 'styled-components';

const roboto = Roboto({
  weight: ['300', '400', '500', '700'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
});

interface LayoutProps {
  children: ReactNode;
}

const Container = styled.div({
  maxWidth: '1090px',
  margin: '0 auto',
  padding: '0 10px',
});

export const Layout: FC<LayoutProps> = ({ children }) => {
  return (
    <>
      <Container className={roboto.className}>
        <main>{children}</main>
      </Container>
    </>
  );
};
