const { format: formatNumber } = new Intl.NumberFormat('ru', { minimumIntegerDigits: 2 });

export const getTimeFromDate = (date: Date): string => {
  const hours = formatNumber(date.getHours());
  const mins = formatNumber(date.getMinutes());

  return `${hours}:${mins}`;
};

export const getTimeFromMins = (mins: number): string => {
  const hours = formatNumber(Math.trunc(mins / 60));
  const minutes = formatNumber(mins % 60);

  return `${hours}ч ${minutes}м`;
};

export const getRouteTime = (date: string, duration: number): string => {
  const departure = new Date(date);
  const departureTime = getTimeFromDate(departure);

  const arrival = new Date(+departure + duration);
  const arrivalTime = getTimeFromDate(arrival);

  return `${departureTime} - ${arrivalTime}`;
};

export const getStopsCountInCorrectForm = (stopsCount: number): string => {
  if (stopsCount === 0) return 'Без пересадок';
  if (stopsCount === 1) return '1 пересадка';
  if (stopsCount >= 2 && stopsCount <= 4) return `${stopsCount} пересадки`;
  return `${stopsCount} пересадок`;
};
