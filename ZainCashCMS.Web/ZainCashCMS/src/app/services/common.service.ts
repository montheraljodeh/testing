import { Injectable } from '@angular/core';
import { SelectItem, Message, ConfirmationService, MessageService } from "primeng/api";
import { Observable, of, Subject } from "rxjs";
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
import { NgxSpinnerService } from 'ngx-spinner';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { WorkBook } from 'xlsx';
import { utils } from 'xlsx';
import { writeFile } from 'xlsx';

const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';

export interface TableRow {
  [key: string]: any;
}
@Injectable({
  providedIn: 'root'
})

export class CommonService {
  msgs: Message[] = [];
  spinnerQueue: any[] = [];
  ssss: any[] = [];
  newlist: any[] = [];
  obj: any[] = [];

  constructor(private messageService: MessageService, public spinner: NgxSpinnerService, public ConfirmationService: ConfirmationService,
    private http: HttpClient) { }


  public exportAsExcelFile(rows?: any[], excelFileName?: string): void {
    if (rows != null && rows.length > 0) {
      const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(rows);
      const workbook: XLSX.WorkBook = { Sheets: { "Sheet": worksheet }, SheetNames: ["Sheet"] };
      const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
      this.saveAsExcelFile(excelBuffer, excelFileName);
    } else {

     // this.pushToast('warn', 'Warning', 'No records to export');
    }

  }

  pushMessage(type: string, summary: string, messageText: string) {
 // type of message you can pass error, warn or success 
    this.messageService.add({
      severity: type,
      summary: summary,
      detail: messageText
    });
    this.msgs.push({ severity: type, summary: summary, detail: messageText });
  }

  showOrHideSpinner(loading: boolean) {
    this.addToSpinnerQueue(loading);
  }

  pushToast() {
    this.messageService.add({ severity: 'success', summary: 'Success Message', detail: 'Record Saved Successfully' });
  }


  addToSpinnerQueue(loading: boolean) {
    if (loading) {
      if (loading) {
        // setTimeout(() => {
        //   this.spinner.show();
        // }, 2000);
        this.spinner.show();

      }
    } else {
      this.spinner.hide();
    }
  }

  onClose() {
    this.showOrHideSpinner(false);
  }


  private saveAsExcelFile(buffer: any, fileName?: string): void {
    const data: Blob = new Blob([buffer], {
      type: EXCEL_TYPE
    });
    FileSaver.saveAs(data, fileName + EXCEL_EXTENSION);
  }

  getMessagetype(messageType: MessageType) {
    let type = "";
    switch (messageType) {
      case MessageType.Success: {
        type = "success";
        break;
      }
      case MessageType.Error: {
        type = "error";
        break;
      }
      case MessageType.Info: {
        type = "info";
        break;
      }
      case MessageType.Warn: {
        type = "warn";
        break;
      }
      default: {
        //statements;
        break;
      }
    }
    return type;
  }

}
export enum MessageType {
  Info = 1,
  Success = 2,
  Warn = 3,
  Error = 4
}