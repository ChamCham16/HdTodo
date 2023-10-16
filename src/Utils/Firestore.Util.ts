import firestore from '@react-native-firebase/firestore';

import { ITodo, ITodoWithoutID } from '~Types/Todo.Type';

const collectionPath = 'todos';

export const getTodos = (callback?: (data: ITodo[]) => void) => {
    try {
        const unsubscribe = firestore()
            .collection(collectionPath)
            .orderBy("createdAt", "desc")
            .onSnapshot({
                next: (snapshot) => {
                    const newTodos = snapshot.docs.map((doc) => {
                        const data = doc.data();
                        return {
                            id: doc.id,
                            ...data,
                            createdAt: data.createdAt?.toDate().toString() || null,
                        } as ITodo;
                    });
                    !!callback && callback(newTodos);
                }
            });

        return unsubscribe;
    } catch (error) {
        console.log(error);
        return () => {};
    }
}

export const addTodo = (data: ITodoWithoutID, callback?: () => void) => {
    try {
        firestore()
            .collection("todos")
            .add({
                ...data,
                createdAt: firestore.Timestamp.fromDate(new Date()),
            })
            .then(() => {
                !!callback && callback();
            })
    } catch (error) {
        console.log(error);
    }
};

export const deleteTodo = (id: string, callback?: () => void) => {
    try {
        firestore()
            .collection(collectionPath)
            .doc(id)
            .delete()
            .then(() => {
                !!callback && callback();
            })
    } catch (error) {
        console.log(error);
    }
};

export const updateTodo = (todo: ITodo, callback?: () => void) => {
    try {
        firestore()
            .collection(collectionPath)
            .doc(todo.id)
            .update({
                title: todo.title,
                description: todo.description,
                createdAt: firestore.Timestamp.fromDate(new Date()),
            })
            .then(() => {
                !!callback && callback();
            })
    } catch (error) {
        console.log(error);
    }
};