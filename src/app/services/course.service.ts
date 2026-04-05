import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { ICourse } from '../models/icourse';

export type NewCoursePayload = Omit<ICourse, 'id' | 'isProcessing'>;

@Injectable({
  providedIn: 'root',
})
export class CourseService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = environment.apiBaseUrl.replace(/\/$/, '');

  getAllCourses(): Observable<ICourse[]> {
    return this.http.get<unknown[]>(`${this.baseUrl}/courses`).pipe(map((rows) => rows.map((r) => this.normalizeCourse(r))));
  }

  getCoursesByCategoryID(catID: number): Observable<ICourse[]> {
    if (catID === 0) {
      return this.getAllCourses();
    }
    return this.http
      .get<unknown[]>(`${this.baseUrl}/courses`, { params: { catId: String(catID) } })
      .pipe(map((rows) => rows.map((r) => this.normalizeCourse(r))));
  }

  getCourseByID(cID: number): Observable<ICourse | undefined> {
    return this.http.get<unknown>(`${this.baseUrl}/courses/${cID}`).pipe(map((row) => (row ? this.normalizeCourse(row) : undefined)));
  }

  addCourse(course: NewCoursePayload): Observable<ICourse> {
    return this.http.post<unknown>(`${this.baseUrl}/courses`, course).pipe(map((row) => this.normalizeCourse(row)));
  }

  private normalizeCourse(raw: unknown): ICourse {
    const r = raw as Record<string, unknown>;
    return {
      id: this.toNumber(r['id'], 0),
      title: String(r['title'] ?? ''),
      instructor: String(r['instructor'] ?? ''),
      price: this.toNumber(r['price'], 0),
      seats: this.toNumber(r['seats'], 0),
      Image: String(r['Image'] ?? r['image'] ?? ''),
      catId: this.toNumber(r['catId'], 0),
      category: String(r['category'] ?? ''),
      isProcessing: Boolean(r['isProcessing']),
    };
  }

  private toNumber(value: unknown, fallback: number): number {
    if (typeof value === 'number' && !Number.isNaN(value)) {
      return value;
    }
    if (typeof value === 'string') {
      const n = parseFloat(value);
      return Number.isNaN(n) ? fallback : n;
    }
    return fallback;
  }
}
