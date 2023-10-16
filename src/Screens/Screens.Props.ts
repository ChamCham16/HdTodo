import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { ITodo } from '~Types/Todo.Type';

export type RootStackParamList = {
    TodoList: undefined;
    TodoDetail: {
        todo: ITodo;
    };
};

export type TodoListProps = NativeStackScreenProps<RootStackParamList, 'TodoList'>;
export type TodoDetailProps = NativeStackScreenProps<RootStackParamList, 'TodoDetail'>;