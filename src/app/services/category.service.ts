import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { ICategory } from '../models/icategory';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = environment.apiBaseUrl.replace(/\/$/, '');

  getAllCategories(): Observable<ICategory[]> {
    return this.http.get<unknown[]>(`${this.baseUrl}/categories`).pipe(
      map((rows) => rows.map((row) => this.normalizeCategory(row as Record<string, unknown>))),
    );
  }

  private normalizeCategory(raw: Record<string, unknown>): ICategory {
    return {
      id: this.toNumber(raw['id'], 0),
      name: String(raw['name'] ?? ''),
    };
  }

  private toNumber(value: unknown, fallback: number): number {
    if (typeof value === 'number' && !Number.isNaN(value)) {
      return value;
    }
    if (typeof value === 'string') {
      const n = parseInt(value, 10);
      return Number.isNaN(n) ? fallback : n;
    }
    return fallback;
  }
}
