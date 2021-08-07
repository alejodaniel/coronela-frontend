import {Component, OnInit} from '@angular/core';
import {ProductService} from "../../service/product.service";
import {Products} from "../../Model/product";
import {FormControl, FormGroup, NgForm, Validators} from "@angular/forms";
import Swal from 'sweetalert2'


@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.css']
})
export class PrincipalComponent implements OnInit {
  newProduct: Products = new Products();
  product: Products = new Products();
  dataList: any[];
  deletedId = '';
  productForm: FormGroup;

  createFormGroup() {
    return new FormGroup({
      nameProduct: new FormControl('', Validators.required),
      descriptionProduct: new FormControl('', Validators.required),
      priceProduct: new FormControl('', Validators.required),
      categoryProduct: new FormControl('', Validators.required),
      photoProduct: new FormControl('', Validators.required),
    });
  }

  constructor(private productService: ProductService) {
    this.productForm = this.createFormGroup();
  }

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts() {
    this.productService.getProducts().subscribe((res: any) => {
      this.dataList = res.product;
      console.log(this.dataList);
    });
  }

  loadProduct(id) {
    this.productService.getProductById(id).subscribe((res: any) => {
      this.newProduct.idProducts = res.productId.idProducts;
      this.newProduct.nameProduct = res.productId.nameProduct;
      this.newProduct.descriptionProduct = res.productId.descriptionProduct;
      this.newProduct.priceProduct = res.productId.priceProduct;
      this.newProduct.categoryProduct = res.productId.categoryProduct;
      this.newProduct.photoProduct = res.productId.photoProduct;
      console.log(this.newProduct.idProducts)
    });
  }

  bloquearBoton() {
    if (this.dataList.length <= 0) {
      return false;
    } else {
      return true;
    }
  }

  updateProduct() {
    this.productService.updateProduct(this.newProduct).subscribe((res: any) => {
      Swal.fire(
        'Bien!',
        'Producto actualizado correctamente!',
        'success'
      )
      this.getProducts();
    })
  }

  addProduct() {
    this.productService.addProduct(this.newProduct).subscribe((res: any) => {
      Swal.fire(
        'Bien!',
        'Producto creado correctamente!',
        'success'
      )
      this.resetForm();
      this.getProducts();
    });
  }

  deleteProduct() {
    this.productService.deleteProduct(this.deletedId).subscribe((res: any) => {
      Swal.fire(
        'Bien!',
        'Producto eliminado correctamente!',
        'info'
      )
      this.getProducts()
    }, err => {
      Swal.fire(
        'Oppps!',
        'Error al eliminar!',
        'error'
      )
    });


  }



  resetForm() {
    this.productForm.reset();
  }

  get nameProduct() {
    return this.productForm.get('nameProduct')
  }

  get descriptionProduct() {
    return this.productForm.get('descriptionProduct')
  }

  get priceProduct() {
    return this.productForm.get('priceProduct')
  }

  get categoryProduct() {
    return this.productForm.get('categoryProduct')
  }

  get photoProduct() {
    return this.productForm.get('photoProduct');
  }
}
