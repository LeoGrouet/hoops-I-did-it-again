
import React, { useState, useEffect } from 'react';
import { View, Text, FlatList } from 'react-native';
import { supabase } from '../utils/supabase';

interface User {
  id: number;
  name: string;
}

export default function App() {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const getUsers = async () => {
      try {
        const { data: users, error } = await supabase.from('Users').select();

        if (error) {
          console.error('Error fetching todos:', error.message);
          return;
        }

        if (users && users.length > 0) {
          setUsers(users);
        }
      } catch (error) {
        console.error('Error fetching users:', error.message);
      }
    };

    getUsers();
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>User List</Text>
      <FlatList
        data={users}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <Text key={item.id}>{item.name}</Text>}
      />
    </View>
  );
};

