import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// Pantallas
import HomeScreen from './screens/HomeScreen';
import ViewNoteScreen from './screens/ViewNoteScreen';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'BetterNotes' }} />
        <Stack.Screen name="ViewNote" component={ViewNoteScreen} options={{ title: 'View Note' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
