"use server";

import { PersonState, schema } from "@/lib/types";

export const onDataAction = async (
  prevState: PersonState,
  formData: FormData
): Promise<PersonState> => {
  const data = Object.fromEntries(formData);
  const parsed = schema.safeParse(data);

  if (parsed.success) {
    if (parsed.data.first.includes("John")) {
      return {
        message: "User John is already registered",
        fields: parsed.data,
        errors: {
          first: ["Duplicate user"],
        },
      };
    }

    console.log("User registered");
    return { message: "User registered" };
  } else {
    const fields: Record<string, string> = {};
    for (const key of Object.keys(data)) {
      fields[key] = data[key].toString();
    }

    return {
      errors: parsed.error.flatten().fieldErrors,
      fields,
      message: "Invalid data provided, failed to create user.",
    };
  }
};
