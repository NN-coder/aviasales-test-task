import React from 'react';
import styled from 'styled-components/macro';
import checkMark from './check.svg';

const FilterCheck = styled.button`
  position: relative;
  width: 100%;
  height: 40px;
  padding-left: 50px;
  text-align: left;
  transition: background-color 0.15s;
  &:hover,
  &:focus {
    background-color: var(--light-blue);
  }
`;
const FilterCheckBox = styled.span<{ checked?: boolean }>`
  position: absolute;
  top: 10px;
  left: 20px;
  width: 20px;
  height: 20px;
  border: 1px solid var(--blue);
  border-radius: 2px;
  ${({ checked }) => (checked ? `background: url(${checkMark}) no-repeat center;` : '')}
`;

export interface IProps {
  isSelected: boolean;
  handleClick: () => void;
  text: string;
}

export const FilterPanelCheckBox: React.FC<IProps> = ({ isSelected, handleClick, text }) => (
  <li role="option" aria-selected={isSelected}>
    <FilterCheck onClick={handleClick} type="button">
      <FilterCheckBox checked={isSelected} />
      {text}
    </FilterCheck>
  </li>
);
