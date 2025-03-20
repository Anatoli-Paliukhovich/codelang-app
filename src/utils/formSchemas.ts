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
