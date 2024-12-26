import moment from "moment";

export const today = () => moment().date();
export const thisMonth = () => moment().month();
export const thisYear = () => moment().year();

export const localDate = (date:any, month:any, year:any) => {
  return moment({ year, month, date });
};


export const getAllDaysInMonth = (year: number, month: number) => {
  const tempDate = moment([year, month]).startOf('month');
  const endDate = moment([year, month]).endOf('month');
  const dates = [];
  const today = moment().startOf('day'); // Get today’s date

  // While tempDate is still in the same month
  while (tempDate <= endDate) {
    dates.push({
      day: tempDate.format('ddd'), // e.g., Mon
      date: tempDate.date(),
      booked: false,
      disabled: today.isAfter(tempDate, 'day'), // Disable past dates
      isToday: today.isSame(tempDate, 'day') // Check if it's today
    });
    tempDate.add(1, 'day');
  }

  return dates;
};
// class="active booked"
// export const getAllMonthsInYear = (year: number): number[] => {
//   const date = new Date(year, 1, 1);
//   const months = [];
//   while (date.getFullYear() === year) {
//     months.push(date.getMonth());
//   }
//   return months;
// };

export const getMonthName = (month: number) => {
  const monthNames = [
    'Januari',
    'Februari',
    'Maret',
    'April',
    'Mei',
    'Juni',
    'Juli',
    'Agustus',
    'September',
    'Oktober',
    'November',
    'Desember',
  ];
  return monthNames[month];
};

export const getDayName = (day: number) => {
  const days = ['Ahad','Senin', 'Selasa', 'Rabu', 'Kamis', `Jum'at`, 'Sabtu'];
  return days[day];
};
