export function calculateFactoryRadius(people: number): number {
  if (people <= 10) {
    return 5;
  }

  const res = 5 + (people - 5) * 0.01;

  if (res > 20) {
    return 20;
  }

  return res;
}
