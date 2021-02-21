/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useCallback, useMemo } from 'react';
import styled from 'styled-components/macro';
import shortid from 'shortid';
import { observer } from 'mobx-react-lite';
import { useStoreContext } from '../StoreContext';
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

export interface IProps {
  className?: string;
}

const FilterPanel: React.FC<IProps> = observer(({ className }) => {
  const {
    filteredTicketsStore: { changeStopsFilterParameter, currentFilterParameters },
  } = useStoreContext();

  const filterPanelButtonsOptions = useMemo(
    () => [
      {
        text: 'Без пересадок',
        key: shortid.generate(),
        onClick: () => changeStopsFilterParameter('toggle', 0),
      },
      {
        text: '1 пересадка',
        key: shortid.generate(),
        onClick: () => changeStopsFilterParameter('toggle', 1),
      },
      {
        text: '2 пересадки',
        key: shortid.generate(),
        onClick: () => changeStopsFilterParameter('toggle', 2),
      },
      {
        text: '3 пересадки',
        key: shortid.generate(),
        onClick: () => changeStopsFilterParameter('toggle', 3),
      },
    ],
    [changeStopsFilterParameter]
  );

  return (
    <StandardBlock as="aside" className={className}>
      <FilterTitle>Количество пересадок</FilterTitle>
      <ul role="listbox">
        {filterPanelButtonsOptions.map(({ text, key, onClick }, index) => {
          const isSelected = currentFilterParameters.stops.get(index);

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
