/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useCallback, useState } from 'react';
import shortid from 'shortid';
import classnames from 'classnames';
import './style.scss';

interface Option {
  key: string;
  text: string;
}

const options: Option[] = [
  { text: 'Все', key: shortid.generate() },
  { text: 'Без пересадок', key: shortid.generate() },
  { text: '1 пересадка', key: shortid.generate() },
  { text: '2 пересадки', key: shortid.generate() },
  { text: '3 пересадки', key: shortid.generate() },
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
    <aside className="standard-block filter">
      <div className="filter__title">Количество пересадок</div>
      <ul className="filter-list" role="listbox">
        {options.map(({ text, key }, index) => (
          <li
            key={key}
            role="option"
            aria-selected={checked.includes(index)}
            className="filter-list__item"
          >
            <button onClick={createClickHandler(index)} type="button" className="filter-check">
              <span className={getCheckBoxClass(index)} />
              {text}
            </button>
          </li>
        ))}
      </ul>
    </aside>
  );
};
