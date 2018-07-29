import { Component, OnInit , Inject} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-product-dialog',
  templateUrl: './product-dialog.component.html',
  styleUrls: ['./product-dialog.component.css']
})
export class ProductDialogComponent implements OnInit {
  public productForm: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: any,
    public dialogRef: MatDialogRef<ProductDialogComponent>,
    private fb: FormBuilder,
  ) { }

  ngOnInit() {
    this.buildItemForm(this.data.payload);
  }
  buildItemForm(product) {
    this.productForm = this.fb.group({
      id: [product.id || ''],
      name: [product.name || ''],
      price: [product.price || ''],
      stock: [product.stock || ''],
      packing: [product.packing || ''],
      description: [product.description || ''],
      // status: [product.status || 'Active']
    });
  }

  submit() {
    // if a toggle switch would be implemented in form, but synchronize is difficult hence toggle only understands boolean
    if ( this.productForm.value.status === false) {
      this.productForm.value.status = 'Inactive';
    } else if (this.productForm.value.status === true) {
      this.productForm.value.status = 'Active';
    }
    this.dialogRef.close(this.productForm.value);
  }
}
