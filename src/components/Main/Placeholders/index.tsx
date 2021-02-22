import React from 'react';
import styled, { keyframes } from 'styled-components/macro';
import { ImLifebuoy } from 'react-icons/im';
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

const Icon = styled.svg`
  width: 80px;
  height: 80px;
  margin-bottom: 10px;
  color: var(--blue);
`;
const LoadingIcon = styled(Icon).attrs({ as: AiOutlineLoading3Quarters })`
  animation: ${rotate} 0.8s linear infinite;
`;

const ErrorPlaceholder = (
  <Placeholder>
    <Icon as={BiErrorAlt} />
    Упс, что-то пошло не так!
  </Placeholder>
);

const EmptyPlaceholder = (
  <Placeholder>
    <Icon as={ImLifebuoy} />
    Ничего не найдено
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
  isEmpty: boolean;
}

export const Placeholders: React.FC<IProps> = ({ isLoading, hasError, isEmpty }) => {
  if (isLoading) return LoadingPlaceholder;
  if (hasError) return ErrorPlaceholder;
  if (isEmpty) return EmptyPlaceholder;
  return null;
};
