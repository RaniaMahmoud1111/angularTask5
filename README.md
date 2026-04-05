# CoursesApp

Angular app to browse courses, filter by category, and add new courses through a form. Course and category data come from a [MockAPI](https://mockapi.io/) project.

## Before you run the app

1. Create a free project on [mockapi.io](https://mockapi.io/).
2. Add two resources:
   - **categories** — field: `name` (string).
   - **courses** — fields: `title`, `instructor`, `price` (number), `seats` (number), `Image` (string), `catId` (number), `category` (string).
3. Open `src/environments/environment.ts` (and `environment.prod.ts` for production builds) and set `apiBaseUrl` to your API root, for example `https://YOUR_ID.mockapi.io` (no trailing slash).

## Run locally

```bash
npm install
ng serve
```

Open [http://localhost:4200/](http://localhost:4200/).

## What the app does

- **Courses** — Lists courses from the API. Pick a category (including “All”), set a discount %, and use **Buy** to add a line to the running order total (with a short “processing” state).
- **Insert course** — Form to create a course: category dropdown (from API), title, instructor, price, seats, image path/URL, and category label. On success you are sent back to **Courses**.

## Main pieces

| Area | Role |
|------|------|
| `src/environments/environment.ts` | `apiBaseUrl` for MockAPI |
| `CategoryService` | `getAllCategories()` → `GET /categories` |
| `CourseService` | `getAllCourses()`, `getCoursesByCategoryID(id)`, `getCourseByID(id)`, `addCourse(payload)` |
| `Courses` component | Loads categories and courses; unsubscribes HTTP subscriptions in `ngOnDestroy` |
| `InsertCourse` component | Insert form; same unsubscribe pattern |

## Routes

| Path | Page |
|------|------|
| `/` | Redirects to `/home` |
| `/home`, `/about-us`, `/contact-us` | Static pages |
| `/courses` | Course catalog |
| `/insertcourse` | New course form |
| `/login` | Login page |
| `**` | Not found |

## Older files (optional)

`StaticCourses` and `CategoriesService` still exist under `src/app/services/` but the **Courses** and **Insert course** flows use `CourseService` and `CategoryService` with HTTP instead.
