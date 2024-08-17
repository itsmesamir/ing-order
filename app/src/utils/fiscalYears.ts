import { FiscalYear } from 'types/common';

import { getDate, isDateBetween } from './date';

export function getCurrentFiscalYear(fiscalYears: FiscalYear[]): FiscalYear | undefined {
  const currentDate = getDate();

  const fiscalYear = fiscalYears.find(year => {
    return isDateBetween(currentDate, year.startDate, year.endDate);
  });

  return fiscalYear;
}
