import { type OfficialType } from '@/src/@types/OfficialType'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { type ComponentProps } from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'

type OfficialRoleSectionProps = {
  title: string
  isFull: boolean
  officials: OfficialType[]
  emptyLabel: string
  iconName: ComponentProps<typeof MaterialCommunityIcons>['name']
  onRegister: () => void
}

export function OfficialRoleSection({
  title,
  isFull,
  officials,
  emptyLabel,
  iconName,
  onRegister,
}: OfficialRoleSectionProps) {
  return (
    <>
      <View style={styles.headerRow}>
        <Text style={styles.title}>{title}</Text>
        {isFull && <Text style={styles.fullTag}>Complet</Text>}
        <Pressable
          disabled={isFull}
          onPress={onRegister}
          style={[styles.registerButton, isFull && styles.disabledRegister]}
        >
          <MaterialCommunityIcons name={iconName} size={24} color={isFull ? '#cfcfcf' : 'white'} />
        </Pressable>
      </View>

      {
        officials.length > 0
          ? officials.map((official, index) => (
            <Text style={styles.official} key={`${title}-${official.OfficialRole}-${index}`}>
              {official.User?.Firstname} {official.User?.Lastname} {official.User?.LicenceNb}
            </Text>
          ))
          : <Text style={styles.official}>{emptyLabel}</Text>
      }
    </>
  )
}

const styles = StyleSheet.create({
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
  },
  title: {
    alignSelf: 'flex-start',
    fontSize: 20,
    fontWeight: 'bold',
    borderRadius: 20,
    margin: 15,
    color: 'white',
  },
  official: {
    alignSelf: 'flex-start',
    fontSize: 14,
    marginLeft: 15,
    paddingBottom: 5,
    color: 'white',
  },
  registerButton: {
    marginLeft: 10,
  },
  disabledRegister: {
    opacity: 0.45,
  },
  fullTag: {
    color: '#ffe082',
    fontWeight: '700',
    fontSize: 12,
    backgroundColor: 'rgba(0, 0, 0, 0.22)',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 10,
  },
})
