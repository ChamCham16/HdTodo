import { memo } from 'react';
import { StyleSheet, View, FlatList } from 'react-native';

import { ITodo } from '~Types/Todo.Type';
import { deleteImage } from '~Utils/Firestore.Util';

import FullScreenImage from './FullScreenImage.Component';

const SnapShot = ({ todo }: { todo: ITodo }) => {
    const renderItem = ({ item, index }: { item: string, index: number }) => (
        <View style={styles.container}>
            <FullScreenImage
                key={item}
                thumbnailUrl={item}
                imageUrl={item}
                onDelete={() => deleteImage(todo, item)}
            />
        </View>
    );

    return (
        <View>
            <FlatList
                horizontal
                data={todo.images}
                renderItem={renderItem}
                keyExtractor={(item, index) => `${todo.id}-${item}`}
                showsHorizontalScrollIndicator={false}
            />
        </View>
    );
};

export default memo(SnapShot);

const styles = StyleSheet.create({
    container: {
        margin: 4,
        borderRadius: 10,
        overflow: 'hidden',
    },
});