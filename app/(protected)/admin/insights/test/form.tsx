// components/blog-form.tsx
"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { BlogPost } from "@/types/blog";
import RichTextEditor from "./editor";
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
import { Badge } from "@/components/ui/badge";
import { X, Plus } from "lucide-react";

const blogFormSchema = z.object({
  title: z.string().min(1, "Title is required"),
  slug: z
    .string()
    .min(1, "Slug is required")
    .regex(
      /^[a-z0-9-]+$/,
      "Slug can only contain lowercase letters, numbers, and hyphens"
    ),
  coverImage: z.instanceof(File).optional(),
  tags: z.array(z.string()),
  content: z.string().min(1, "Content is required"),
});

type BlogFormValues = z.infer<typeof blogFormSchema>;

interface BlogFormProps {
  initialData?: Partial<BlogPost>;
  onSubmit?: (
    data: Omit<BlogPost, "coverImage"> & { coverImage: string }
  ) => void;
}

export default function BlogForm({ initialData, onSubmit }: BlogFormProps) {
  const [tagInput, setTagInput] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const apiBase = process.env.NEXT_PUBLIC_API_BASE_URL;

  const form = useForm<BlogFormValues>({
    resolver: zodResolver(blogFormSchema),
    defaultValues: {
      title: initialData?.title || "",
      slug: initialData?.slug || "",
      tags: initialData?.tags || [],
      content:
        initialData?.content || "<p>Start writing your content here...</p>",
    },
  });

  const handleAddTag = () => {
    const trimmedTag = tagInput.trim();
    if (trimmedTag && !form.getValues("tags").includes(trimmedTag)) {
      const currentTags = form.getValues("tags");
      form.setValue("tags", [...currentTags, trimmedTag]);
      setTagInput("");
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    const currentTags = form.getValues("tags");
    form.setValue(
      "tags",
      currentTags.filter((tag) => tag !== tagToRemove)
    );
  };

  const handleTagInputKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAddTag();
    }
  };

  const uploadImageToImgBB = async (file: File): Promise<string> => {
    const imgBBApiKey = process.env.NEXT_PUBLIC_IMGBB_API_KEY;

    if (!imgBBApiKey) {
      throw new Error("ImgBB API key is missing");
    }

    const formData = new FormData();
    formData.append("key", imgBBApiKey);
    formData.append("image", file);

    console.log("🖼️ Starting image upload to ImgBB...");

    const response = await fetch("https://api.imgbb.com/1/upload", {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`Upload failed with status: ${response.status}`);
    }

    const result = await response.json();

    if (result.success) {
      console.log("✅ Image uploaded successfully:", result.data.url);
      return result.data.url;
    } else {
      throw new Error("Upload failed - ImgBB returned success: false");
    }
  };

  const submitToAPI = async (blogPostData: BlogPost) => {
    if (!apiBase) {
      console.error("❌ API_BASE_URL is not defined");
      throw new Error("API base URL is not configured");
    }

    const apiUrl = `${apiBase}/insights/`;
    console.log("🚀 Sending POST request to:", apiUrl);
    console.log("📦 Request payload:", blogPostData);

    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(blogPostData),
    });

    console.log("📨 Response status:", response.status);
    console.log("📨 Response ok:", response.ok);

    const result = await response.json();
    console.log("📨 Response data:", result);

    if (!response.ok) {
      throw new Error(result.error || `HTTP error! status: ${response.status}`);
    }

    return result;
  };

  const handleSubmit = async (data: BlogFormValues) => {
    setIsUploading(true);

    try {
      let coverImageUrl = "";

      // Upload cover image if provided
      if (data.coverImage) {
        console.log("📤 Uploading cover image...");
        console.log("📁 File details:", {
          name: data.coverImage.name,
          type: data.coverImage.type,
          size: data.coverImage.size,
        });

        coverImageUrl = await uploadImageToImgBB(data.coverImage);
        console.log("✅ Cover image uploaded:", coverImageUrl);
      }

      const blogPostData = {
        title: data.title,
        slug: data.slug,
        coverImage: coverImageUrl,
        tags: data.tags,
        content: data.content,
      };

      console.log("📝 Blog post data ready for API:", blogPostData);
      console.log(
        "🎯 Final data structure:",
        JSON.stringify(blogPostData, null, 2)
      );

      // Send to API
      console.log("🔄 Starting API submission...");
      const apiResult = await submitToAPI(blogPostData);
      console.log("✅ API submission successful:", apiResult);

      // Call the onSubmit prop if provided
      if (onSubmit) {
        onSubmit(blogPostData);
      }

      // Show success message
      alert("🎉 Blog post created successfully!");

      // Optional: Reset form after successful submission
      form.reset();
    } catch (error) {
      console.error("❌ Error submitting form:", error);
      alert(
        `Error: ${error instanceof Error ? error.message : "Unknown error"}`
      );
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 gap-6">
          {/* Left Column - Basic Info */}
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter blog post title" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="slug"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Slug</FormLabel>
                  <FormControl>
                    <Input placeholder="enter-url-slug" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="coverImage"
              render={({ field: { value, onChange, ...field } }) => (
                <FormItem>
                  <FormLabel>Cover Image</FormLabel>
                  <FormControl>
                    <Input
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        onChange(file);
                      }}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormItem>
              <FormLabel>Tags</FormLabel>
              <div className="space-y-2">
                <div className="flex gap-2">
                  <Input
                    placeholder="Add a tag"
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    onKeyDown={handleTagInputKeyDown}
                  />
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleAddTag}
                    disabled={!tagInput.trim()}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>

                <div className="flex flex-wrap gap-2">
                  {form.watch("tags").map((tag) => (
                    <Badge key={tag} variant="secondary" className="px-3 py-1">
                      {tag}
                      <button
                        type="button"
                        onClick={() => handleRemoveTag(tag)}
                        className="ml-1 hover:text-destructive"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
              </div>
              <FormMessage />
            </FormItem>
          </div>

          {/* Right Column - Content Editor */}
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Content</FormLabel>
                  <FormControl>
                    <RichTextEditor
                      content={field.value}
                      onChange={field.onChange}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        <div className="flex justify-end pt-6 border-t">
          <Button type="submit" disabled={isUploading} className="min-w-24">
            {isUploading ? "Saving..." : "Save Post"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
