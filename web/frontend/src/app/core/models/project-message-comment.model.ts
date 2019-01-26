import { User } from './user.model';


export class ProjectMessageComment {
    id: number;
    text: string;
    created_at: Date;
    user: User;
}
