"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useFormState } from "react-dom";
import { useRef } from "react";
import { onDataAction } from "@/app/actions";
import { schema } from "@/lib/types";

function ErrorMessage({
  errors,
  identifier,
}: {
  errors: string[] | undefined;
  identifier: string;
}) {
  return (
    <div id={identifier + "-error"} aria-live="polite" aria-atomic="true">
      {errors &&
        errors.map((error: string) => (
          <p className="mt-2 text-sm font-medium text-destructive" key={error}>
            {error}
          </p>
        ))}
    </div>
  );
}

export const RegistrationForm = () => {
  const initialState = { message: "" };
  const [state, formAction] = useFormState(onDataAction, initialState);
  const formRef = useRef<HTMLFormElement>(null);

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      first: "",
      last: "",
      email: "",
      ...(state?.fields ?? {}),
    },
  });

  return (
    <Form {...form}>
      {state?.message !== "" && !state.errors && (
        <div className="text-sm font-medium text-green-500">
          {state.message}
        </div>
      )}
      {state?.message !== "" && state.errors && (
        <div className="text-sm font-medium text-destructive">
          {state.message}
        </div>
      )}
      <form
        ref={formRef}
        action={formAction}
        onSubmit={(evt) => {
          evt.preventDefault();
          form.handleSubmit(() => {
            formRef.current?.submit();
          })(evt);
        }}
        className="space-y-8"
      >
        <div className="flex gap-2">
          <FormField
            control={form.control}
            name="first"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>First Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter first name" {...field} />
                </FormControl>
                <FormDescription>Your first name.</FormDescription>
                <FormMessage />
                <ErrorMessage errors={state.errors?.first} identifier="first" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="last"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Last Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter last name" {...field} />
                </FormControl>
                <FormDescription>Your last name.</FormDescription>
                <FormMessage />
                <ErrorMessage errors={state.errors?.last} identifier="last" />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="Enter email address" {...field} />
              </FormControl>
              <FormDescription>Your email address.</FormDescription>
              <FormMessage />
              <ErrorMessage errors={state.errors?.email} identifier="email" />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
};
