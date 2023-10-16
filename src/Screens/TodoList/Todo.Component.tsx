import { memo } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
} from 'react-native';
import dayjs from 'dayjs';

import { ITodo } from '~Types/Todo.Type';

interface TodoProps {
  todo: ITodo;
  onDelete?: () => void;
  onEdit?: () => void;
};

const Todo: React.FC<TodoProps> = ({
  todo,
  onEdit,
  onDelete
}) => {
  return (
    <View style={styles.sectionContainer}>
      <Text
        style={styles.sectionTitle}>
        {todo.title}
      </Text>
      <View style={styles.buttonContainer}>
        <Button onPress={onEdit} color='green' title='EDIT' />
        <Button onPress={onDelete} color='red' title='DELETE' />
      </View>
      <Text
        style={styles.sectionDescription}>
        {dayjs(todo.createdAt).format('DD-MM-YYYY HH:mm:ss')}
      </Text>
    </View>
  );
};

export default memo(Todo);

const styles = StyleSheet.create({
  sectionContainer: {
    marginBottom: 20,
    paddingHorizontal: 24,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderRadius: 5,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: '#000',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: '#000',
  },
  highlight: {
    fontWeight: '700',
  },
  buttonContainer: {
    display: 'flex',
    flexDirection: 'row',
  }
});