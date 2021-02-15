import React from 'react';
import styled from 'styled-components/macro';
import { ISegment } from '../../../../stores/types';
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

export interface IProps extends ISegment {
  className?: string;
}

const Segment: React.FC<IProps> = ({ stops, duration, origin, destination, date, className }) => (
  <div className={className}>
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
  </div>
);

export const StyledSegment = styled(Segment)`
  display: flex;
  justify-content: space-between;
  padding-right: 50px;
  & + & {
    margin-top: 10px;
  }
`;
