import * as zod from "zod";

export let registerSchema = zod
  .object({
    name: zod
      .string()
      .nonempty("name is required")
      .min(3, "min length must be more 3 chars")
      .max(12, "max length must be less 12 chars"),

    email: zod
      .email()
      .nonempty("email is required")
      .regex(
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        "invalid email",
      ),

    dateOfBirth: zod
      .string()
      .nonempty("date is required")
      .refine((dateValue) => {
        let userDate = new Date(dateValue).getFullYear();
        let nowDate = new Date().getFullYear();
        return nowDate - userDate > 18 ? true : false;
      }, "Date should be less then 2012"),

    gender: zod.enum(["male", "female"]),

    password: zod
      .string()
      .nonempty("password is required")
      .regex(
        /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
        "Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one digit, and one special character from #?!@$%^&*-.",
      ),

    rePassword: zod.string().nonempty("repassword is required"),
  })
  .refine(
    (obj) => {
      if (obj.password === obj.rePassword) {
        return true;
      } else {
        return false;
      }
    },
    { path: ["rePassword"], error: "Password and rePassord not match" },
  );

export type registerSchemaType = zod.infer<typeof registerSchema>;

export let loginSchema = zod.object({
  email: zod
    .email()
    .nonempty("email is required")
    .regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, "invalid email"),

  password: zod
    .string()
    .nonempty("password is reqiured")
    .regex(
      /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
      "Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one digit, and one special character from #?!@$%^&*-.",
    ),
});

export type loginSchemaType = zod.infer<typeof loginSchema>;




export let passwordChangeSchema = zod.object({
  password: zod
    .string()
    .nonempty("Password is reqiured")
    .regex(
      /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
      "Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one digit, and one special character from #?!@$%^&*-.",
    ),
  newPassword: zod
    .string()
    .nonempty("Password is reqiured")
    .regex(
      /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
      "Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one digit, and one special character from #?!@$%^&*-.",
    ),
});

export type passwordChangeSchemaType = zod.infer<typeof passwordChangeSchema>