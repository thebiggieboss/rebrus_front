import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { NzUploadFile } from 'ng-zorro-antd/upload';

@Component({
  selector: 'app-files',
  templateUrl: './files.component.html',
  styleUrls: ['./files.component.scss'],
})
export class FilesComponent implements OnInit, OnDestroy {
  public s: Subscription[] = [];
  public tableData = [
    {
      fileName: 'ТЕСТ_МОНРЕАЛ_2019.docx',
      description: 'Тесты архив',
      creationDate: '20.07.2024',
    },
    {
      fileName: 'ТЕСТ_МОНРЕАЛ_2019.docx',
      description: 'Тесты архив',
      creationDate: '19.07.2024',
    },
  ];
  public isVisibleModal: boolean = false;
  fileList: NzUploadFile[] = [];
  previewImage: string | undefined = '';
  previewVisible = false;
  public fileName: string = '';

  constructor() {}

  ngOnInit(): void {}

  ngOnDestroy() {
    this.s.forEach(s => s.unsubscribe());
  }

  actions(type: string) {}

  onOpenModal() {
    this.isVisibleModal = !this.isVisibleModal;
  }

  handleCancel() {
    this.isVisibleModal = !this.isVisibleModal;
  }

  handleOk() {
    console.log(this.fileList);
  }

  handlePreview = async (file: NzUploadFile) => {
    this.previewImage = file.url || file.thumbUrl;
    this.previewVisible = true;
  };

  beforeUpload = (file: NzUploadFile, fileList: NzUploadFile[]) => {
    return () => {
      return new Promise<boolean>((resolve, reject) => {
        return false;
      });
    };
  };
}
