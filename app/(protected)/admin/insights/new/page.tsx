"use client";

import { useState } from "react";
import { SimpleEditor } from "@/components/tiptap-templates/simple/simple-editor";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import type { Editor } from "@tiptap/react";
import { useRouter } from "next/navigation";
import { BlogPost } from "@/types/blog";
import { X, Plus } from "lucide-react";

export default function InsightsPage() {
  const [savedData, setSavedData] = useState<
    (Omit<BlogPost, "coverImage"> & { coverImage: string }) | null
  >(null);
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [coverImage, setCoverImage] = useState<File | null>(null);
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState("");
  const [editor, setEditor] = useState<Editor | null>(null);
  const [saving, setSaving] = useState(false);
  const router = useRouter();

  // Generate slug from title
  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^a-z0-9-]/g, "");
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTitle = e.target.value;
    setTitle(newTitle);

    // Auto-generate slug if slug is empty or matches the previously generated slug
    if (!slug || slug === generateSlug(title)) {
      setSlug(generateSlug(newTitle));
    }
  };

  const handleAddTag = () => {
    const trimmedTag = tagInput.trim();
    if (trimmedTag && !tags.includes(trimmedTag)) {
      setTags([...tags, trimmedTag]);
      setTagInput("");
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
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

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim() || !slug.trim() || !editor) {
      alert("Please fill in title, slug, and content");
      return;
    }

    setSaving(true);

    try {
      let coverImageUrl = "";

      // Upload cover image if provided
      if (coverImage) {
        console.log("📤 Uploading cover image...");
        coverImageUrl = await uploadImageToImgBB(coverImage);
        console.log("✅ Cover image uploaded:", coverImageUrl);
      }

      // Prepare the data for your external API
      const formData = {
        title,
        slug,
        coverImage: coverImageUrl,
        tags,
        content: editor.getHTML(),
        excerpt: editor.getText().substring(0, 150) + "...",
        author: "",
        published: false,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      console.log("Form submitted with data:", formData);

      // Replace with your actual external API endpoint
      const apiBase = process.env.NEXT_PUBLIC_API_BASE_URL;
      const res = await fetch(`${apiBase}/insights/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error("Failed to save post to external API");

      const responseData = await res.json();
      setSavedData(responseData);

      alert("Blog post saved successfully to external API!");

    
      setTitle("");
      setSlug("");
      setCoverImage(null);
      setTags([]);
      setTagInput("");
      if (editor) {
        editor.commands.setContent("<p>Start writing your content here...</p>");
      }
    } catch (error) {
      console.error("Error saving post:", error);
      alert("Failed to save post to external API. Check console for details.");
    } finally {
      setSaving(false);
    }
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

        <form onSubmit={handleFormSubmit} className="space-y-6">
          <div className="grid grid-cols-1 gap-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Post Title *</Label>
                <Input
                  id="title"
                  placeholder="Enter your post title"
                  value={title}
                  onChange={handleTitleChange}
                  className="text-lg"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="slug">Slug *</Label>
                <Input
                  id="slug"
                  placeholder="enter-url-slug"
                  value={slug}
                  onChange={(e) => setSlug(e.target.value)}
                  required
                />
                <p className="text-sm text-muted-foreground">
                  This will be used in the URL for your post
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="coverImage">Cover Image</Label>
                <Input
                  id="coverImage"
                  type="file"
                  accept="image/*"
                  onChange={(e) => setCoverImage(e.target.files?.[0] || null)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="tags">Tags</Label>
                <div className="space-y-2">
                  <div className="flex gap-2">
                    <Input
                      id="tags"
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
                    {tags.map((tag) => (
                      <Badge
                        key={tag}
                        variant="secondary"
                        className="px-3 py-1"
                      >
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
              </div>
            </div>

            {/* Right Column - Content Editor */}
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="content">Content *</Label>
                <div className="border rounded-lg">
                  <SimpleEditor
                    onEditorReady={setEditor}
                    onContentChange={(content) =>
                      console.log("Content updated:", content)
                    }
                    // initialContent="<p>Start writing your content here...</p>"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="flex gap-4 py-4 justify-end border-t">
            <Button type="submit" disabled={saving} className="min-w-24">
              {saving ? "Saving..." : "Save Post"}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => router.push("/insights")}
            >
              View Posts
            </Button>
          </div>
        </form>

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
