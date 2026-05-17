import 'dayjs/locale/fr';

import dayjs, { type Dayjs } from 'dayjs';
import { useEffect, useMemo, useRef } from 'react';
import {
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  View,
  type ListRenderItem,
} from 'react-native';

import colors from '@/src/assets/theme/colors';
import {
  buildScrollableCalendarDays,
  isSameCalendarDay,
  toDateKey,
} from '@/src/utils/dates';

const DAY_ITEM_WIDTH = 56;
const DAY_ITEM_GAP = 8;
const DAY_SLOT_WIDTH = DAY_ITEM_WIDTH + DAY_ITEM_GAP;

export type CalendarScrollBarProps = {
  selectedDate: Date;
  onSelectDate: (date: Date) => void;
  markedDateKeys?: string[];
};

export default function CalendarScrollBar({
  selectedDate,
  onSelectDate,
  markedDateKeys = [],
}: CalendarScrollBarProps) {
  const listRef = useRef<FlatList<Dayjs>>(null);
  const days = useMemo(() => buildScrollableCalendarDays(), []);
  const markedSet = useMemo(() => new Set(markedDateKeys), [markedDateKeys]);

  const selectedIndex = useMemo(
    () => days.findIndex(day => isSameCalendarDay(day, selectedDate)),
    [days, selectedDate],
  );

  useEffect(() => {
    if (selectedIndex < 0) return;
    listRef.current?.scrollToIndex({
      index: selectedIndex,
      animated: true,
      viewPosition: 0.5,
    });
  }, [selectedIndex]);

  const renderDay: ListRenderItem<Dayjs> = ({ item: day }) => {
    const isSelected = isSameCalendarDay(day, selectedDate);
    const dateKey = toDateKey(day);
    const hasGames = markedSet.has(dateKey);
    const isToday = isSameCalendarDay(day, dayjs());

    return (
      <Pressable
        onPress={() => onSelectDate(day.toDate())}
        style={[styles.dayItem, isSelected && styles.dayItemSelected]}
        accessibilityRole="button"
        accessibilityState={{ selected: isSelected }}
        accessibilityLabel={day.locale('fr').format('dddd D MMMM')}
      >
        <Text style={[styles.weekday, isSelected && styles.textSelected]}>
          {day.locale('fr').format('ddd')}
        </Text>
        <Text style={[styles.dayNumber, isSelected && styles.textSelected]}>
          {day.format('D')}
        </Text>
        <View style={styles.markerSlot}>
          {hasGames ? (
            <View
              style={[
                styles.marker,
                isSelected && styles.markerSelected,
              ]}
            />
          ) : null}
        </View>
        {isToday && !isSelected ? (
          <View pointerEvents="none" style={styles.todayRing} />
        ) : null}
      </Pressable>
    );
  };

  return (
    <View style={styles.wrapper}>
      <FlatList
        ref={listRef}
        horizontal
        data={days}
        keyExtractor={item => toDateKey(item)}
        renderItem={renderDay}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
        getItemLayout={(_, index) => ({
          length: DAY_SLOT_WIDTH,
          offset: DAY_SLOT_WIDTH * index,
          index,
        })}
        initialScrollIndex={selectedIndex > 0 ? selectedIndex : 0}
        onScrollToIndexFailed={({ index }) => {
          listRef.current?.scrollToOffset({
            offset: DAY_SLOT_WIDTH * index,
            animated: false,
          });
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    marginVertical: 8,
  },
  listContent: {
    paddingHorizontal: 12,
  },
  dayItem: {
    width: DAY_ITEM_WIDTH,
    marginRight: DAY_ITEM_GAP,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    borderRadius: 14,
    backgroundColor: colors.white,
  },
  dayItemSelected: {
    backgroundColor: colors.primary,
  },
  weekday: {
    fontSize: 12,
    color: '#666',
    textTransform: 'capitalize',
  },
  dayNumber: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111',
    marginTop: 2,
  },
  textSelected: {
    color: colors.white,
  },
  markerSlot: {
    height: 6,
    marginTop: 4,
    justifyContent: 'center',
  },
  marker: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.primary,
  },
  markerSelected: {
    backgroundColor: colors.white,
  },
  todayRing: {
    position: 'absolute',
    inset: 0,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: colors.primary,
  },
});
