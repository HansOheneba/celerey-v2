"use client";

import { useState } from "react";
import BlogForm from "./form";
import { BlogPost } from "@/types/blog";

export default function InsightsPage() {
  const [savedData, setSavedData] = useState<
    (Omit<BlogPost, "coverImage"> & { coverImage: string }) | null
  >(null);

  const handleFormSubmit = (
    data: Omit<BlogPost, "coverImage"> & { coverImage: string }
  ) => {
    console.log("Form submitted with data:", data);
    setSavedData(data);

    // Show success message or redirect
    alert(  
      "Blog post saved successfully! Check console for the data that would be sent to API."
    );
  };

  return (
    <div className="max-w-6xl mx-auto py-10">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold mb-2">Create A New Post</h1>
          <p className="text-muted-foreground">
            Fill in the details below to create a new blog post
          </p>
        </div>

        <BlogForm onSubmit={handleFormSubmit} />

        {/* {savedData && (
          <div className="mt-8 p-4 border rounded-lg bg-muted/50">
            <h3 className="font-semibold mb-2">Last Saved Data (Console):</h3>
            <pre className="text-sm bg-background p-3 rounded border overflow-auto">
              {JSON.stringify(savedData, null, 2)}
            </pre>
          </div>
        )} */}
      </div>
    </div>
  );
}
