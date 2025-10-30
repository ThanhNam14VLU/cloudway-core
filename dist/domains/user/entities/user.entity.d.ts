export type UserRole = 'CUSTOMER' | 'AIRLINE' | 'ADMIN';
export type AccountStatus = 'ACTIVE' | 'LOCKED';
export declare class User {
    id: string;
    email: string;
    passwordHash: string | null;
    fullName: string;
    avatarUrl: string;
    phone: string | null;
    role: UserRole;
    accountStatus: AccountStatus;
    createdAt: Date;
    updatedAt: Date;
}
