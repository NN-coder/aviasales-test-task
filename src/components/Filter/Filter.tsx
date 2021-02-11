/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useCallback, useState } from 'react';
import { generate } from 'shortid';
import classnames from 'classnames';
import './Filter.scss';

interface Option {
  key: string;
  text: string;
}

const options: Option[] = [
  { text: 'Все', key: generate() },
  { text: 'Без пересадок', key: generate() },
  { text: '1 пересадка', key: generate() },
  { text: '2 пересадки', key: generate() },
  { text: '3 пересадки', key: generate() },
];

export const Filter: React.FC = () => {
  const [checked, toggleCheck] = useState<number[]>([]);

  const getCheckBoxClass = useCallback(
    (num: number) => {
      const className = 'filter-check__box';
      return classnames(className, { [`${className}--checked`]: checked.includes(num) });
    },
    [checked]
  );

  const createClickHandler = useCallback((num: number) => {
    return () => {
      toggleCheck((prevState) => {
        if (prevState.includes(num)) {
          const newState = new Set(prevState);
          newState.delete(num);
          return Array.from(newState);
        }

        return [...prevState, num];
      });
    };
  }, []);

  return (
    <div className="standard-block filter">
      <div className="filter__title">Количество пересадок</div>
      <ul className="filter-list">
        {options.map(({ text, key }, index) => (
          <li key={key} className="filter-list__item">
            <button onClick={createClickHandler(index)} type="button" className="filter-check">
              <span className={getCheckBoxClass(index)} />
              {text}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};
