export function areEqual(item1: Date, item2: Date) {
  return (
    item1.getDate() === item2.getDate() &&
    item1.getMonth() === item2.getMonth() &&
    item1.getFullYear() === item2.getFullYear()
  );
}
