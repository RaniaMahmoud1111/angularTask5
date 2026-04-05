import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { ICourse } from '../../models/icourse';
import { ICategory } from '../../models/icategory';
import { FormsModule } from '@angular/forms';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { DiscountPipe } from '../../pipes/discount-pipe';
import { CategoryService } from '../../services/category.service';
import { CourseService } from '../../services/course.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-courses',
  imports: [FormsModule, CurrencyPipe, DatePipe, DiscountPipe],
  templateUrl: './courses.html',
  styleUrl: './courses.css',
})
export class Courses implements OnInit, OnDestroy {
  totalOrderPrice: number = 0;
  selectedCatId: number = 0;
  discountValue: number = 10;
  date = new Date();
  loadError = '';

  private readonly courseService = inject(CourseService);
  private readonly categoryService = inject(CategoryService);
  private readonly subs = new Subscription();
  private coursesSub?: Subscription;

  courses: ICourse[] = [];
  categories: ICategory[] = [];

  ngOnInit(): void {
    this.subs.add(
      this.categoryService.getAllCategories().subscribe({
        next: (cats) => {
          this.categories = [{ id: 0, name: 'All' }, ...cats];
        },
        error: () => {
          this.loadError = 'Could not load categories. Check apiBaseUrl in environment.ts and MockAPI.';
        },
      }),
    );
    this.refreshCourses();
  }

  ngOnDestroy(): void {
    this.coursesSub?.unsubscribe();
    this.subs.unsubscribe();
  }

  buy(course: ICourse, quantity: string) {
    course.isProcessing = true;
    const totalBeforeDiscount = course.price * +quantity;
    const discountedTotal = totalBeforeDiscount - (totalBeforeDiscount * this.discountValue) / 100;
    this.totalOrderPrice += discountedTotal;
    setTimeout(() => {
      course.isProcessing = false;
    }, 3000);
  }

  onCategoryChange() {
    this.refreshCourses();
  }

  private refreshCourses() {
    this.coursesSub?.unsubscribe();
    const req =
      this.selectedCatId === 0
        ? this.courseService.getAllCourses()
        : this.courseService.getCoursesByCategoryID(this.selectedCatId);
    this.coursesSub = req.subscribe({
      next: (list) => {
        this.courses = list;
      },
      error: () => {
        this.loadError = 'Could not load courses. Check apiBaseUrl and MockAPI `courses` resource.';
      },
    });
  }
}
