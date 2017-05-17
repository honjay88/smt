
import { LocalNotifications } from 'ionic-native';

export class NotificationService {

    constructor() {

    }
    public oneceSchedule() {
        // Schedule a single notification
        LocalNotifications.schedule({
            id: 1,
            text: 'Hello, World!',
            sound: null
        });
    }

}