export function isInInterval(
  item: Date,
  intervalStart: Date,
  intervalEnd: Date
) {
  return item >= intervalStart && item <= intervalEnd;
}
