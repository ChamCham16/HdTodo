import { Platform } from 'react-native';
import PushNotification, { PushNotificationObject, PushNotificationScheduleObject } from 'react-native-push-notification';

export const showNotification = (notification: PushNotificationObject) => {
    const formatData = Platform.OS === 'ios' ? { ...notification } : {
        ...notification,
        channelId: 'channel-id',
    };

    PushNotification.localNotification(formatData);
};

export const scheduleNotification = (notification: PushNotificationScheduleObject) => {
    const formatData = Platform.OS === 'ios' ? { ...notification } : {
        ...notification,
        channelId: 'channel-id',
    };

    PushNotification.localNotificationSchedule(formatData);
};

export const handleCancel = () => {
    PushNotification.cancelAllLocalNotifications();
}