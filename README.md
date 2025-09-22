<p align="center">
  <img src="./apps/frontend/public/logo.png" alt="logo" width="100%" />
</p>

![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)

# FoodieShare
FoodieShare is a recipe-sharing platform where users can browse, search, add new recipes, rate, and favorite delicious recipes.

## 📚 Table of Contents
- [Team Information](#team-information)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [License](#license)

<a id="team-information"></a>
## 🙆‍♀️ Team Information
- **Team Name:** Devlicious
- **Team Members:**

| Name                   | Role       | 
|------------------------|------------|
| Ho Ha Nhi              | Fullstack  |
| Do Quynh Chi           | Fullstack  |
| Nguyen Le Anh Xuan     | Fullstack  |
| Nguyen Ngoc Nhu Huyen  | Fullstack  |

<a id="features"></a>
## ✨ Features
### Recipe List Page
- Display a list of recipes.
- Show recipe title, short description, cooking time, and author.

### Recipe Detail Page
- Display full recipe with ingredients and cooking steps.
- Include an optional image.

### Add Recipe Page
- Form to add a new recipe.
- Fields: Title, Author, Description, Time, Category, Ingredients, Steps.

### Search & Filter
- Search recipes by title.
- Filter recipes by category (e.g., Dessert, Main Dish, Drink).

### Bonus features
- Favorite recipes.
- Category tabs for quick navigation.
- Random Recipe button.
- Rating system.

<a id="tech-stack"></a>
## 🛠 Tech Stack
### Frontend
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=next.js&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)
![shadcn/ui](https://img.shields.io/badge/shadcn/ui-000000?style=for-the-badge&logo=radixui&logoColor=white)

### Backend
![NestJS](https://img.shields.io/badge/NestJS-E0234E?style=for-the-badge&logo=nestjs&logoColor=white)
![Supabase](https://img.shields.io/badge/Supabase-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-4169E1?style=for-the-badge&logo=postgresql&logoColor=white)
![Cloudinary](https://img.shields.io/badge/Cloudinary-3448C5?style=for-the-badge&logo=cloudinary&logoColor=white)

<a id="installation"></a>
## ⚙️ Installation
**Note:** Follow the .env.example files in the frontend and backend folders to setup environment properly.

### Clone the repository
```Bash
git clone https://github.com/sleepynhiho/FoodieShare.git
cd FoodieShare
```

### Backend Setup
**1. Navigate to Backend**
```Bash
cd apps/backend
```
**2. Install dependencies**
```Bash
pnpm install
```
**3. Run migrations**
```Bash
pnpm prisma migrate deploy
```
**4. Run the Backend**
```Bash
pnpm run start:dev
```

### Frontend Setup
**1. Navigate to Frontend**
```Bash
cd apps/frontend
```
**2. Install dependencies**
```Bash
pnpm install
```
**3. Run the Frontend**
```Bash
pnpm dev
```
<a id="license"></a>
## 📄 License
This project is licensed under the [MIT License](LICENSE).
