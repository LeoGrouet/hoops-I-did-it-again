import React, { useState, useEffect } from 'react';
import { View, Text, FlatList } from 'react-native';
import { supabase } from '../utils/supabase';

interface User {
  id: number;
  Firstname: string;
  Lastname: string;
  LicenceNb: string | null;
  role: string | null;
}


export default function App() {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const getUsers = async () => {
      const { data, error } = await supabase.from('Users').select('*');

      if (error) {
        console.error(error);
        return;
      }

      if (data) setUsers(data);
    };

    getUsers();
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 }}>
      <Text style={{ fontSize: 20, marginBottom: 10 }}>Liste des utilisateurs</Text>
      <FlatList
        data={users}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <Text>{item.Firstname} {item.Lastname}</Text>
        )}
      />
    </View>
  );
}
