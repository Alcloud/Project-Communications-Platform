import { User } from './user.model';
import { ProjectMessageComment } from './project-message-comment.model';

export class ProjectMessage {
    id: number;
    text: string;
    created_at: Date;
    updated_at: Date;
    user: User;
    comments: ProjectMessageComment[];
}
