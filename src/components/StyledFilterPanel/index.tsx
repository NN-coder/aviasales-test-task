/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useCallback } from 'react';
import styled from 'styled-components/macro';
import shortid from 'shortid';
import { observer } from 'mobx-react-lite';
import { filteredTicketsStore } from '../../stores';
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

const { toggleStopsFilterParameter } = filteredTicketsStore;

interface IFilterButtonOption {
  key: string;
  text: string;
  onClick: () => void;
}

const filterButtonsOptions: IFilterButtonOption[] = [
  { text: 'Все', key: shortid.generate(), onClick: () => toggleStopsFilterParameter(0, 1, 2, 3) },
  {
    text: 'Без пересадок',
    key: shortid.generate(),
    onClick: () => toggleStopsFilterParameter(0),
  },
  {
    text: '1 пересадка',
    key: shortid.generate(),
    onClick: () => toggleStopsFilterParameter(1),
  },
  {
    text: '2 пересадки',
    key: shortid.generate(),
    onClick: () => toggleStopsFilterParameter(2),
  },
  {
    text: '3 пересадки',
    key: shortid.generate(),
    onClick: () => toggleStopsFilterParameter(3),
  },
];

export interface IProps {
  className?: string;
}

const FilterPanel: React.FC<IProps> = observer(({ className }) => {
  const getIsSelected = useCallback((btnIndex: number) => {
    const { stops } = filteredTicketsStore.currentFilterParameters;
    const isMainBtn = btnIndex === 0;

    if (isMainBtn) return stops.get(0) && stops.get(1) && stops.get(2) && stops.get(3);

    return stops.get(btnIndex - 1);
  }, []);

  return (
    <StandardBlock as="aside" className={className}>
      <FilterTitle>Количество пересадок</FilterTitle>
      <ul role="listbox">
        {filterButtonsOptions.map(({ text, key, onClick }, index) => {
          const isSelected = getIsSelected(index);

          return (
            <li key={key} role="option" aria-selected={isSelected}>
              <FilterCheck onClick={onClick} type="button">
                <FilterCheckBox checked={isSelected} />
                {text}
              </FilterCheck>
            </li>
          );
        })}
      </ul>
    </StandardBlock>
  );
});

export const StyledFilterPanel = styled(FilterPanel)`
  padding: 20px 0;
  font-size: 1.3em;
`;
