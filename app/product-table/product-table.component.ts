import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { MatTableDataSource, MatDialogRef, MatDialog, MatPaginator, MatSort } from '@angular/material';
import { ProductDataService } from '../product-data.service';
import { ProductDialogComponent } from '../product-dialog/product-dialog.component';
import { ProductDeleteDialogComponent } from '../product-delete-dialog/product-delete-dialog.component';
import { Product } from '../product';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-product-table',
  templateUrl: './product-table.component.html',
  styleUrls: ['./product-table.component.css']
})
export class ProductTableComponent implements OnInit, OnDestroy {

  public tabledata: Product[] = [];
  public getProductSub: Subscription;
  displayedColumns: string[] = ['id', 'name', 'price', 'stock', 'packing', 'description', 'status', 'actions'];

  public my_Class = 'color=primary';

  dataSource: MatTableDataSource<Product>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private dialog: MatDialog,
    private productDataService: ProductDataService,
  ) {

  }

  ngOnInit() {
    this.getProducts(); // wir packen nicht alles unter ngOnInit
  }
  ngOnDestroy() {
    if (this.getProductSub) {
      this.getProductSub.unsubscribe();
    }
  }
  getProducts() {
    this.getProductSub = this.productDataService.getAllProducts()
      .subscribe((tabledata) => { // hier könnte auch eine anderer neme vom typ Product[] = [] stehen
        // https://stackblitz.com/edit/angular-dnj6gj?file=app%2Ftable-filtering-example.ts
        this.tabledata = tabledata;
        this.dataSource = new MatTableDataSource(tabledata);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      });
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim().toLowerCase();
    this.dataSource.filter = filterValue;


    if (this.dataSource.paginator) {
       this.dataSource.paginator.firstPage();
     }
  }

  changeProductStatus(row) {
    this.productDataService.toggleProductStatus(row)
    .subscribe((toggle) => {
      const foundIndex = this.tabledata.findIndex(x => x.id === row.id);
      Object.assign(this.tabledata[foundIndex] , toggle);
      this.dataSource.data = this.tabledata;
    });
  }

  editItem(data: any = {}, isNew?) {
    const title = isNew ? 'Add product' : 'Update product';
    const dialogRef: MatDialogRef<any> = this.dialog.open(ProductDialogComponent, {
      width: '650px',
      disableClose: true,
      data: { title: title, payload: data }
    });
    dialogRef.afterClosed()
      .subscribe(result => {
        console.log('dialog: ' + JSON.stringify(result));
        if (!result) {
          console.log('nothing to process');
          return;
        }
        // otherwise continue with data
        if (isNew) {
          this.productDataService.addProduct(result)
            .subscribe((newProd) => {
              this.tabledata = this.tabledata.concat(newProd);
              this.dataSource.data = this.tabledata;
            });
        } else {
          this.productDataService.updateProduct(data.id, result)
            .subscribe((updatedProduct) => {
              const foundIndex = this.tabledata.findIndex(x => x.id === data.id);
              Object.assign(this.tabledata[foundIndex] , updatedProduct);
              // https://github.com/angular/material2/issues/8381 Answer willshowell commented on 13 Nov 2017
              // we need to add .data
              this.dataSource.data = this.tabledata;
            });
        }
      });
  }

  deleteItem(row) {
    const title = 'Confirm';
    const message = 'Delete ' + row.name + '?';
    const dialogRef = this.dialog.open(ProductDeleteDialogComponent, {
      width: '400px',
      disableClose: true,
      data: {title: title, message: message}
    });
    dialogRef.afterClosed()
      .subscribe(result => {
        if (result) {
          this.productDataService.removeItem(row.id)
            .subscribe((_) => {
              this.tabledata = this.tabledata.filter((d) => d.id !== row.id);
              this.dataSource.data = this.tabledata;
            });
        }
      });
  }

}

