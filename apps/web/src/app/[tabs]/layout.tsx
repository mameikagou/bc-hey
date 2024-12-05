'use client';
import { styled } from 'styled-components';

const Container = styled('div')`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 60vh;
`;

export default function Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) { // React.PropsWithChildren<{}>
  return (
    <>
      <Container>{children}</Container>
    </>
  );
}
