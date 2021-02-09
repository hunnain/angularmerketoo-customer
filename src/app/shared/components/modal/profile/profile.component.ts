import {
  Component, OnInit, OnDestroy, ViewChild, TemplateRef, Input, AfterViewInit,
  Injectable, PLATFORM_ID, Inject, Output, EventEmitter
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService } from 'src/app/core/user.service';

@Component({
  selector: 'app-profile-modal',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileModalComponent implements OnInit, AfterViewInit, OnDestroy {

  @ViewChild("profile") profile: TemplateRef<any>;
  @Input() profileData;
  @Output() reloadData: EventEmitter<any> = new EventEmitter();

  public closeResult: string;
  public profileInfo: FormGroup;
  public image: string = '';
  public byteImg: string = '';
  public loading: boolean = false;


  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private modalService: NgbModal,
    private fb: FormBuilder,
    private userService: UserService
  ) {
    this.createForm();
  }

  createForm() {
    this.profileInfo = this.fb.group({
      username: ['', Validators.required],
      phoneNumber: ['', Validators.required],
    })
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
  }

  setDataOnFields() {
    if (this.profileData && Object.keys(this.profileData).length) {
      let { username = '', phoneNumber = '' } = this.profileData;
      this.profileInfo.setValue({ username, phoneNumber });
    }
  }

  openModal() {
    if (isPlatformBrowser(this.platformId)) { // For SSR 
      this.setDataOnFields();
      this.modalService.open(this.profile, {
        size: 'lg',
        backdrop: 'static',
        keyboard: false,
        centered: true,
        windowClass: 'bd-example-modal-md agem'
      }).result.then((result) => {
        `Result ${result}`
      }, (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      });
    }
  }

  save() {
    let data = { ...this.profileInfo.value };
    // if(this.byteImg){
    //   data['image'] = this.byteImg;
    // }
    console.log('💻', data);
    this.loading = true;
    this.userService.updateProfile(data).subscribe(res => {
      if (res) {
        this.loading = false
        this.reloadData.next(true)
        this.modalService.dismissAll();
      }
    })
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  ngOnDestroy() {
  }

  // getCroppedImage(croppedImg) {
  //   this.image = croppedImg
  //   let splited = this.image.split('base64,');
  //   this.byteImg = splited[1];
  // }

}
