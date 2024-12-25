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
  products: any[] = [];
  searchQuery: string = '';
  sortField: string = '';
  currentPage: number = 1;
  pageSize: number = 10;

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

  // ...other methods for CRUD operations...
}
