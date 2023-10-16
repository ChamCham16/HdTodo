import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Provider } from 'react-redux';

import { RootStackParamList } from '~Screens/Screens.Props';
import {
  TodoList,
  TodoDetail
} from '~Screens';
import store from '~Store';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="TodoList">
          <Stack.Screen
            name="TodoList"
            component={TodoList}
            options={{ title: "My Todos" }}
          />
          <Stack.Screen
            name="TodoDetail"
            component={TodoDetail}
            options={{ title: "" }}
          />

        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};
