import { Component, Input, OnChanges, SimpleChanges, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-add-edit-product',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './add-edit-product.component.html',
  //styleUrls: ['./add-edit-product.component.css']
})
export class AddEditProductComponent implements OnChanges {
  @Input() product: Product = { name: '', description: '', price: 0, quantity: 0 };
  @Input() isEditMode: boolean = false;
  @Output() productAddedOrUpdated = new EventEmitter<void>();

  constructor(private productService: ProductService) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['product'] && !changes['product'].firstChange) {
      this.product = { ...changes['product'].currentValue };
    }
  }

  onSubmit(): void {
    if (this.isEditMode) {
      this.productService.updateProduct(this.product).subscribe(() => {
        this.resetForm();
        this.productAddedOrUpdated.emit();
      });
    } else {
      this.productService.addProduct(this.product).subscribe(() => {
        this.resetForm();
        this.productAddedOrUpdated.emit();
      });
    }
  }

  resetForm(): void {
    this.product = { name: '', description: '', price: 0, quantity: 0 };
    this.isEditMode = false;
  }
}
