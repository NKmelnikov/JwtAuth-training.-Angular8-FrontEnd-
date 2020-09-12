import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-services-metalworking',
  templateUrl: './services-metalworking.component.html',
  styleUrls: ['./services-metalworking.component.scss']
})
export class ServicesMetalworkingComponent implements OnInit {

  constructor() {
  }

  page = 1;
  pageSize = 10;
  equipmentList = [];

  ngOnInit(): void {
    for (let i = 1; i < 23; i++) {
      this.equipmentList.push({imgPath: `assets/img/metalworking/portfolio/${i}.jpg`});
    }
  }

}
