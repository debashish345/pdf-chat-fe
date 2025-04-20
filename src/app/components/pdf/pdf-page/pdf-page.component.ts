import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-pdf-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pdf-page.component.html',
  styleUrl: './pdf-page.component.css'
})
export class PdfPageComponent {

  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;
  selectedFile?: File;
  uploadError: string | null = null;

  triggerFileInput(): void {
    this.fileInput.nativeElement.click();
  }

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0] as File;
    console.log('Selected File:', this.selectedFile);
  }

  uploadFile() {
    console.log('Uploading file:', this.selectedFile);
    const formData = new FormData();
    formData.append('file', this.selectedFile!, this.selectedFile!.name);

    fetch(environment.fileUploadEndPoint, {
      method: 'POST',
      body: formData,
    })
    .then((response: any) => {
      if (response.ok) {
        this.uploadError = null;
      } else {
        return response.json().then((data: any) => {
          this.uploadError = data.message || 'Upload failed';
        }).catch(() => {
          this.uploadError = 'Upload failed';
        });
      }
    })
    .catch(error => {
      this.uploadError = error.message || 'Network error during upload';
    });
  }

}
