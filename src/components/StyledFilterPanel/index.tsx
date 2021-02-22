import React, { useMemo } from 'react';
import styled from 'styled-components/macro';
import shortid from 'shortid';
import { observer } from 'mobx-react-lite';
import { useStoreContext } from '../StoreContext';
import { StandardBlock } from '../StandardBlock';
import { FilterPanelCheckBox, IProps as FilterPanelCheckBoxProps } from './FilterPanelCheckBox';

const FilterTitle = styled.div`
  margin-bottom: 10px;
  padding-left: 20px;
  font-weight: 600;
  font-size: 1.2rem;
  letter-spacing: 0.5px;
  text-transform: uppercase;
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
        handleClick: () => changeStopsFilterParameter('toggle', 0),
      },
      {
        text: '1 пересадка',
        key: shortid.generate(),
        handleClick: () => changeStopsFilterParameter('toggle', 1),
      },
      {
        text: '2 пересадки',
        key: shortid.generate(),
        handleClick: () => changeStopsFilterParameter('toggle', 2),
      },
      {
        text: '3 пересадки',
        key: shortid.generate(),
        handleClick: () => changeStopsFilterParameter('toggle', 3),
      },
    ],
    [changeStopsFilterParameter]
  );

  const getMainFilterPanelCheckBoxProps = (): FilterPanelCheckBoxProps => {
    const isSelected = ![...currentFilterParameters.stops.values()].includes(false);
    const handleClick = () => changeStopsFilterParameter(isSelected ? 'remove' : 'add', 0, 1, 2, 3);
    return { isSelected, handleClick, text: 'Все' };
  };

  return (
    <StandardBlock as="aside" className={className}>
      <FilterTitle>Количество пересадок</FilterTitle>
      <ul role="listbox">
        <FilterPanelCheckBox {...getMainFilterPanelCheckBoxProps()} />
        {filterPanelButtonsOptions.map(({ text, key, handleClick }, index) => {
          const isSelected = !!currentFilterParameters.stops.get(index);
          return (
            <FilterPanelCheckBox
              key={key}
              isSelected={isSelected}
              handleClick={handleClick}
              text={text}
            />
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
