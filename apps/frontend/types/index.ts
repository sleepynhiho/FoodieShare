// Export all types from recipe types
export * from './recipe';

// User Types
export interface User {
    id: number;
    username: string;
    email: string;
    avatar: string;
    createdAt: string;
}

// Favorite Types
export interface Favorite {
    userId: number;
    recipeId: number;
    createdAt: string;
}

// Rating Types
export interface Rating {
    userId: number;
    recipeId: number;
    score: 1 | 2 | 3 | 4 | 5; // 1-5 rating
    createdAt: string;
}

// Search and Filter Types
export interface RecipeFilters {
    category?: string;
    difficulty?: string;
    minPrepTime?: number;
    maxPrepTime?: number;
    minCookTime?: number;
    maxCookTime?: number;
}

// export interface SearchParams {
//   query?: string;
//   filters?: RecipeFilters;
//   sortBy?: 'title' | 'createdAt' | 'rating' | 'difficulty';
//   sortOrder?: 'asc' | 'desc';
//   page?: number;
//   limit?: number;
// }

// // API Response Types
// export interface ApiResponse<T> {
//   success: boolean;
//   data?: T;
//   message?: string;
//   error?: string;
// }

// export interface PaginatedResponse<T> {
//   data: T[];
//   pagination: {
//     page: number;
//     limit: number;
//     total: number;
//     totalPages: number;
//   };
// }

// Authentication Types
export interface LoginForm {
    email: string;
    password: string;
}

export interface RegisterForm {
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
}

export interface AuthUser {
    id: number;
    username: string;
    email: string;
    avatar?: string;
    token: string;
}