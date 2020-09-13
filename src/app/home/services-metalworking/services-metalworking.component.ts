import {Component, OnInit} from '@angular/core';
import {MetalworkingService} from '../../_services/metalworking.service';
import {environment} from '../../../environments/environment';
import { NgxGalleryOptions, NgxGalleryImage, NgxGalleryAnimation } from 'ngx-gallery-9';

@Component({
  selector: 'app-services-metalworking',
  templateUrl: './services-metalworking.component.html',
  styleUrls: ['./services-metalworking.component.scss']
})
export class ServicesMetalworkingHomeComponent implements OnInit {

  constructor(private metalworkingService: MetalworkingService) {
  }

  page = 1;
  pageSize = 10;
  equipmentList = [];
  env = environment;
  galleryOptions = [];
  galleryImages = [];
  imagesReady = false;

  ngOnInit(): void {
    this.galleryOptions = [
      {
        width: '100%',
        height: '600px',
        thumbnailsColumns: 4,
        imageAnimation: NgxGalleryAnimation.Slide
      },
      // max-width 800
      {
        breakpoint: 800,
        width: '100%',
        height: '600px',
        imagePercent: 80,
        thumbnailsPercent: 20,
        thumbnailsMargin: 20,
        thumbnailMargin: 20
      },
      // max-width 400
      {
        breakpoint: 400,
        preview: false
      }
    ];

    this.metalworkingService.getAll()
      .subscribe(data => {
        this.equipmentList = data;
        this.equipmentList.map(el => {
          el.small = this.env.serverURL + el.imgPath;
          el.medium = this.env.serverURL + el.imgPath;
          el.big = this.env.serverURL + el.imgPath;
        });
      });
  }

  imagesReadyEvent() {
    this.imagesReady = true;
  }

}
