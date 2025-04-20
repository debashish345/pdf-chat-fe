import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-pdf-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pdf-page.component.html',
  styleUrl: './pdf-page.component.css'
})
export class PdfPageComponent {

  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;
  selectedFile: File | null = null;

  triggerFileInput(): void {
    this.fileInput.nativeElement.click();
  }

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0] as File;
    console.log('Selected File:', this.selectedFile); // For debugging
  }

  uploadFile() {
    console.log('Uploading file:', this.selectedFile); // For debugging
  }

}
