import 'dayjs/locale/ru';
import { DatesProvider, MonthPickerInput, DatePickerInput } from '@mantine/dates';

export  function Calendar() {
  return (
    <DatesProvider settings={{ locale: 'en', firstDayOfWeek: 0, weekendDays: [0] }}>
      {/* <MonthPickerInput label="Pick month" placeholder="Pick month" /> */}
      <DatePickerInput  valueFormat="YYYY MM DD" mt="md" 
      label="Pick date" placeholder="Pick date" />
    </DatesProvider>
  );
}
//