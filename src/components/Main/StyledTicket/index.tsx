import React from 'react';
import styled from 'styled-components/macro';
import { ITicket } from '../../../RootStore/types';
import { StandardBlock } from '../../StandardBlock';
import { StyledTicketSegments } from './StyledTicketSegments';

const TicketHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
`;

const TicketPrice = styled.div`
  color: var(--blue);
  font-size: 2.4rem;
`;
const TicketImg = styled.img`
  height: 36px;
`;

const formatter = new Intl.NumberFormat('ru');

export interface IProps extends ITicket {
  className?: string;
}

const Ticket: React.FC<IProps> = ({ price, carrier, segments, className }) => (
  <StandardBlock as="a" href="/" className={className}>
    <TicketHeader>
      <TicketPrice>{`${formatter.format(price)} Р`}</TicketPrice>
      <TicketImg src={`http://pics.avs.io/99/36/${carrier}.png`} alt="" />
    </TicketHeader>

    <StyledTicketSegments segments={segments} />
  </StandardBlock>
);

export const StyledTicket = styled(Ticket)`
  padding: 20px;
  font-weight: 600;
`;
