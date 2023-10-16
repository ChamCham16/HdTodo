import { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Text } from 'react-native';

import { TodoDetailProps } from "~Screens/Screens.Props";
import { updateTodo } from '~Utils/Firestore.Util';

const TodoDetail: React.FC<TodoDetailProps> = ({ route, navigation }) => {
    const { todo } = route.params;

    const [title, setTitle] = useState<string>(todo.title);
    const [description, setDescription] = useState<string>(todo.description || '');

    const disabledCondition = title === '' || (title === todo.title && description === todo.description);

    const handleSave = () => {
        updateTodo({
            ...todo,
            title: title || todo.title,
            description: description,
        }, () => {
            navigation.goBack();
        });
    };

    return (
        <View style={styles.container}>
            <Text style={styles.text}>Title</Text>
            <TextInput
                style={styles.input}
                placeholder="Title..."
                placeholderTextColor="#000"
                onChangeText={(text: string) => setTitle(text)}
                value={title}
            />
            <Text style={styles.text}>Content</Text>
            <TextInput
                style={[styles.input, styles.description]}
                multiline
                numberOfLines={4}
                maxLength={400}
                placeholder="Description..."
                placeholderTextColor="#000"
                onChangeText={(text: string) => setDescription(text)}
                value={description}
            />
            <Button onPress={handleSave} title="SAVE" disabled={disabledCondition} />
        </View>
    );
};

export default TodoDetail;

const styles = StyleSheet.create({
    container: {
        padding: 24,
        gap: 12,
    },
    description: {
        minHeight: 100,
        color: '#000',
    },
    text: {
        color: '#000',
    },
    input: {
        flex: 1,
        minHeight: 40,
        borderWidth: 1,
        borderRadius: 4,
        padding: 10,
        backgroundColor: '#fff',
        color: '#000',
    }
});