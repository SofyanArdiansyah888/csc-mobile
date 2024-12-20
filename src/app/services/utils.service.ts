export const isSequence = (value: string) => {
  const digits = value.split('');
  let invalid = true;

  for (let i = 0; i < digits.length - 1; i++) {
    if (Math.abs(parseInt(digits[i]) - parseInt(digits[i + 1])) > 1) {
      invalid = false;
      break;
    }
  }

  return invalid;
};

export function formatRupiah(value: number): string {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
  }).format(value);
}
