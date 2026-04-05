import { Component, inject } from '@angular/core';
import { ICourse } from '../../models/icourse';
import { ICategory } from '../../models/icategory';
import { FormsModule } from '@angular/forms';
import { NgClass, NgStyle, CurrencyPipe, DatePipe } from '@angular/common';
import { DiscountPipe } from '../../pipes/discount-pipe';
import { StaticCourses } from '../../services/static-courses';
import { CategoriesService } from '../../services/categories-service';

@Component({
  selector: 'app-courses',
  imports: [FormsModule, NgClass, NgStyle, CurrencyPipe, DatePipe, DiscountPipe],
  templateUrl: './courses.html',
  styleUrl: './courses.css',
})
export class Courses {
  totalOrderPrice: number = 0;
  selectedCatId: number = 0;
  discountValue: number = 10;
  date = new Date();

  private staticCourses = inject(StaticCourses);
  private categoriesService = inject(CategoriesService);

  courses: ICourse[] = this.staticCourses.getCoursesByCatID(this.selectedCatId);
  categories: ICategory[] = this.categoriesService.getAllCategories();

  buy(course: ICourse, quantity: string) {
    course.isProcessing = true;
    const totalBeforeDiscount = course.price * +quantity;
    const discountedTotal = totalBeforeDiscount - (totalBeforeDiscount * this.discountValue / 100);
    this.totalOrderPrice += discountedTotal;
    setTimeout(() => {
      course.isProcessing = false;
    }, 3000);
  }

  onCategoryChange() {
    this.courses = this.staticCourses.getCoursesByCatID(this.selectedCatId);
  }
}
