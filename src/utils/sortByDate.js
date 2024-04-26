export default function sortByDate(array, dateProperty) {
  return [...array].sort(
    (a, b) => new Date(b[dateProperty]) - new Date(a[dateProperty])
  );
}
