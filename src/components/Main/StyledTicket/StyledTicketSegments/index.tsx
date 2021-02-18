import React from 'react';
import styled from 'styled-components/macro';
import { ISegment } from '../../../../stores/ticketsStore';
import { getTimeFromMins, getRouteTime, getStopsCountInCorrectForm } from './utils';

const SegmentItem = styled.div`
  line-height: 20px;
`;
const SegmentTitle = styled.div`
  color: var(--text-color-primary);
  font-size: 1.2rem;
  letter-spacing: 0.5px;
  text-transform: uppercase;
`;
const SegmentValue = styled.div`
  font-size: 1.4rem;
`;

export interface IProps {
  segments: ISegment[];
  className?: string;
}

const TicketSegments: React.FC<IProps> = ({ className, segments }) => (
  <div className={className}>
    {segments.map(({ stops, duration, origin, destination, date }) => (
      <React.Fragment key={duration}>
        <SegmentItem>
          <SegmentTitle>{`${origin} - ${destination}`}</SegmentTitle>
          <SegmentValue>{getRouteTime(date, duration * 60000)}</SegmentValue>
        </SegmentItem>

        <SegmentItem>
          <SegmentTitle>В пути</SegmentTitle>
          <SegmentValue>{getTimeFromMins(duration)}</SegmentValue>
        </SegmentItem>

        <SegmentItem>
          <SegmentTitle>{getStopsCountInCorrectForm(stops.length)}</SegmentTitle>
          <SegmentValue>{stops.join(', ')}</SegmentValue>
        </SegmentItem>
      </React.Fragment>
    ))}
  </div>
);

export const StyledTicketSegments = styled(TicketSegments)`
  display: grid;
  grid-template-columns: repeat(3, max-content);
  justify-content: space-between;
  padding-right: 50px;
  row-gap: 10px;
`;
