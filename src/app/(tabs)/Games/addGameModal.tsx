import { Category } from '@/src/@types/CategoryType';
import { getCategories } from '@/src/api/Category/getCategories';
import { addHomeGames } from '@/src/api/HomeGame/addHomeGamesOfficial';
import { Picker } from '@react-native-picker/picker';
import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';
import { TimePicker } from 'react-native-flexi-time-selector';
import DateTimePicker, { DateType, useDefaultStyles } from 'react-native-ui-datepicker';
// Définissez le type FormData
type FormData = {
  date: DateType;
  hour: string;
  opponent: string;
  category: Category;
};

export default function AddGameModal() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = (data: FormData) => {
    if (!data.date || data.date === null || !data.hour || !data.opponent || !data.category) {
      throw new Error("Tous les champs sont obligatoires");
    }
    addHomeGames({
      date: data.date,
      hour: data.hour,
      opponent: data.opponent,
      category: data.category.id,
    });

    router.push('/homeGames');
  };

  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      const data = await getCategories();
      setCategories(data);
    }
    fetchCategories()
  }, [])

  const defaultStyles = useDefaultStyles();
  const [selectedDate, setSelectedDate] = useState<DateType>();
  const [visible, setVisible] = useState(false);
  const [visibleCategory, setVisibleCategory] = useState(false);
  const [hourSelected, setHourSelected] = useState<string>("12:00");
  const [categorySelected, setCategorySelected] = useState<Category>();

  return (
    <View style={styles.container}>
      <Controller
        control={control}
        name="date"
        rules={{ required: 'Date obligatoire' }}
        render={({ field: { onChange } }) => (
          <DateTimePicker
            mode="single"
            date={selectedDate}
            containerHeight={200}
            onChange={({ date }) => {
              setSelectedDate(date);
              onChange(date);
            }}
            styles={{
              ...defaultStyles,
              today: { borderColor: 'red', borderWidth: 1 },
              selected: { backgroundColor: 'red' },
              selected_label: { color: 'white' },
            }}
          />
        )}
      />
      {errors.date && <Text style={styles.error}>{errors.date.message}</Text>}

      <Controller
        control={control}
        name="hour"
        rules={{ required: 'Heure obligatoire' }}
        render={({ field: { onChange } }) => (
          <View>
            <Button title="Heure du match" onPress={() => setVisible(true)} />
            <TextInput style={styles.VersusInput} value={hourSelected} editable={false} />
            {visible && (
              <TimePicker
                isVisible={visible}
                title="Heure du match"
                use12Hour={false}
                minuteInterval={1}
                onClose={() => setVisible(false)}
                onConfirm={(time) => {
                  setVisible(false);
                  setHourSelected(time);
                  console.log('Selected time:', time); // Debug log
                  onChange(time);
                }}
              />
            )}
          </View>
        )}
      />
      {errors.hour && <Text style={styles.error}>{errors.hour.message}</Text>}

      {/* Champ Adversaire */}
      <Controller
        control={control}
        name="opponent"
        rules={{ required: 'Adversaire obligatoire' }}
        render={({ field: { onChange, value } }) => (
          <View>
            <Button title="Adversaire" />
            <TextInput
              style={styles.VersusInput}
              placeholder="Adversaire"
              value={value}
              onChangeText={onChange}
            />
          </View>
        )}
      />
      {errors.opponent && <Text style={styles.error}>{errors.opponent.message}</Text>}

      {/* Champ Catégorie (Picker) */}
      <Controller
        control={control}
        name="category"
        rules={{ required: 'Catégorie obligatoire' }}
        render={({ field: { onChange, value } }) => (
          <View >
            <Button title="Catégorie" onPress={() => setVisibleCategory(true)} />
            <TextInput style={styles.VersusInput} value={categorySelected ? categorySelected.Name : ''} editable={false} />
            {visibleCategory && (
              <Picker
                selectedValue={value}
                onValueChange={(itemValue) => {
                  setCategorySelected(itemValue);
                  onChange(itemValue.Name);
                  setVisibleCategory(false);
                }}
                style={{ height: 50, width: '100%' }}
              >
                {
                  categories.map((category) => (
                    <Picker.Item label={category.Name} value={category} key={category.id} />
                  ))
                }
              </Picker>
            )}
          </View>
        )
        }
      />
      {errors.category && <Text style={styles.error}>{errors.category.message}</Text>}

      <Button title="Ajouter" onPress={handleSubmit(onSubmit)} />
    </View >
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    padding: 20,
  },
  VersusInput: {
    height: 40,
    backgroundColor: 'white',
    borderColor: 'gray',
    borderRadius: 6,
    borderWidth: 1,
    padding: 10,
    marginBottom: 10,
  },
  error: {
    color: 'red',
    marginBottom: 10,
  },
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 4,
    color: 'black',
    paddingRight: 30, // Pour laisser de la place à l'icône de dropdown
    backgroundColor: 'white',
    height: 50,
    width: '100%',
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 8,
    color: 'black',
    paddingRight: 30,
    backgroundColor: 'white',
    height: 50,
    width: '100%',
  },
  placeholder: {
    color: 'gray',
  },
});
