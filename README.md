# CoursesApp

A simple Angular application for browsing and purchasing courses.

## Application Logic

### Features
- **Course Catalog**: Displays a list of available courses with details like title, instructor, price, seats, and image.
- **Category Filtering**: Filter courses by category (All, Programming, Design, Marketing, Business).
- **Discount System**: Apply a discount percentage to course prices.
- **Purchase Logic**:
  - Enter quantity for each course.
  - Click "Buy" button to add to total order price.
  - Button shows "Processing" and disables for 3 seconds after click.
  - After 3 seconds, button re-enables if seats are available.
- **Order Summary**: Displays total order price with applied discount.

### Components
- **Home**: Static welcome page.
- **About Us**: Static information page.
- **Contact Us**: Static contact page.
- **Courses**: Main component with course listing and purchase functionality.
- **Not Found**: 404 page for invalid routes.

### Services
- **StaticCourses**: Provides course data with methods `getCoursesByCatID()` and `getCourseByID()`.
- **CategoriesService**: Provides category data with `getAllCategories()`.

### Routing
- Default route redirects to `/home`.
- Routes: `/home`, `/about-us`, `/contact-us`, `/courses`, `/login`.
- Wildcard route for 404 handling.

## Development

Run `npm install` to install dependencies, then `ng serve` to start the development server.

Navigate to `http://localhost:4200/` to view the app.
