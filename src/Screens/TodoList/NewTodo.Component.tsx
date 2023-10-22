import { memo, useState } from 'react';
import { StyleSheet } from 'react-native';
import { Button, Icon, Input } from '@rneui/themed';

import { addTodo } from '~Utils/Firestore.Util';

const NewTodo = () => {
    const [adding, setAdding] = useState<boolean>(false);
    const [title, setTitle] = useState<string>('');

    const handleSubmit = () => {
        setAdding(true);
        addTodo({
            title,
            description: '',
            done: false,
            images: [],
        }, () => {
            setTitle('');
            setAdding(false);
        })
    };

    return (
        <Input
            containerStyle={styles.containter}
            placeholder="Todo..."
            inputContainerStyle={styles.input}
            placeholderTextColor="gray"
            onChangeText={(text: string) => setTitle(text)}
            value={title}
            rightIcon={
                <Button
                    containerStyle={{
                        borderRadius: 20,
                    }}
                    onPress={handleSubmit}
                    disabled={title === '' || adding}
                >
                    <Icon
                        name="add"
                        type="ionicon"
                        color="#fff"
                        containerStyle={{ borderRadius: 100 }}
                    />
                </Button>
            }
        />
    );
};

export default memo(NewTodo);

const styles = StyleSheet.create({
    containter: {
        flex: 0,
        height: 90,
    },
    input: {
        borderBottomWidth: 0,
        marginVertical: 20,
        borderRadius: 100,
        paddingLeft: 12,
        backgroundColor: '#fff',
    }
});