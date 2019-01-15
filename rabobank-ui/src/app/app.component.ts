import { Component, OnInit, ViewChild } from '@angular/core';
import * as XLSX from 'xlsx';
import { MatTableDataSource, MatSort, MatColumnDef, MatRowDef } from '@angular/material';
import { Issueinfo } from './app.issueinfo';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  data: any;
  dataSource;
  flag: boolean = false;
  displayedColumns = ['firstName', 'surName', 'issueCount', 'dob'];
  items: Issueinfo[] = [];
  constructor() {
  }
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue;
  }
  onFileChange(evt: any) {
    const target: DataTransfer = <DataTransfer>(evt.target);
    if (target.files.length !== 1) { throw new Error('Cannot use multiple files'); }
    const reader: FileReader = new FileReader();
     reader.onload = (e: any) => {
      const fileString: string = e.target.result;
      const workbook: XLSX.WorkBook = XLSX.read(fileString, { type: 'binary' });
      const worksheetname: string = workbook.SheetNames[0];
      const worksheet: XLSX.WorkSheet = workbook.Sheets[worksheetname];
      this.data = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
      this.data.forEach((element, index) => {
        if (index === 0) { return; }
          this.flag = true;
          this.items.push(new Issueinfo(element[0], element[1], element[2], element[3]));
      });
      this.dataSource = new MatTableDataSource(this.items);
    };
    reader.readAsBinaryString(target.files[0]);
  }

}
