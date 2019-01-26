export class User {
  id: number;
  username: string;
  first_name: string;
  last_name: string;
  profile_pic: string;

  constructor(obj?: any) {
    Object.assign(this, obj);
  }

  public fullName(): String {
    return this.first_name + ' ' + this.last_name;
  }

  public getAvatarColor(): string {
    let sum = 0;
    if (!this.first_name || !this.last_name) {
      sum = this.username[0].charCodeAt(0) + this.username[1].slice(-1).charCodeAt(0);
    } else {
      sum = this.first_name[0].charCodeAt(0) + this.last_name[0].charCodeAt(0);
    }
    return User.getColors()[sum % User.getColors().length];
  }

  public getAvatarName(): string {
    if (!this.first_name || !this.last_name) {
      return this.username[0] + this.username.slice(-1);
    }
    return this.first_name[0] + this.last_name[0];
  }

  public hasPicture() {
    return this.profile_pic != null && this.profile_pic != 'null';
  }

  private static getColors() {
    return [
      '#FFB900',
      '#D83B01',
      '#B50E0E',
      '#E81123',
      '#B4009E',
      '#5C2D91',
      '#0078D7',
      '#00B4FF',
      '#008272',
      '#107C10',
      '#0096e0',
      '#d97638',
      '#eb5a50',
      '#d16ba6',
      '#749e5a',
      '#c94e30'
    ];
  }
}
