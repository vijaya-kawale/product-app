import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent {

  @Input() header: string = 'Dialog';
  @Input() visible: boolean = false;
  @Input() modal: boolean = true;
  @Input() closable: boolean = true;
  @Output() visibleChange: EventEmitter<boolean> = new EventEmitter<boolean>();

  close() {
    debugger
    this.visible = false;
    this.visibleChange.emit(this.visible);
    console.log('fghj')
  }

} 
