import { DatePicker, Host } from '@expo/ui/swift-ui';
import { useState } from 'react';
import { StyleSheet } from 'react-native';

export default function CalendarScrollBar() {
  const [selectedDate, setSelectedDate] = useState(new Date());

  return (
    <Host style={styles.container} matchContents>
      <DatePicker
        title="Select a date"
        selection={selectedDate}
        displayedComponents={['date']}
        onDateChange={date => {
          setSelectedDate(date);
        }}
      />
    </Host>
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
