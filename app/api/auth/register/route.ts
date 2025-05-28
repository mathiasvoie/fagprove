import { prisma } from '@/app/lib/prisma';
import { RegisterUserSchema } from '@/app/schemas/RegisterUser';
import { hash } from 'bcrypt';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  // Turn the requests body into JSON data.
  const data = await req.json();

  // Run the validation schema against the data.
  const valid = RegisterUserSchema.safeParse(data);

  // If the form validation fails, return a 400 response with an error message.
  if (!valid.success) {
    return NextResponse.json('Form validation failed.', { status: 400 });
  }

  // Unpack the data from the request JSON body.
  const { name, email, password } = data;

  // Get records for users with the same email address.
  const isEmailTaken = await prisma.users.count({
    where: {
      email,
    },
  });

  // If the email is already taken, return a 400 response with an error message.
  if (isEmailTaken > 0) {
    return NextResponse.json('Email is already taken.', { status: 409 });
  }

  // Hash the password using bcrypt which is a secure way to store passwords.
  const hashedPassword = await hash(password, 10);

  // Create the user in the database using Prisma ORM.
  await prisma.users.create({
    data: {
      name,
      email,
      password: hashedPassword,
    },
  });

  // Return a success response indicating the user was created successfully.
  return NextResponse.json('User created successfully.');
}
