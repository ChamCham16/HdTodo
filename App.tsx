import { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Provider } from 'react-redux';
import { useCameraPermission } from 'react-native-vision-camera';
import { PermissionsAndroid, Platform } from 'react-native';

import { RootStackParamList } from '~Screens/Screens.Props';
import {
  TodoList,
  TodoDetail,
  TodoCamera,
} from '~Screens';
import store from '~Store';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  const { hasPermission, requestPermission } = useCameraPermission();

  useEffect(() => {
    if (Platform.OS === 'android') {
      PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.CAMERA);
      PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS);
    }

    if (!hasPermission) {
      requestPermission();
    }
  }, []);

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
          <Stack.Screen
            name="TodoCamera"
            component={TodoCamera}
            options={{ title: "" }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};
