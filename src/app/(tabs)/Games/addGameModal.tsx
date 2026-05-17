import 'dayjs/locale/fr';

import { TeamType } from '@/src/@types/TeamType';
import { addHomeGames } from '@/src/api/HomeGame/addHomeGamesOfficial';
import { getTeams } from '@/src/api/Teams/getTeams';
import colors from '@/src/assets/theme/colors';
import { toDateKey } from '@/src/utils/dates';
import { setGamesScreenIntent } from '@/src/utils/gamesScreenIntent';
import { Picker } from '@react-native-picker/picker';
import dayjs from 'dayjs';
import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import {
  Alert,
  Button,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { TimePicker } from 'react-native-flexi-time-selector';
import DateTimePicker, { DateType, useDefaultStyles } from 'react-native-ui-datepicker';

type FormData = {
  date: DateType;
  hour: string;
  opponent: string;
  teamId: number;
};

const defaultFormDate = new Date();

export default function AddGameModal() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      date: defaultFormDate,
      hour: '12:00',
      opponent: '',
    },
  });

  const [teams, setTeams] = useState<TeamType[]>([]);
  const [pickerDate, setPickerDate] = useState<DateType>(defaultFormDate);
  const [visible, setVisible] = useState(false);
  const [visibleTeam, setVisibleTeam] = useState(false);
  const [hourSelected, setHourSelected] = useState('12:00');
  const [teamSelected, setTeamSelected] = useState<TeamType | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const defaultStyles = useDefaultStyles();

  useEffect(() => {
    const fetchTeams = async () => {
      const data = await getTeams();
      setTeams(data);
    };
    fetchTeams();
  }, []);

  const onSubmit = async (data: FormData) => {
    if (!data.date || !data.hour || !data.opponent || !data.teamId) {
      Alert.alert('Champs manquants', 'Tous les champs sont obligatoires.');
      return;
    }

    setIsSubmitting(true);
    try {
      const created = await addHomeGames({
        date: data.date,
        hour: data.hour,
        opponent: data.opponent,
        teamId: data.teamId,
      });

      if (!created) {
        Alert.alert('Erreur', "Impossible d'ajouter le match.");
        return;
      }

      setGamesScreenIntent({
        selectDateKey: toDateKey(created.date),
        createdGame: created,
      });
      router.back();
    } catch (error) {
      console.error('Error adding home game:', error);
      Alert.alert('Erreur', "Une erreur est survenue lors de l'ajout du match.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.sectionTitle}>Date du match</Text>
      <Text style={styles.selectedDateLabel}>
        {dayjs(pickerDate).locale('fr').format('dddd D MMMM YYYY')}
      </Text>

      <Controller
        control={control}
        name="date"
        rules={{ required: 'Date obligatoire' }}
        render={({ field: { onChange } }) => (
          <DateTimePicker
            mode="single"
            date={pickerDate}
            containerHeight={280}
            onChange={({ date }) => {
              if (!date) return;
              setPickerDate(date);
              onChange(date);
            }}
            styles={{
              ...defaultStyles,
              today: { borderColor: colors.primary, borderWidth: 1 },
              selected: { backgroundColor: colors.primary },
              selected_label: { color: colors.white },
            }}
          />
        )}
      />
      {errors.date ? <Text style={styles.error}>{errors.date.message}</Text> : null}

      <Controller
        control={control}
        name="hour"
        rules={{ required: 'Heure obligatoire' }}
        render={({ field: { onChange } }) => (
          <View>
            <Text style={styles.fieldLabel}>Heure du match</Text>
            <TextInput style={styles.VersusInput} value={hourSelected} editable={false} onPressIn={() => setVisible(true)} />
            {visible ? (
              <TimePicker
                isVisible={visible}
                title="Heure du match"
                use12Hour={false}
                minuteInterval={1}
                onClose={() => setVisible(false)}
                onConfirm={time => {
                  setVisible(false);
                  setHourSelected(time);
                  onChange(time);
                }}
              />
            ) : null}
          </View>
        )}
      />
      {errors.hour ? <Text style={styles.error}>{errors.hour.message}</Text> : null}

      <Controller
        control={control}
        name="opponent"
        rules={{ required: 'Adversaire obligatoire' }}
        render={({ field: { onChange, value } }) => (
          <View>
            <Text style={styles.fieldLabel}>Adversaire</Text>
            <TextInput
              style={styles.VersusInput}
              placeholder="Adversaire"
              value={value}
              onChangeText={onChange}
            />
          </View>
        )}
      />
      {errors.opponent ? <Text style={styles.error}>{errors.opponent.message}</Text> : null}

      <Controller
        control={control}
        name="teamId"
        rules={{ required: 'Équipe obligatoire' }}
        render={({ field: { onChange, value } }) => (
          <View>
            <Text style={styles.fieldLabel}>Équipe</Text>
            <TextInput
              style={styles.VersusInput}
              onPress={() => setVisibleTeam(true)}
              placeholder="Choisissez une équipe"
              value={teamSelected ? teamSelected.name : ''}
              editable={false}
            />
            {visibleTeam ? (
              <Picker<number>
                selectedValue={value}
                onValueChange={(itemValue: number) => {
                  setTeamSelected(teams.find(team => team.id === itemValue) ?? null);
                  onChange(itemValue);
                  setVisibleTeam(false);
                }}
                style={styles.picker}
              >
                {teams.map(team => (
                  <Picker.Item label={team.name} value={team.id} key={team.id} />
                ))}
              </Picker>
            ) : null}
          </View>
        )}
      />
      {errors.teamId ? <Text style={styles.error}>{errors.teamId.message}</Text> : null}

      <Button
        title={isSubmitting ? 'Ajout en cours…' : 'Ajouter'}
        onPress={handleSubmit(onSubmit)}
        disabled={isSubmitting}
        color={colors.primary}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    width: '100%',
    padding: 20,
    paddingBottom: 40,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 4,
  },
  selectedDateLabel: {
    fontSize: 15,
    color: '#444',
    marginBottom: 12,
    textTransform: 'capitalize',
  },
  fieldLabel: {
    marginBottom: 6,
    fontWeight: '600',
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
  picker: {
    height: 50,
    width: '100%',
  },
  error: {
    color: 'red',
    marginBottom: 10,
  },
});
