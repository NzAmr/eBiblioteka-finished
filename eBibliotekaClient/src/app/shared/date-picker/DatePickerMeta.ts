export class DatePickerMeta {
  date: Date;
  startOfWeek: boolean;
  dotColor: string;
  pipeColor: string;
  color: string;

  /**
   *
   */
  constructor() {
    this.startOfWeek = false;
    this.date = new Date();
    this.dotColor = 'ffffff00';
    this.color = '303030';
    this.pipeColor = 'ffffff00';
  }
}
