import { memo, useState } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';

import { addTodo } from '~Utils/Firestore.Util';

const NewTodo = () => {
    const [title, setTitle] = useState<string>('');

    const handleSubmit = () => {
        addTodo({
            title,
            description: '',
            done: false,
        }, () => {
            setTitle('');
        })
    };

    return (
        <View style={styles.form}>
            <TextInput
                style={styles.input}
                placeholder="Add new todo"
                placeholderTextColor="#000"
                onChangeText={(text: string) => setTitle(text)}
                value={title}
            />
            <Button onPress={handleSubmit} title="Add Todo" disabled={title === ''} />
        </View>
    );
};

export default memo(NewTodo);

const styles = StyleSheet.create({
    form: {
        marginVertical: 20,
        flexDirection: 'row',
        alignItems: 'center'
    },
    input: {
        flex: 1,
        height: 40,
        borderWidth: 1,
        borderRadius: 4,
        padding: 10,
        backgroundColor: '#fff',
        color: 'black',
    }
});