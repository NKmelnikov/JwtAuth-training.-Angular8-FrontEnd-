import {Component, Inject, OnInit, Optional} from '@angular/core';
import {CatalogsInterface} from '../../../admin/catalogs/catalogs.interface';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {ErrorStateMatcher} from '@angular/material/core';
import {FormControl, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {NgRecaptcha3Service} from 'ng-recaptcha3';
import {RecaptchaService} from '../../../_services/recaptcha.service';
import {TelegramService} from '../../../_services/telegram.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {environment} from '../../../../environments/environment';

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || isSubmitted));
  }
}

@Component({
  selector: 'app-products-oil-dialog-home',
  templateUrl: './products-oil-dialog-home.component.html',
  styleUrls: ['./products-oil-dialog-home.component.scss']
})
export class ProductsOilDialogHomeComponent implements OnInit {

  localData;
  action;
  email;
  comment;
  recaptchaToken;
  env = environment;
  emailFormControl = new FormControl('', [
    Validators.required,
  ]);
  matcher = new MyErrorStateMatcher();

  constructor(
    @Optional() @Inject(MAT_DIALOG_DATA) public data: CatalogsInterface,
    public dialogRef: MatDialogRef<ProductsOilDialogHomeComponent>,
    private recaptcha3: NgRecaptcha3Service,
    private recaptchaService: RecaptchaService,
    private telegramService: TelegramService,
    private snackBar: MatSnackBar
  ) {
    this.localData = data;
    this.action = this.localData.action;
  }

  ngOnInit(): void {
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

  actionTranslateMapping(action) {
    switch (action) {
      case 'request':
        return 'Запросить цену';
      case 'order':
        return 'Заказать';
    }
  }

  sendMessageToTelegram(action) {
    const sendObj = {
      chat_id: this.env.telegramChatId,
      text: [
        `*${action}*`,
        `название: _${this.localData.name}_`,
        `категория: _${this.localData.category_name}_`,
        `подкатегория: _${this.localData.subcategory_name}_`,
        `бренд: _${this.localData.brand_name}_`,
        `email|телефон: _${this.email}_`,
        `комментарий: _${this.comment}_`
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
              this.dialogRef.close({event: this.action, data: this.localData});
              this.snackBar.open(
                'Сообщение было успешно отправлено, в ближайшее время с Вами свяжется наш администратор',
                'Закрыть',
                {
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
    this.comment = '';
  }

  blockFormButton() {
    return this.email === '' || this.emailFormControl.status === 'INVALID';
  }

  closeDialog() {
    this.dialogRef.close({event: 'cancel'});
  }
}
