"use server";

import { PersonState, schema } from "@/lib/types";
import { FieldErrors } from "react-hook-form";
import { z } from "zod";

export const onDataAction = async (
  prevState: PersonState,
  formData: FormData
): Promise<PersonState> => {
  const data = Object.fromEntries(formData);
  const parsed = schema.safeParse(data);

  type personType = z.infer<typeof schema>;

  if (parsed.success) {
    if (parsed.data.first.includes("John")) {
      const errors: FieldErrors<personType> = {
        first: {
          type: "validation",
          message: "Duplicate user",
        },
      };

      return {
        message: "User John is already registered",
        fields: parsed.data,
        errors,
      };
    }

    console.log("User registered");
    return { message: "User registered" };
  } else {
    const fields: Record<string, string> = {};
    for (const key of Object.keys(data)) {
      fields[key] = data[key].toString();
    }

    const errors: FieldErrors<personType> = parsed.error.errors.reduce(
      (acc, error) => {
        const fieldName = error.path[0];

        if (fieldName) {
          acc[fieldName as keyof personType] = {
            type: error.code,
            message: error.message,
          };
        }

        return acc;
      },
      {} as FieldErrors<personType>
    );

    return {
      errors,
      fields,
      message: "Invalid data provided, failed to create user.",
    };
  }
};
