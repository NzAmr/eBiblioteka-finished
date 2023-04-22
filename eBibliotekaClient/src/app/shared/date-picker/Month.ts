export class Month {
  number: number;
  name: string;

  /**
   *
   */
  constructor() {
    this.number = -1;
    this.name = 'Učitavanje...';
  }
}

export const months: Month[] = [
  {
    number: 1,
    name: 'JANUAR',
  },
  {
    number: 2,
    name: 'FEBRUAR',
  },
  {
    number: 3,
    name: 'MART',
  },
  {
    number: 4,
    name: 'APRIL',
  },
  {
    number: 5,
    name: 'MAJ',
  },
  {
    number: 6,
    name: 'JUNI',
  },
  {
    number: 7,
    name: 'JULI',
  },
  {
    number: 8,
    name: 'AUGUST',
  },
  {
    number: 9,
    name: 'SEPTEMBAR',
  },
  {
    number: 10,
    name: 'OKTOBAR',
  },
  {
    number: 11,
    name: 'NOVEMBAR',
  },
  {
    number: 12,
    name: 'DECEMBAR',
  },
];
