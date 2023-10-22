import storage from '@react-native-firebase/storage';
import { Platform } from 'react-native';

import { ITodo } from '~Types/Todo.Type';

import { pushImage } from './Firestore.Util';

export const getSnapshots = async (id: string, callback?: (urls: string[]) => void) => {
    try {
        const imageRefs = await storage()
            .ref()
            .child(`snapshot/${id}/`)
            .listAll()

        const urls = await Promise.all(imageRefs.items.map((ref) => ref.getDownloadURL()));
        !!callback && callback(urls);
    } catch (error) {
        console.log(error);
    }
};

export const saveSnapshot = async (todo: ITodo, uri: string, callback?: (url: string) => void) => {
    try {
        const filename = uri.substring(uri.lastIndexOf('/') + 1);
        const uploadUri = Platform.OS === 'ios' ? uri.replace('file://', '') : uri;

        const ref = storage()
            .ref(`snapshot/${todo.id}/${filename}`);

        await ref.putFile(uploadUri);

        const url = await ref.getDownloadURL();

        pushImage(todo, url, callback);
    } catch (error) {
        console.log(error);
    }
};