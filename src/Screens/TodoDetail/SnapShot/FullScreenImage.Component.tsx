import React, { useState } from 'react';
import { Image, Modal, StyleSheet, TouchableOpacity } from 'react-native';
import { Button, Icon } from '@rneui/themed';

const FullScreenImage = ({ thumbnailUrl, imageUrl, onDelete }: { thumbnailUrl: string, imageUrl: string, onDelete?: () => void }) => {
    const [isModalVisible, setModalVisible] = useState(false);

    const openModal = () => {
        setModalVisible(true);
    };

    const closeModal = () => {
        setModalVisible(false);
    };

    return (
        <>
            <TouchableOpacity onPress={openModal}>
                <Image
                    source={{ uri: thumbnailUrl }}
                    style={{ width: 100, height: 100 }}
                />
            </TouchableOpacity>

            <Modal
                animationType="slide"
                transparent={false}
                visible={isModalVisible}
                onRequestClose={closeModal}
            >
                <TouchableOpacity style={styles.modalContainer} onPress={closeModal}>
                    <Image source={{ uri: imageUrl }} style={styles.image} />
                    <Button containerStyle={{
                        position: 'absolute',
                        bottom: 20,
                        right: 20,
                        borderRadius: 100,
                    }}
                        onPress={(e) => {
                            e.stopPropagation();
                            !!onDelete && onDelete();
                        }}>
                        <Icon
                            name='delete'
                            type='material'
                            color='#fff'
                            size={32}
                        />
                    </Button>
                </TouchableOpacity>
            </Modal>
        </>
    );
};

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'black',
    },
    image: {
        width: '100%',
        height: '100%',
        resizeMode: 'contain',
    },
});

export default FullScreenImage;