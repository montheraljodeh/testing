import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-confirm-message',
  templateUrl: './confirm-message.component.html',
  styleUrls: ['./confirm-message.component.scss']
})
export class ConfirmMessageComponent {
@Input() Operation?:string;

@Input() ItemOfObject?:any;


@Output() isConfirm: EventEmitter<number>=new EventEmitter<number>();
constructor(private modalService:NgbModal)
{

}

public isconfirmation(event:number)
{

  if(event ==0)
  {
    this.isConfirm.emit(0);
    this.modalService.dismissAll();

  }else
  {
    this.isConfirm.emit(1);
    this.modalService.dismissAll();

  }
}

}
