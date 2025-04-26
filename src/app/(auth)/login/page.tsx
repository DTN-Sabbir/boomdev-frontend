"use client";

import React from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const formSchema = z.object({
  email: z.string().min(2, {
    message: "email must be at least 2 characters.",
  }),
  password: z.string().min(2, {
    message: "password must be at least 2 characters.",
  }),
});

export default function Login() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    
    console.log(values);
  }
  return (
    <div className=" bg-gray-100 h-screen">
      <div className="flex flex-col h-full justify-center items-center">
        <Form {...form}>
          <h1 className="font-bold text-2xl mb-2 text-blue-500">Login </h1>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8 bg-amber-100 p-8 rounded-md shadow-md "
          >
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Email"
                      {...field}
                      type="email"
                      className="w-sm bg-white text-black"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Password"
                      {...field}
                      type="password"
                      className="w-sm bg-white text-black"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 justify-center items-center cursor-pointer text-white font-bold py-2 px-4 rounded"
            >
              Submit
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
