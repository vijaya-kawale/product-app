import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CommonService } from '../shared/common.service';
import { map } from 'rxjs';


@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
})
export class TableComponent {
  visible: boolean = false;
  basicData: any;
  basicOptions: any;
  productForm: FormGroup | any
  products: any = [];
  editingProductId: string | null = null;

  constructor(private commonServe: CommonService) { }

  showDialog() {
    this.visible = true;
  }

  ngOnInit() {
    this.onGetData()
    this.productForm = new FormGroup({
      'ProdName': new FormControl('', Validators.required),
      'quantity': new FormControl('', Validators.required),
      'price': new FormControl('', Validators.required)
    })
  }

  onEditProduct(id:any, product:any){
    this.commonServe.onUpdateData(id, product).subscribe((response: any) => {
          this.productForm.setValue({
            'ProdName': response.ProdName,
            'quantity': response.quantity,
            'price': response.price
          });
          this.editingProductId = id;
      });
  }

  onSubmit() {
    if (this.editingProductId) {
      this.commonServe.onUpdateData(this.editingProductId, this.productForm.value).subscribe(() => {
        this.onGetData();
        this.editingProductId = null;
        this.visible = false;
      });
    } else {
      this.commonServe.sendData(this.productForm.value).subscribe(() => {
        this.onGetData();
        this.visible = false;
      });
    }
    this.productForm.reset()
  }

  onGetData() {
    this.commonServe.receiveData().pipe(map((response: any) => {
      const post = []
      for (let key in response) {
        post.push({...response[key], id:key})
      }
      return post
    })).subscribe((response:any)=>{
      console.log(response)
      this.products = response
      this.updateChartData()
    })
  }

  deleteProduct(id: any) {
    console.log(id, 'id');
    this.commonServe.onDeleteData(id).subscribe(() => {
      this.products = this.products.filter((item: any) => item.id !== id);
      this.onGetData();
    });
  }

  updateChartData() {
    this.basicData = {
      labels: this.products.map((product:any) => product.ProdName),
      datasets: [
        {
          label: 'Quantity',
          backgroundColor: '#42A5F5',
          data: this.products.map((product:any) => product.quantity)
        },
      ]
    };
  }
}
