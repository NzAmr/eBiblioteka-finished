export class CheckAvailabilityMeta {
  date: Date;
  startOfWeek: boolean;
  dotColor: string;
  pipeColor: string;
  color: string;
  number: number;

  /**
   *
   */
  constructor() {
    this.startOfWeek = false;
    this.date = new Date();
    this.dotColor = 'rgba(0,0,0,0)';
    this.color = '#303030';
    this.pipeColor = 'rgba(0,0,0,0)';
    this.number = 0;
  }
}
