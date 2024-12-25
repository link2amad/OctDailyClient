import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product.model';
import { AddEditProductComponent } from '../add-edit-product/add-edit-product.component';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, FormsModule, AddEditProductComponent],
  templateUrl: './product-list.component.html',
  //styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  products: any[] = [];
  searchQuery: string = '';
  sortField: string = '';
  currentPage: number = 1;
  pageSize: number = 3;
  selectedProduct: Product = { name: '', description: '', price: 0, quantity: 0 };
  isEditMode: boolean = false;

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.productService.getProducts(this.searchQuery, this.sortField, this.currentPage, this.pageSize).subscribe((data: any) => {
      this.products = data["products"];
    });
  }

  onSearch(query: string | null): void {
    this.searchQuery = query ?? '';
    this.loadProducts();
  }

  onSort(field: string): void {
    this.sortField = field;
    this.loadProducts();
  }

  onPreviousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.loadProducts();
    }
  }

  onNextPage(): void {
    this.currentPage++;
    this.loadProducts();
  }

  onEditProduct(product: Product): void {
    this.selectedProduct = { ...product };
    this.isEditMode = true;
  }

  onDeleteProduct(productId: number): void {
    this.productService.deleteProduct(productId).subscribe(() => {
      this.loadProducts();
    });
  }

  onProductAddedOrUpdated(): void {
    this.loadProducts();
  }

  // ...other methods for CRUD operations...
}
