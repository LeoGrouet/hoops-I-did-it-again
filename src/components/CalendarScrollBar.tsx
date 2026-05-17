import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import DateTimePicker, { DateType, useDefaultStyles } from 'react-native-ui-datepicker';

export default function CalendarScrollBar() {
  const defaultStyles = useDefaultStyles();
  const [selectedDate, setSelectedDate] = useState<DateType>(new Date());

  return (
    <View style={styles.container}>
      <DateTimePicker
        mode="single"
        date={selectedDate}
        containerHeight={140}
        onChange={({ date }) => {
          if (date) setSelectedDate(date);
        }}
        styles={defaultStyles}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: 150,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
