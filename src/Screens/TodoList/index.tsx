import { useCallback, useEffect } from 'react';
import { View, StyleSheet, ScrollView, Button } from 'react-native';

import { TodoListProps } from '~Screens/Screens.Props';
import { useAppDispatch, useAppSelector } from '~Store';
import { ITodo } from '~Types/Todo.Type';
import { setTodos } from '~Store/Reducers/Todo';
import { getTodos, deleteTodo } from '~Utils/Firestore.Util';
import { scheduleNotification, showNotification } from '~Utils/Notification.Util';

import NewTodo from './NewTodo.Component';
import BeautifulTodo from './BeautifulTodo.Component';

const TodoList: React.FC<TodoListProps> = ({ navigation }) => {
    const dispatch = useAppDispatch();

    const todos = useAppSelector(
        (state) => state.todo.todos
    );

    useEffect(() => {
        const unsubscribe = getTodos((data) => {
            dispatch(setTodos(data));
        });

        return () => unsubscribe();
    }, []);

    const editTodo = useCallback((todo: ITodo) => {
        navigation.navigate('TodoDetail', { id: todo.id });
    }, []);

    const handleShowNotification = () => {
        showNotification({
            title: 'Hello',
            message: 'world!',
        });
    };

    const handleScheduleNotification = () => {
        scheduleNotification({
            title: 'hello',
            message: 'world! (scheduled)',
            date: new Date(Date.now() + 5 * 1000),
        });
    };

    return (
        <View style={styles.container}>
            <Button onPress={handleShowNotification} title="Show Notification now" />
            <Button onPress={handleScheduleNotification} title="Show Notification after 5s" />
            <NewTodo />
            <ScrollView
                contentInsetAdjustmentBehavior="automatic"
            >
                {todos.map(((todo, index) => {
                    return (
                        <BeautifulTodo
                            key={index}
                            todo={todo}
                            onDelete={() => deleteTodo(todo.id)}
                            onEdit={() => editTodo(todo)}
                        />
                    );
                }))}
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 20,
        marginBottom: 20,
        flex: 1,
    },
});

export default TodoList;