import React from 'react';
import { View } from 'react-native';
import { useCameraPermission } from 'react-native-vision-camera';

import { TodoCameraProps } from '~Screens/Screens.Props';
import { useAppSelector } from '~Store';
import { getTodoById } from '~Store/Reducers/Todo';
import { Text } from '~Components';

import TodoCameraComponent from './TodoCamera.Container';

const TodoCamera: React.FC<TodoCameraProps> = ({ route }) => {
    const { id } = route.params;

    const todo = useAppSelector(
        (state) => getTodoById(state, id)
    );

    if (!todo) {
        return null;
    }

    const { hasPermission } = useCameraPermission();

    return (
        <>
            {hasPermission ? (
                <TodoCameraComponent todo={todo} />
            ) : (
                <View style={{
                    flex: 1,
                    padding: 16,
                    alignItems: 'center',
                    justifyContent: 'center',
                }}>
                    <Text size='md'>Camera permission is required to run this app.</Text>
                    <Text size='md'>Please change your device's permission settings.</Text>
                </View>
            )}
        </>
    );
};

export default TodoCamera;