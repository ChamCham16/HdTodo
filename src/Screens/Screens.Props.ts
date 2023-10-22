import { NativeStackScreenProps } from '@react-navigation/native-stack';

export type RootStackParamList = {
    TodoList: undefined;
    TodoDetail: {
        id: string;
    };
    TodoCamera: {
        id: string;
    }
};

export type TodoListProps = NativeStackScreenProps<RootStackParamList, 'TodoList'>;
export type TodoDetailProps = NativeStackScreenProps<RootStackParamList, 'TodoDetail'>;
export type TodoCameraProps = NativeStackScreenProps<RootStackParamList, 'TodoCamera'>;