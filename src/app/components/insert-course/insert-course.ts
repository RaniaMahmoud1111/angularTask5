import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ICategory } from '../../models/icategory';
import { ICourse } from '../../models/icourse';
import { CategoryService } from '../../services/category.service';
import { CourseService, NewCoursePayload } from '../../services/course.service';

@Component({
  selector: 'app-insert-course',
  imports: [FormsModule],
  templateUrl: './insert-course.html',
  styleUrl: './insert-course.css',
})
export class InsertCourse implements OnInit, OnDestroy {
  private readonly categoryService = inject(CategoryService);
  private readonly courseService = inject(CourseService);
  private readonly router = inject(Router);
  private readonly subs = new Subscription();

  categories: ICategory[] = [];
  submitting = false;
  errorMessage = '';

  course: ICourse = {
    id: 0,
    title: '',
    instructor: '',
    price: 0,
    seats: 0,
    Image: '',
    catId: 0,
    category: '',
  };

  ngOnInit(): void {
    this.subs.add(
      this.categoryService.getAllCategories().subscribe({
        next: (cats) => {
          this.categories = cats;
          if (cats.length && this.course.catId === 0) {
            this.course.catId = cats[0].id;
            this.course.category = cats[0].name;
          }
        },
        error: () => {
          this.errorMessage = 'Could not load categories. Check apiBaseUrl and MockAPI setup.';
        },
      }),
    );
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  onCategoryChange(): void {
    const cat = this.categories.find((c) => c.id === this.course.catId);
    this.course.category = cat?.name ?? '';
  }

  onSubmit(): void {
    this.errorMessage = '';
    const payload: NewCoursePayload = {
      title: this.course.title,
      instructor: this.course.instructor,
      price: this.course.price,
      seats: this.course.seats,
      Image: this.course.Image,
      catId: this.course.catId,
      category: this.course.category,
    };
    this.submitting = true;
    this.subs.add(
      this.courseService.addCourse(payload).subscribe({
        next: () => {
          this.submitting = false;
          void this.router.navigate(['/courses']);
        },
        error: () => {
          this.submitting = false;
          this.errorMessage = 'Could not add course. Check apiBaseUrl and MockAPI `courses` resource fields.';
        },
      }),
    );
  }
}
