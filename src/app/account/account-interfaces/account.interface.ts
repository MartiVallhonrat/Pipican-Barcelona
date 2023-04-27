export interface User {
    Username?: string | null;
    Email?: string | null;
    Password?: string | null;
    ProfileImage?: string | null;
    DogBreeed?: string | null;
} 
export interface UserFirebase {
    Username: string | null;
    Email: string | null;
    Password: string | null;
    ProfileImage: string | null;
    DogBreeed: string | null;
    id: string;
} 