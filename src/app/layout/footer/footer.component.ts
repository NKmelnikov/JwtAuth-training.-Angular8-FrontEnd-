import {Component, OnInit} from '@angular/core';
import {NgRecaptcha3Service} from 'ng-recaptcha3';
import {environment} from '../../../environments/environment';
import {TelegramService} from '../../_services/telegram.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  email;
  text;

  constructor(
    private recaptcha3: NgRecaptcha3Service,
    private telegramService: TelegramService
  ) {
  }

  env = environment;

  ngOnInit() {
    this.recaptcha3.init(this.env.recaptchaPublicKey).then(status => {
      // status: success/error
      // success - script is loaded and greaptcha is ready
      // error - script is not loaded
      console.log(status);
    });
  }

  sendMessageToTelegram() {
    const sendObj = {
      chat_id: this.env.telegramChatId,
      text: [`email: ${this.email}`, `вопрос: ${this.text}`].join("\n"),
      parse_mode: 'markdown',
    };
    this.telegramService.sendMessage(sendObj)
      .subscribe(data => {
        console.log(data);
        this.clearForm();
      });
  }

  clearForm() {
    this.email = '';
    this.text = '';
  }

}
