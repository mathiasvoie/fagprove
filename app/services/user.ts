import { prisma } from '../lib/prisma';

export class User {
  static async isAdministrator(userId: string) {
    return (await prisma.users.findUnique({
      where: {
        id: userId,
        type: 'admin',
      },
    }))
      ? true
      : false;
  }
}
