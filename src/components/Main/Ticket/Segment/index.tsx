import React from 'react';
import { ISegment } from '../../../../store/types';
import { getTimeFromMins, getRouteTime, getStopsCountInCorrectForm } from './utils';
import './style.scss';

export type TProps = ISegment;

export const Segment: React.FC<TProps> = ({ stops, duration, origin, destination, date }) => (
  <div className="ticket-segment">
    <div className="ticket-segment__item">
      <div className="ticket-segment__title">{`${origin} - ${destination}`}</div>
      <div className="ticket-segment__value">{getRouteTime(date, duration * 60000)}</div>
    </div>

    <div className="ticket-segment__item">
      <div className="ticket-segment__title">В пути</div>
      <div className="ticket-segment__value">{getTimeFromMins(duration)}</div>
    </div>

    <div className="ticket-segment__item">
      <div className="ticket-segment__title">{getStopsCountInCorrectForm(stops.length)}</div>
      <div className="ticket-segment__value">{stops.join(', ')}</div>
    </div>
  </div>
);
