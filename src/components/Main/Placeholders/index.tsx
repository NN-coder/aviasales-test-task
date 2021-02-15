import React from 'react';
import styled, { keyframes } from 'styled-components/macro';
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

const Placeholder = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
`;

const ErrorIcon = styled(BiErrorAlt)`
  width: 80px;
  height: 80px;
  margin-bottom: 10px;
  color: var(--blue);
`;
const LoadingIcon = styled(ErrorIcon).attrs({ as: AiOutlineLoading3Quarters })`
  animation: ${rotate} 0.8s linear infinite;
`;

export const ErrorPlaceholder: React.FC = () => (
  <Placeholder>
    <ErrorIcon />
    Упс, что-то пошло не так!
  </Placeholder>
);

export const LoadingPlaceholder: React.FC = () => (
  <Placeholder>
    <LoadingIcon />
    Загрузка...
  </Placeholder>
);
