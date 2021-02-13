import React from 'react';
import { BiErrorAlt } from 'react-icons/bi';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import './style.scss';

export const ErrorPlaceholder: React.FC = () => (
  <div className="placeholder">
    <BiErrorAlt aria-hidden="true" className="placeholder__icon" />
    Упс, что-то пошло не так!
  </div>
);

export const LoadingPlaceholder: React.FC = () => (
  <div className="placeholder">
    <AiOutlineLoading3Quarters
      aria-hidden="true"
      className="placeholder__icon placeholder__icon--loading"
    />
    Загрузка...
  </div>
);
