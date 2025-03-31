import { z } from "zod";

export const formSchemaAskQuestionForm = z.object({
  title: z.string().min(1, { message: "Title must be at least 1 character." }),
  description: z
    .string()
    .min(1, { message: "Description must be at least 1 character." }),
  attachedCode: z
    .string()
    .min(1, { message: "Code must be at least 1 character." }),
});

export const formSchemaEditQuestionForm = z.object({
  title: z.string().min(1, { message: "Title must be at least 1 character." }),
  description: z
    .string()
    .min(1, { message: "Description must be at least 1 character." }),
  attachedCode: z
    .string()
    .min(1, { message: "Code must be at least 1 character." }),
});

export const formSchemaChangedPasswordForm = z
  .object({
    oldPassword: z
      .string()
      .min(6, { message: "Password must be at least 6 characters." }),
    newPassword: z
      .string()
      .min(6, { message: "Password must be at least 6 characters." }),
    confirmPassword: z
      .string()
      .min(6, { message: "Password must be at least 6 characters." }),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export const formSchemaChangedUserName = z.object({
  username: z
    .string()
    .min(5, { message: "Password must be at least 5 characters." }),
});

export const formSchemaCreatePostForm = z.object({
  language: z.string().nonempty("Choose your language"),
  code: z.string().min(1, { message: "Code must be at least 1 characters." }),
});

const passwordValidation = z
  .string()
  .min(6, { message: "Password must be at least 6 characters." })
  .regex(/[a-z]/, {
    message: "Password must contain at least one lowercase letter.",
  })
  .regex(/[A-Z]/, {
    message: "Password must contain at least one uppercase letter.",
  })
  .regex(/[0-9]/, { message: "Password must contain at least one number." })
  .regex(/[\W_]/, { message: "Password must contain at least one symbol." });

export const formSchemaRegisterForm = z
  .object({
    username: z
      .string()
      .min(5, { message: "Username must be at least 5 characters." }),
    password: passwordValidation,
    confirmPassword: z
      .string()
      .min(6, { message: "Password must be at least 6 characters." }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export const formSchemaLoginForm = z.object({
  username: z
    .string()
    .min(5, { message: "Username must be at least 5 characters." }),
  password: passwordValidation,
});
