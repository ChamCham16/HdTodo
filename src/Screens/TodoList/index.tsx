import { useCallback, useEffect } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';

import { TodoListProps } from '~Screens/Screens.Props';
import { useAppDispatch, useAppSelector } from '~Store';
import { ITodo } from '~Types/Todo.Type';
import { setTodos } from '~Store/Reducers/Todo';
import { getTodos, deleteTodo } from '~Utils/Firestore.Util';

import Todo from './Todo.Component';
import NewTodo from './NewTodo.Component';

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
        navigation.navigate('TodoDetail', { todo });
    }, []);

    return (
        <View style={styles.container}>
            <NewTodo />
            <ScrollView
                contentInsetAdjustmentBehavior="automatic"
            >
                {todos.map(((todo, index) => {
                    return (
                        <Todo
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