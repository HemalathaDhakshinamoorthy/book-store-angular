import { Component, Inject } from '@angular/core';
import { MatDialogActions, MatDialogContent, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-book-delete',
  imports: [MatDialogActions, MatDialogContent],
  standalone: true,
  templateUrl: './book-delete.component.html',
  styleUrls: ['./book-delete.component.css']
})
export class BookDeleteComponent {
  constructor(private dialogRef: MatDialogRef<BookDeleteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { id: number }
  ) {}

  onConfirm(): void {
    // Close the dialog and return true to confirm deletion
    this.dialogRef.close(true);
  }

  onCancel(): void {
    // Close the dialog without confirming
    this.dialogRef.close(false);
  }
}