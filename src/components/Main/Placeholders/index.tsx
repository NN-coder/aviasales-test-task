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

const ErrorPlaceholder = (
  <Placeholder>
    <ErrorIcon />
    Упс, что-то пошло не так!
  </Placeholder>
);

const LoadingPlaceholder = (
  <Placeholder>
    <LoadingIcon />
    Загрузка...
  </Placeholder>
);

export interface IProps {
  isLoading: boolean;
  hasError: boolean;
}

export const Placeholders: React.FC<IProps> = ({ isLoading, hasError }) => {
  if (isLoading) return LoadingPlaceholder;
  if (hasError) return ErrorPlaceholder;
  return null;
};
