import { User } from './user.model';

export class Message {
    id: number;
    chat_id: String;
    sender: User;
    text: String;
    created_at: Date;

    constructor(obj?: any) {
        Object.assign(this, obj);
        this.sender = new User(obj.sender);
    }

}
