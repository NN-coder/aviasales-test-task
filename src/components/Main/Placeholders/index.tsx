import React from 'react';
import styled, { keyframes, css } from 'styled-components/macro';
import { BiErrorAlt } from 'react-icons/bi';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';

const rotate = keyframes`
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(1turn);
  }
`;
const loadingStyles = css`
  animation: ${rotate} 0.8s linear infinite;
`;

const Placeholder = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
`;
const Icon = styled.svg.attrs({ 'aria-hidden': true })<{ loading?: boolean }>`
  width: 80px;
  height: 80px;
  margin-bottom: 10px;
  color: var(--blue);
  ${({ loading }) => (loading ? loadingStyles : '')}
`;

export const ErrorPlaceholder: React.FC = () => (
  <Placeholder>
    <Icon as={BiErrorAlt} />
    Упс, что-то пошло не так!
  </Placeholder>
);

export const LoadingPlaceholder: React.FC = () => (
  <Placeholder>
    <Icon as={AiOutlineLoading3Quarters} loading />
    Загрузка...
  </Placeholder>
);
