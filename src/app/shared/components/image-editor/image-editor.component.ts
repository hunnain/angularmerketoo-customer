import { Component, ElementRef, ViewChild, VERSION, Input, Output, EventEmitter } from '@angular/core';
// import ImageEditor = require('tui-image-editor');
import ImageEditor from 'tui-image-editor'

@Component({
    selector: 'app-image-editor',
    templateUrl: './image-editor.component.html',
    styleUrls: ['./image-editor.component.scss']
})
export class ImageEditorComponent {
    @ViewChild('tuiImageEditor') tuiImgEditor: ElementRef
    @Input() image: string = 'https://image.shutterstock.com/image-vector/ui-image-placeholder-wireframes-apps-260nw-1037719204.jpg';
    @Output() getEditedImage: EventEmitter<any> = new EventEmitter();
    instance;
    base64Image: string;
    constructor() { }

    ngAfterViewInit() {
        console.log("image editor component", this.image)
        let elem = this.tuiImgEditor.nativeElement;
        this.instance = new ImageEditor(elem, {
            includeUI: {
                loadImage: {
                    path: this.image,
                    name: 'SampleImage',
                },
                // locale: locale_ru_RU,
                // theme: blackTheme, // or whiteTheme
                // initMenu: 'filter',
                menuBarPosition: 'left',
            },
            usageStatistics: false,
            cssMaxWidth: 700,
            cssMaxHeight: 500,
            selectionStyle: {
                cornerSize: 20,
                rotatingPointOffset: 70,
            },
        });
    }

    getImage() {
        if (this.instance) {
            this.base64Image = this.instance.toDataURL();
            this.getEditedImage.emit(this.base64Image);
        }
    }

    fileChangeEvent(e) {
        let file = e.target.files[0];
        if (this.instance) {
            this.instance.loadImageFromFile(file);
        }

    }

}
