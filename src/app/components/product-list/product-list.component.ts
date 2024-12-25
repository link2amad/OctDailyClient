import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-list.component.html',
  //styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  searchQuery: string = '';
  sortField: string = '';
  currentPage: number = 1;
  pageSize: number = 10;

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.productService.getProducts().subscribe((data) => {
      this.products = data;
      this.applyFilters();
    });
  }

  onSearch(query: string | null): void {
    this.searchQuery = query ?? '';
    this.applyFilters();
  }

  onSort(field: string): void {
    this.sortField = field;
    this.applyFilters();
  }

  onPreviousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.applyFilters();
    }
  }

  onNextPage(): void {
    this.currentPage++;
    this.applyFilters();
  }

  applyFilters(): void {
    let filteredProducts = this.products;

    if (this.searchQuery) {
      filteredProducts = filteredProducts.filter(product =>
        product.name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    }

    if (this.sortField) {
      filteredProducts = filteredProducts.sort((a, b) => {
        const fieldA = a[this.sortField as keyof Product];
        const fieldB = b[this.sortField as keyof Product];
        return fieldA > fieldB ? 1 : -1;
      });
    }

    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.products = filteredProducts.slice(startIndex, endIndex);
  }

  // ...other methods for CRUD operations...
}
