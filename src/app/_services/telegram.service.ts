import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';

@Injectable({providedIn: 'root'})
export class TelegramService {

  public env = environment;

  constructor(private http: HttpClient) {
  }

  sendMessage(data) {
    return this.http.post(`https://api.telegram.org/bot${this.env.telegramBotToken}/sendMessage`, data);
  }
}
