/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useCallback, useState } from 'react';
import styled from 'styled-components/macro';
import shortid from 'shortid';
import { StandardBlock } from '../StandardBlock';
import checkMark from './check.svg';

const FilterTitle = styled.div`
  margin-bottom: 10px;
  padding-left: 20px;
  font-weight: 600;
  font-size: 1.2rem;
  letter-spacing: 0.5px;
  text-transform: uppercase;
`;
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
const FilterCheckBox = styled.span<{ checked: boolean }>`
  position: absolute;
  top: 10px;
  left: 20px;
  width: 20px;
  height: 20px;
  border: 1px solid var(--blue);
  border-radius: 2px;
  ${({ checked }) => (checked ? `background: url(${checkMark}) no-repeat center;` : '')}
`;

interface Option {
  key: string;
  text: string;
}

const filterButtonsOptions: Option[] = [
  { text: 'Все', key: shortid.generate() },
  { text: 'Без пересадок', key: shortid.generate() },
  { text: '1 пересадка', key: shortid.generate() },
  { text: '2 пересадки', key: shortid.generate() },
  { text: '3 пересадки', key: shortid.generate() },
];

export interface IProps {
  className?: string;
}

const FilterPanel: React.FC<IProps> = ({ className }) => {
  const [checked, toggleCheck] = useState<number[]>([]);

  const createClickHandler = useCallback((num: number) => {
    return () => {
      toggleCheck((prevState) => {
        if (!prevState.includes(num)) {
          return prevState.concat(num);
        }

        const newState = prevState.slice();
        newState.splice(newState.indexOf(num), 1);
        return newState;
      });
    };
  }, []);

  return (
    <StandardBlock as="aside" className={className}>
      <FilterTitle>Количество пересадок</FilterTitle>
      <ul role="listbox">
        {filterButtonsOptions.map(({ text, key }, index) => (
          <li key={key} role="option" aria-selected={checked.includes(index)}>
            <FilterCheck onClick={createClickHandler(index)} type="button">
              <FilterCheckBox checked={checked.includes(index)} />
              {text}
            </FilterCheck>
          </li>
        ))}
      </ul>
    </StandardBlock>
  );
};

export const StyledFilterPanel = styled(FilterPanel)`
  padding: 20px 0;
  font-size: 1.3em;
`;
