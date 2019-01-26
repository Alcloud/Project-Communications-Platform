import { User } from "./user.model";

export class Event {
    id: number;
    title: string;
    day: Date;
    start_time: string;
    end_time: string;
    description: string;
    user: User;
  }