import { Component, ElementRef, EventEmitter, Input, OnInit, Output, QueryList, ViewChildren } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CustomHeader, FormField } from 'src/app/models/models';
import { CommonService } from 'src/app/services/common.service';
interface TableRow {
  [key: string]: any;
}


@Component({
  selector: 'app-dynamictable',
  templateUrl: './dynamictable.component.html',
  styleUrls: ['./dynamictable.component.scss']
})


export class DynamictableComponent implements OnInit {
  @ViewChildren('colou', { read: ElementRef }) listofsearch!: QueryList<ElementRef>;

  Searchable: string = "";
  isShow: boolean = false;
  ShowMessage: string = "";
  idof: string = "";
  Form!: FormGroup;
  searchone = { search: "", searchField: "" };
  isshowedit: boolean = false;
  first?: number;
  rows: number = 10;
  public imageSrc!: string | ArrayBuffer | null;


  @Input() isShowAddDelete: boolean = true;
  @Input() PageName?: string;
  @Input() ColoumnOfName?: CustomHeader[];
  @Input() RowOfData!: TableRow[];
  @Input() TotalRecord: any;
  @Input() CurrentPages: any;
  @Input() formFields!: FormField[];
  @Input() isShowEdit: boolean = true;
  @Input() isShowEyeIcon: boolean = false;
  @Input() RowOfDataForExcel!: TableRow[];

  @Output() sortField: EventEmitter<string> = new EventEmitter<string>();
  @Output() search: EventEmitter<string> = new EventEmitter<string>();
  @Output() searching: EventEmitter<{}> = new EventEmitter<{}>();
  @Output() id: EventEmitter<string> = new EventEmitter<string>();
  @Output() showform: EventEmitter<string> = new EventEmitter<string>();
  @Output() currentpage: EventEmitter<number> = new EventEmitter<number>();
  @Output() SubmitForm: EventEmitter<any> = new EventEmitter<any>();
  @Output() UpdateForm: EventEmitter<any> = new EventEmitter<any>();
  @Output() versionNo: EventEmitter<number> = new EventEmitter<number>();

  constructor(private modalService: NgbModal, private fb: FormBuilder, private cs: CommonService) {
  }
  ngOnInit(): void {

    // console.log(this.formFields)
    this.Form = this.fb.group({});

    this.first = (this.CurrentPages - 1) * this.rows;
    this.initializeFormFields();


  }

  public onSubmit(): void {
    if (this.Form.valid) {
      if (this.isshowedit) {
        this.UpdateForm.emit(this.Form.value);

      } else {
        this.SubmitForm.emit(this.Form.value);

      }
      this.Form.reset();
      this.isshowedit = false;
      this.modalService.dismissAll();
    } else {
      console.log('Form validation failed!');
    }
  }

  private initializeFormFields(): void {
    for (const field of this.formFields) {
      // console.log(field.subProperties?.length)

      const validators = field.required ? [Validators.required] : [];
      if (field.name) {
        if (field.subProperties?.length !== undefined) {
          // console.log(true)
          const subGroup = this.fb.group({
            arabic: [null, validators],
            english: [null, validators]
          });
          this.Form.addControl(field.name, subGroup);
        } else {

          if (field.type == 'color') {
            this.Form.addControl(field.name, this.fb.control('#000000', validators));

          }
          else {
            this.Form.addControl(field.name, this.fb.control(null, validators));

          }
        }
      }
    }
  }

  SortField(coloumnName: string) {
    if (coloumnName.includes('.')) {
      var x;
      x = coloumnName.split('.');
      x = this.convertToUpper(x[0]) + '.' + this.convertToUpper(x[1]);
      this.sortField?.emit(x);

    }
    else {
      this.sortField?.emit(this.convertToUpper(coloumnName));

    }
  }

  public open(content: any) {
    this.initializeFormFields()
    this.modalService.open(content, { size: 'lg' });

  }


  onFileChange(event: any, imagefield: any) {
    if (event.target.files.length > 0) {

      this.convertToBase64(event.target.files[0], imagefield);
    }
  }

  convertToBase64(file: File, imagefield: any): void {
    const reader = new FileReader();
    reader.onload = (e: any) => {
      this.imageSrc = e.target.result;

      this.Form.controls[imagefield].setValue(e.target.result);

    };
    reader.readAsDataURL(file);
  }

  public onCancel() {
    this.modalService.dismissAll();
    this.Form.reset();

    this.isshowedit = false;
  }

  GetDelete(event: any) {
    this.cs.ConfirmationService.confirm({
      message: 'Are you sure you want to delete the selected record',
      header: 'Delete Confrimation',
      accept: () => {
        this.id.emit(event);
      },
      reject: () => { }
    })
  }


  GetChargeLimitVersion(event: any) {
    this.versionNo.emit(event);
  }

  getItemValue(item: any, key: string): string {
    const keys = key.split('.'); // Split the key by '.' to handle nested properties
    let value = item;
    for (const k of keys) {
      value = value?.[k]; // Use safe navigation operator to access nested properties
    }
    console.log(value)
    return value !== undefined && value != null ? value.toString() : '';
  }

  onEdit(content: any, obj: any) {
    this.isshowedit = true;
    this.Form.patchValue(obj);
    this.modalService.open(content, { size: 'lg' });
  }
  convertToUpper(key: string) {
    return key.replace(/\s/g, '').replace(/^\w/, (c) => c.toUpperCase());
  }

  exportToExcel() {
    if (this.RowOfDataForExcel) {
      this.cs.exportAsExcelFile(this.RowOfDataForExcel, this.PageName);

    } else {
      this.cs.exportAsExcelFile(this.RowOfData, this.PageName);

    }
  }

  getvalue() {
    let count = 0;

    console.log(this.listofsearch.forEach(item => {
      console.log(item.nativeElement.value)
      if (item.nativeElement.value != "") {
        this.searchone.search += item.nativeElement.value + "|";
        if (this.ColoumnOfName![count].key?.includes('.') && this.ColoumnOfName![count].key1 == undefined) {
          var x;
          x = this.ColoumnOfName![count].key?.split('.');
          x = this.convertToUpper(x![0]) + '.' + this.convertToUpper(x![1]);
          this.searchone.searchField += x + '|';
          count++
        }
        else {
          if (this.ColoumnOfName![count].key1 != undefined) {
            this.searchone.searchField += this.convertToUpper(this.ColoumnOfName![count].key1?.replace(" ", "")!) + "|";
            count++
          } else {
            this.searchone.searchField += this.convertToUpper(this.ColoumnOfName![count].key?.replace(" ", "")!) + "|";
            count++
          }

        }
      }
      else {
        count++
      }
    }))
    const filteredArray = this.searchone.search.split("|").filter(value => value !== "");
    if (filteredArray.length == 1) {
      this.searchone.search = this.searchone.search.replace("|", "");
      this.searchone.searchField = this.searchone.searchField.replace("|", "");
    }
    this.searching.emit(this.searchone);
    this.searchone.search = "";
    this.searchone.searchField = "";
  }

  GetSingleSearch(event: string) {
    this.searchone.search = event;
    this.searchone.searchField = "";
    this.currentpage.emit(1);
    this.first = 1;
    this.searching.emit(this.searchone);
  }

  Reset() {
    window.location.reload();
  }


  onPageChange(event: any) {

    this.currentpage.emit(event.page + 1);
  }

  public async changelanguage() {

  }


}

