import { DefaultSession } from 'next-auth';

declare module 'next-auth' {
  interface User {
    id: string;
    name: string;
    email: string;
  }

  interface Session extends DefaultSession {
    user?: User;
  }
}

export type SerializedStateDates<T> = Omit<
  T,
  'deletedAt' | 'publishedAt' | 'createdAt' | 'updatedAt' | 'datePurchased'
> & {
  publishedAt: string;
  createdAt: string;
  updatedAt: string;
};
