export class BusinessHours {
  id: number;
  title: string;
  timeFrom: string;
  timeTo: string;
  workingDay: boolean;

  /**
   *
   */
  constructor() {
    this.id = -1;
    this.title = '';
    this.timeFrom = '0800';
    this.timeTo = '1600';
    this.workingDay = true;
  }
}

export class BusinessHoursEdit {
  id: number;
  title: string;
  timeFrom: [number, number];
  timeTo: [number, number];
  workingDay: boolean;

  /**
   *
   */
  constructor() {
    this.id = -1;
    this.title = '';
    this.timeFrom = [8, 0];
    this.timeTo = [16, 0];
    this.workingDay = true;
  }
}

export const convertToBusinessHoursEdit = (hours: BusinessHours) => {
  let result = new BusinessHoursEdit();
  result.id = hours.id;
  result.title = hours.title;
  result.workingDay = hours.workingDay;

  result.timeFrom = [
    parseInt(hours.timeFrom.slice(0, 2)),
    parseInt(hours.timeFrom.slice(2)),
  ];

  result.timeTo = [
    parseInt(hours.timeTo.slice(0, 2)),
    parseInt(hours.timeTo.slice(2)),
  ];

  return result;
};

export function convertFromBusinessHoursEdit(
  hours: BusinessHoursEdit
): BusinessHours {
  let result = new BusinessHours();
  result.id = hours.id;
  result.title = hours.title;
  result.workingDay = hours.workingDay;

  let timeFrom = [
    toTwoDigitString(hours.timeFrom[0]),
    toTwoDigitString(hours.timeFrom[1]),
  ];

  let timeTo = [
    toTwoDigitString(hours.timeTo[0]),
    toTwoDigitString(hours.timeTo[1]),
  ];

  return result;
}

const toTwoDigitString = (num: number) => {
  var result = num.toString(10);
  if (num < 10) {
    result = '0' + result;
  }

  return result;
};
