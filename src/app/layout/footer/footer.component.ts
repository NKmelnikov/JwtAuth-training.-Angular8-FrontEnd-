import {Component, OnInit} from '@angular/core';
import {NgRecaptcha3Service} from 'ng-recaptcha3';
import {environment} from '../../../environments/environment';
import {TelegramService} from '../../_services/telegram.service';
import {RecaptchaService} from '../../_services/recaptcha.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {ErrorStateMatcher} from '@angular/material/core';
import {FormControl, FormGroupDirective, NgForm, Validators} from '@angular/forms';

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || isSubmitted));
  }
}

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  email = '';
  text = '';
  userData;
  recaptchaToken;
  formSendClicked = false;
  env = environment;
  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);
  matcher = new MyErrorStateMatcher();

  constructor(
    private recaptcha3: NgRecaptcha3Service,
    private recaptchaService: RecaptchaService,
    private telegramService: TelegramService,
    private snackBar: MatSnackBar
  ) {
  }

  ngOnInit() {
    this.recaptcha3.init(this.env.recaptchaPublicKey).then(status => {
      console.log(`recaptcha loaded with status: ${status}`);
      // @ts-ignore
      window.grecaptcha.ready(() => {
        this.recaptcha3.getToken().then(token => {
          this.recaptchaToken = token;
          console.log(`recaptcha token loaded`);
        });
      });
    });
  }

  sendMessageToTelegram() {
    this.formSendClicked = true;
    const sendObj = {
      chat_id: this.env.telegramChatId,
      text: [
        `*Вопрос*`,
        `email: ${this.email}`,
        `вопрос: ${this.text}`
      ].join("\n"),
      parse_mode: 'markdown',
    };

    this.recaptchaService.checkValidity(this.recaptchaToken)
      .subscribe(response => {
        // @ts-ignore
        if (response.success) {
          this.telegramService.sendMessage(sendObj)
            .subscribe(data => {
              this.clearForm();
              this.formSendClicked = true;
              this.snackBar.open('Сообщение было успешно отправлено, в ближайшее время с Вами свяжется наш администратор', 'Закрыть', {
                duration: 7000,
              });
            });
        }
      });
  }

  clearForm() {
    this.emailFormControl.markAsPristine();
    this.emailFormControl.markAsUntouched();
    this.email = '';
    this.text = '';
  }

  blockFormButton() {
    return this.email === '' || this.text === '' || this.emailFormControl.status === 'INVALID';
  }
}
