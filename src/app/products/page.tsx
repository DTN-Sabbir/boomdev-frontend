"use client";
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import api from "@/lib/utils";
import { Endpoints } from "@/lib/api";
import { ProductForm } from "@/components/form/product_addition_form";

interface Product {
  id: number;
  name: string;
  description: string;
  price: string;
  stock: string;
}

export default function Product() {
  const [products, setProducts] = useState<Product[]>([]);
  const [open, setOpen] = useState(false);
  const [action, setAction] = useState<"post" | "patch">("post");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  // Function to handle edit button click
  const handleEdit = (product: Product) => {
    setAction("patch");
    setOpen(true);
    setSelectedProduct(product);
  };
  // Function to handle delete button click

  const fetchProducts = async () => {
    try {
      const response = await api.get(`${Endpoints.PRODUCTS}`);
      console.log("response", response.data);
      console.log("response", response.data.restults);
      setProducts(response.data.results);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  // Function to handle add product button click
  const handleAddProduct = () => {
    setAction("post");
    setOpen(true);
    setSelectedProduct(null);
  };
  const handleSave = () => {
    setOpen(false);
    fetchProducts();
  };
  // Function to handle delete button click
  const handleDelete = async (productId: number) => {
    try {
      await api.delete(`${Endpoints.PRODUCTS}${productId}/`);
      fetchProducts();
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);
  return (
    <div className="flex flex-col mt-2">
      <div className="justify-end">
        <Button
          onClick={handleAddProduct}
          className="bg-blue-500 hover:bg-blue-600 cursor-pointer text-white font-bold py-2 px-4 rounded"
        >
          Add Product
        </Button>
      </div>
      <div>
        {/* Product Lis Table */}
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Id</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Stock</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.map((product) => (
              <TableRow key={product.id}>
                <TableCell>{product.id}</TableCell>
                <TableCell>{product.name}</TableCell>
                <TableCell>{product.description}</TableCell>
                <TableCell>{product.price} /-</TableCell>
                <TableCell>{product.stock}</TableCell>
                <TableCell>
                  <Button
                    onClick={() => handleEdit(product)}
                    className="bg-blue-500 hover:bg-blue-600 cursor-pointer text-white font-bold py-2 px-4 rounded"
                  >
                    Edit
                  </Button>
                  <Button
                    onClick={() => handleDelete(product.id)}
                    className="bg-red-500 hover:bg-red-600 cursor-pointer text-white font-bold py-2 px-4 rounded ml-2"
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        {/* Create and Edit Modal */}
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Production Addition Form</DialogTitle>
            </DialogHeader>
            {/* form for add or delete product */}

            <ProductForm
              action={action}
              product={selectedProduct}
              onSave={handleSave}
            />
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
