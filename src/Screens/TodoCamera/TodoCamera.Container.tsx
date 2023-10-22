import React, { useRef, useState } from 'react';
import { View } from 'react-native';
import { Camera, useCameraDevice } from 'react-native-vision-camera';
import { Button, Icon } from '@rneui/themed';

import { ITodo } from '~Types/Todo.Type';
import { Text } from '~Components';
import { saveSnapshot } from '~Utils/Storage.Util';

const TodoCameraComponent = ({ todo }: { todo: ITodo }) => {
    const cameraRef = useRef<Camera>(null);
    const device = useCameraDevice('back');

    const [shooting, setShooting] = useState<boolean>(false);

    const takeSnapshot = async () => {
        if (cameraRef.current) {
            setShooting(true);
            const photo = await cameraRef.current.takePhoto({
                qualityPrioritization: 'speed',
            });
            await saveSnapshot(todo, photo.path);
            setShooting(false);
        }
    };

    if (!device) {
        return (
            <View style={{
                flex: 1,
                padding: 16,
                alignItems: 'center',
                justifyContent: 'center',
            }}>
                <Text size='md'>No camera device available.</Text>
            </View>
        );
    }

    return (
        <View style={{ flex: 1, }}>
            <Camera
                ref={cameraRef}
                device={device}
                style={{ flex: 1 }}
                photo={true}
                isActive={true}
            />
            <View style={{
                position: 'absolute',
                height: 200,
                width: '100%',
                bottom: 0,
                backgroundColor: 'rgba(0, 0, 0, 0.4)',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
            }}>
                <Button containerStyle={{
                    borderRadius: 100,
                }}
                    onPress={takeSnapshot}
                    disabled={shooting}
                >
                    <Icon
                        name='camera'
                        type='material'
                        color='#fff'
                        size={48}
                    />
                </Button>
            </View>
        </View>
    );
};

export default TodoCameraComponent;