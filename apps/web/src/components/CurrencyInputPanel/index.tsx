"use client"
import { useMemo } from 'react';
import styled, { useTheme } from 'styled-components';

const Container = styled.div<{ hideinput: boolean }>`
  border-radius: ${({ hideinput }) => (hideinput ? '20px' : '16px')};
  width: ${({ hideinput }) => (hideinput ? '100%' : 'initial')};
`;

const InputPanel = styled.div<{ hideinput: boolean }>`
  display: flex;
  flex-flow: column nowrap;
  position: relative;
  z-index: 1;
  width: ${({ hideinput }) => (hideinput ? '100%' : 'initial')};
`;
const InputRow = styled.div<{ selected: boolean }>`
  display: flex;
  flex-flow: column nowrap;

  align-items: center;
  justify-content: space-between;
  padding: ${({ selected }) =>
    selected ? ' 1rem 1rem 0.75rem 1rem' : '1rem 1rem 1rem 1rem'};
`;

export default function CurrencyInputPanel({
  hideinput,
}: {
  hideinput: boolean;
}) {
  return (
    <>
      <InputPanel hideinput={hideinput}>
        <Container hideinput={hideinput}>
          <InputRow selected={true}>
            <input />
          </InputRow>
        </Container>
      </InputPanel>
    </>
  );
}
