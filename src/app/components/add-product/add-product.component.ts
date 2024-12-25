import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-add-product',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './add-product.component.html',
  //styleUrls: ['./add-product.component.css']
})
export class AddProductComponent {
  newProduct: Product = { name: '', description: '', price: 0, quantity: 0 };

  constructor(private productService: ProductService) {}

  onAddProduct(): void {
    this.productService.addProduct(this.newProduct).subscribe(() => {
      this.newProduct = { name: '', description: '', price: 0, quantity: 0 };
    });
  }
}
