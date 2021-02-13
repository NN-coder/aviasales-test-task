/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { ITicket } from '../../../store/types';
import { Segment } from './Segment';
import './style.scss';

const formatter = new Intl.NumberFormat('ru');

export type TProps = ITicket;

export const Ticket: React.FC<TProps> = ({ price, carrier, segments }) => (
  // eslint-disable-next-line jsx-a11y/anchor-is-valid
  <a href="#" className="standard-block ticket">
    <div className="ticket__header">
      <div className="ticket__price">{`${formatter.format(price)} Р`}</div>
      <img className="ticket__img" src={`http://pics.avs.io/99/36/${carrier}.png`} alt="" />
    </div>

    <Segment {...segments[0]} />
    <Segment {...segments[1]} />
  </a>
);
