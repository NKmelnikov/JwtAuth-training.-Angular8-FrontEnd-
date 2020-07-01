import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export class User {
  email: string;
  password: string;
  token?: string;
}

@Injectable({ providedIn: 'root' })
export class UserService {
  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get<User[]>(`/users`);
  }
}
