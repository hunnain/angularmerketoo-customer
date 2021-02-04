import { Component, Input, OnInit, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import {
  ImageCroppedEvent,
  ImageCropperComponent,
  CropperPosition
} from "ngx-image-cropper";

@Component({
  selector: 'app-cropper',
  templateUrl: './cropper.component.html',
  styleUrls: ['./cropper.component.scss'],
})
export class CropperComponent implements OnInit {
  @Input() roundCropper: boolean = false;
  @Output() getImage: EventEmitter<any> = new EventEmitter()

  imageChangedEvent: any = '';
  croppedImage: any = '';
  showCropper = false;

  lastCropperPosition: CropperPosition;
  lastCroppedImage: any;

  @ViewChild("imageCropper") imageCropper: ImageCropperComponent;
  @ViewChild("inputFile") public inputFile: ElementRef;

  constructor() { }

  ngOnInit(): void { }


  ngAfterViewInit(): void {
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.
    // this.logoModal.config = { backdrop: "static", keyboard: false };

  }

  imageCropped(event: ImageCroppedEvent) {
    // console.log("cropped", event)
    this.croppedImage = event.base64;
    this.getImage.next(this.croppedImage);
  }

  imageLoaded() {
    // show cropper
    console.log("cropper open")

  }
  cropperReady() {
    // cropper ready
  }
  loadImageFailed() {
    // show message
  }

  fileChangeEvent(event: any): void {
    console.log("event", event);
    this.imageChangedEvent = event;
  }

  crop() {
    this.imageCropper.crop();
    this.lastCropperPosition = this.getCurrentCropperPosition();
    this.lastCroppedImage = new ElementRef(this.imageCropper.sourceImage.nativeElement);

    console.log("croppedImage", this.lastCroppedImage);
    // this.logoModal.hide();
  }

  cancelCrop() {
    console.log("lastCroppedImage", this.lastCroppedImage);
    if (this.lastCroppedImage) {
      this.imageCropper.sourceImage = this.lastCroppedImage;
    }

    if (this.lastCropperPosition) {
      this.imageCropper.cropper = this.getLastCropperPosition();
    }

    // this.logoModal.hide();
  }

  getCurrentCropperPosition() {
    return {
      x1: this.imageCropper.cropper.x1,
      x2: this.imageCropper.cropper.x2,
      y1: this.imageCropper.cropper.y1,
      y2: this.imageCropper.cropper.y2
    };
  }

  getLastCropperPosition() {
    return {
      x1: this.lastCropperPosition.x1,
      x2: this.lastCropperPosition.x2,
      y1: this.lastCropperPosition.y1,
      y2: this.lastCropperPosition.y2
    };
  }

  reCrop() {
    // this.logoModal.show();
  }

}
