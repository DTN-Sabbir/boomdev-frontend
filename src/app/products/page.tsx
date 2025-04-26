"use client";

import { Button } from "@/components/ui/button";
import React from "react";

export default function Product() {
  return (
    <div className="flex flex-col mt-2">
      <div className="justify-end">
        <Button className="bg-blue-500 hover:bg-blue-600 cursor-pointer text-white font-bold py-2 px-4 rounded">
          Add Product
        </Button>
      </div>
      <div></div>
    </div>
  );
}
