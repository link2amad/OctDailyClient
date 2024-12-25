import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = `${environment.apiUrl}/products`;

  constructor(private http: HttpClient) {}

  getProducts(searchQuery: string, sortField: string, page: number, pageSize: number): Observable<Product[]> {
    let params = new HttpParams()
      .set('search', searchQuery)
      .set('sort', sortField)
      .set('page', page.toString())
      .set('pageSize', pageSize.toString());

    return this.http.get<Product[]>(this.apiUrl, { params });
  }

  // ...other CRUD methods (create, update, delete)...
}
