import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { CheckBox, Icon, Button } from '@rneui/themed';

import { Text } from '~Components';
import { ITodo } from '~Types/Todo.Type';
import { checkTodo } from '~Utils/Firestore.Util';

interface TodoProps {
    todo: ITodo;
    onDelete?: () => void;
    onEdit?: () => void;
};

const BeautifulTodo: React.FC<TodoProps> = ({
    todo,
    onEdit,
    onDelete
}) => {

    return (
        <View style={styles.container}>
            <View style={styles.subContainer}>
                <CheckBox
                    checked={todo.done}
                    checkedColor="#009688"
                    uncheckedColor="#BDBDBD"
                    size={32}
                    onPress={() => checkTodo(todo)}
                    containerStyle={styles.checkbox}
                />
                <TouchableOpacity
                    onPress={onEdit}
                    style={{ flex: 1 }}
                >
                    <Text
                        size='md'
                        style={todo.done ? styles.completed : styles.incomplete}
                    >
                        {todo.title}
                    </Text>
                </TouchableOpacity>
            </View>
            <View style={{ flex: 0 }}>
                <Button
                    onPress={onDelete}
                    containerStyle={{
                        borderRadius: 4,
                    }}
                >
                    <Icon
                        name="delete"
                        color="#fff"
                    />
                </Button>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 16,
        paddingRight: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
        backgroundColor: '#fff',
        borderRadius: 10,
    },
    subContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
    },
    checkbox: {
        padding: 0,
        paddingTop: 3,
        margin: 0,
    },
    completed: {
        textDecorationLine: 'line-through',
        color: '#757575',
    },
    incomplete: {
        textDecorationLine: 'none',
        color: '#212121',
    },
});

export default BeautifulTodo;