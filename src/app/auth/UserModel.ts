export class UserModel {
  public email: string;
  public password: string;

  constructor(name?, email?, password?) {
    this.email = email;
    this.password = password;
  }

}
