import { useState, useCallback } from 'react';
import { View, StyleSheet } from 'react-native';
import { CheckBox, Input, Button, Icon } from '@rneui/themed';
import dayjs from 'dayjs';

import { TodoDetailProps } from "~Screens/Screens.Props";
import { updateTodo } from '~Utils/Firestore.Util';
import { useAppSelector } from '~Store';
import { getTodoById } from '~Store/Reducers/Todo';
import { deleteTodo } from '~Utils/Firestore.Util';
import { Text } from '~Components';

import SnapShotContainer from './SnapShot';

const TodoDetail: React.FC<TodoDetailProps> = ({ route, navigation }) => {
    const { id } = route.params;

    const todo = useAppSelector(
        (state) => getTodoById(state, id)
    );

    if (!todo) {
        return null;
    }

    const [title, setTitle] = useState<string>(todo.title);
    const [description, setDescription] = useState<string>(todo.description || '');
    const [done, setDone] = useState<boolean>(todo.done);

    const disabledCondition = title === '' || (title === todo.title && description === todo.description && done === todo.done);

    const handleSave = () => {
        updateTodo({
            ...todo,
            title: title || todo.title,
            description: description,
            done: done,
        }, () => {
            navigation.goBack();
        });
    };

    const showCamera = useCallback(() => {
        navigation.navigate('TodoCamera', { id });
    }, []);

    const handleDelete = useCallback(() => {
        deleteTodo(id, () => {
            navigation.goBack();
        });
    }, [id]);

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Input
                    containerStyle={{
                        height: 50,
                    }}
                    inputContainerStyle={{
                        borderBottomWidth: 0,
                        borderRadius: 4,
                        paddingLeft: 4,
                        backgroundColor: '#fff',
                    }}
                    placeholder="Title..."
                    placeholderTextColor="#000"
                    onChangeText={(text: string) => setTitle(text)}
                    value={title}
                    leftIcon={
                        <CheckBox
                            containerStyle={{
                                flex: 0,
                                backgroundColor: undefined,
                                padding: 0,
                            }}
                            size={32}
                            checked={done}
                            onPress={() => setDone((done) => !done)}
                        />
                    }
                    rightIcon={
                        <Button
                            containerStyle={{
                                borderRadius: 4,
                            }}
                            onPress={handleSave}
                            disabled={disabledCondition}
                        >
                            <Icon name="save" color="#fff" />
                        </Button>
                    }
                />
            </View>
            <View style={{ flex: 1 }}>
                <Input
                    containerStyle={{
                        flex: 1,
                        borderRadius: 4,
                    }}
                    inputContainerStyle={{
                        borderBottomWidth: 0,
                        borderRadius: 4,
                        paddingHorizontal: 12,
                        backgroundColor: '#fff',
                    }}
                    multiline
                    maxLength={800}
                    placeholder="Description..."
                    placeholderTextColor="#000"
                    onChangeText={(text: string) => setDescription(text)}
                    value={description}
                />
            </View>
            <View style={{
                marginHorizontal: 10,
                borderRadius: 4,
                backgroundColor: '#fff',
            }}>
                <SnapShotContainer todo={todo} />
            </View>
            <View style={styles.footer}>
                <Button onPress={handleDelete} >
                    <Icon name="delete" color="white" />
                </Button>
                <Text size='xs'>
                    {`Edited ${dayjs(todo.createdAt).format('MMM DD, HH:mm')}`}
                </Text>
                <Button onPress={showCamera}>
                    <Icon name="camera" color="white" />
                </Button>
            </View>
        </View>
    );
};

export default TodoDetail;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        paddingVertical: 12,
        gap: 12,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    footer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginHorizontal: 10,
        backgroundColor: '#fff',
        borderRadius: 4,
    },
});