import React, { useCallback } from 'react';
import classnames from 'classnames';
import { observer } from 'mobx-react-lite';
import { store } from '../../../store';
import { TSort } from '../../../store/types';
import './style.scss';

export const Sort: React.FC = observer(() => {
  const { currentSort, setCurrentSort } = store;

  const getBtnClassName = useCallback(
    (sortBy: TSort) => {
      const className = 'sort__btn';
      return classnames(className, { [`${className}--active`]: currentSort === sortBy });
    },
    [currentSort]
  );

  return (
    <div className="standard-block sort">
      <button
        type="button"
        className={getBtnClassName('cheapest')}
        onClick={() => setCurrentSort('cheapest')}
      >
        Самый дешевый
      </button>
      <button
        type="button"
        className={getBtnClassName('fastest')}
        onClick={() => setCurrentSort('fastest')}
      >
        Самый быстрый
      </button>
      <button
        type="button"
        className={getBtnClassName('optimal')}
        onClick={() => setCurrentSort('optimal')}
      >
        Оптимальный
      </button>
    </div>
  );
});
