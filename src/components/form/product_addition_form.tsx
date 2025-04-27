"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Endpoints } from "@/lib/api";
import api from "@/lib/utils";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Enter  Product Name",
  }),
  price: z.string().min(1, {
    message: "Enter Product Price",
  }),
  stock: z.string().min(1, {
    message: "Enter Product Stock",
  }),
  description: z.string().min(2, {
    message: "Enter Product Description",
  }),
});

export function ProductForm({
  action,
  product,
  onSave,
}: {
  action: "post" | "patch";
  product?: {
    id: number;
    name: string;
    description: string;
    price: string;
    stock: string;
  };
  onSave: () => void;
}) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: product?.name || "",
      price: product?.price || "",
      description: product?.description || "",
      stock: product?.stock || "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const url =
        action === "post"
          ? `${Endpoints.PRODUCTS}`
          : `${Endpoints.PRODUCTS}${product?.id}/`;
      const method = action === "post" ? "post" : "patch";
      const response = await api[method](url, {
        name: values.name,
        price: values.price,
        description: values.description,
        stock: values.stock,
      });
      if (response.status === 200 || response.status === 201) {
        onSave();
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Product Name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="price"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Price</FormLabel>
              <FormControl>
                <Input placeholder="Price" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="stock"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Stock</FormLabel>
              <FormControl>
                <Input placeholder="Enter Stock" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea placeholder="Enter Description" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          className="cursor-pointer bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
        >
          {" "}
          {action == "post" ? "Create" : "Update"}
        </Button>
      </form>
    </Form>
  );
}
