import { Injectable } from '@angular/core';
import { ICourse } from '../models/icourse';

@Injectable({
  providedIn: 'root', // authModule , any
})
export class StaticCourses {
  private courses: ICourse[] = [
    {
      id: 1,
      title: "Angular Basics",
      instructor: "John Doe",
      price: 100,
      seats: 20,
      Image: "images/An.jfif",
      catId: 1,
      category: "Programming",
      isProcessing: false
    },
    {
      id: 2,
      title: "UI/UX Design",
      instructor: "Jane Smith",
      price: 150,
      seats: 0,
      Image: "images/UI.jfif",
      catId: 2,
      category: "Design",
      isProcessing: false
    },
    {
      id: 3,
      title: "Digital Marketing",
      instructor: "Bob Johnson",
      price: 80,
      seats: 15,
      Image: "images/DM.jfif",
      catId: 3,
      category: "Marketing",
      isProcessing: false
    },
    {
      id: 4,
      title: "Business Strategy",
      instructor: "Alice Brown",
      price: 200,
      seats: 10,
      Image: "images/BS.jfif",
      catId: 4,
      category: "Business",
      isProcessing: false
    },
    {
      id: 5,
      title: "React Advanced",
      instructor: "Charlie Wilson",
      price: 120,
      seats: 1,
      Image: "images/React.jfif",
      catId: 1,
      category: "Programming",
      isProcessing: false
    }
  ];

  getCoursesByCatID(catID: number): ICourse[] {
    if (catID == 0) {
      return this.courses;
    }
    return this.courses.filter(course => course.catId == catID);
  }

  getCourseByID(courseID: number): ICourse | null {
    return this.courses.find(course => course.id == courseID) || null;
  }
}
