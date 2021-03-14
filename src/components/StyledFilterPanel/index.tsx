import React, { useMemo, useCallback } from 'react';
import styled from 'styled-components/macro';
import shortid from 'shortid';
import { observer } from 'mobx-react-lite';
import { useStoreContext } from '../StoreContext';
import { StandardBlock } from '../StandardBlock';
import { FilterPanelCheckBox, IProps as FilterPanelCheckBoxProps } from './FilterPanelCheckBox';
import { IFilterParameters } from '../../RootStore/types';
import { getStopsCountInCorrectForm } from '../Main/StyledTicket/StyledTicketSegments/utils';

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
    () =>
      [0, 1, 2, 3].map((stopsCount) => ({
        text: getStopsCountInCorrectForm(stopsCount),
        key: shortid.generate(),
        handleClick: () => changeStopsFilterParameter('toggle', stopsCount),
      })),
    [changeStopsFilterParameter]
  );

  const getMainFilterPanelCheckBoxProps = useCallback(
    (filterParams: IFilterParameters): FilterPanelCheckBoxProps => {
      const isSelected = ![...filterParams.stops.values()].includes(false);
      const handleClick = () => {
        changeStopsFilterParameter(isSelected ? 'remove' : 'add', 0, 1, 2, 3);
      };

      return { isSelected, handleClick, text: 'Все' };
    },
    [changeStopsFilterParameter]
  );

  return (
    <StandardBlock as="aside" className={className}>
      <FilterTitle>Количество пересадок</FilterTitle>
      <ul role="listbox">
        <FilterPanelCheckBox {...getMainFilterPanelCheckBoxProps(currentFilterParameters)} />
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
