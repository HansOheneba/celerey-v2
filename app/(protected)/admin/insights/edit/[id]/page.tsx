"use client";

import { useState, useEffect } from "react";
import { SimpleEditor } from "@/components/tiptap-templates/simple/simple-editor";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import type { Editor } from "@tiptap/react";
import { useRouter, useParams } from "next/navigation";
// import { BlogPost } from "@/types/blog";
import { X, Plus } from "lucide-react";
import Image from "next/image";

interface ApiBlogPost {
  id: number;
  title: string;
  slug: string;
  content: string;
  cover_image: string;
  date: string;
  tags: string[];
}

export default function EditInsightPage() {
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [coverImage, setCoverImage] = useState<File | null>(null);
  const [existingCoverImage, setExistingCoverImage] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState("");
  const [editor, setEditor] = useState<Editor | null>(null);
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();
  const params = useParams();
  const blogId = params.id;

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

  // Fetch blog data on component mount
  useEffect(() => {
    const fetchBlogData = async () => {
      if (!blogId) return;

      try {
        setLoading(true);
        const apiBase = process.env.NEXT_PUBLIC_API_BASE_URL;
        const response = await fetch(`${apiBase}/insights/${blogId}`);

        if (!response.ok) {
          throw new Error("Failed to fetch blog data");
        }

        const blogData: ApiBlogPost = await response.json();
        console.log("Fetched blog data:", blogData);

        // Pre-fill form with existing data
        setTitle(blogData.title);
        setSlug(blogData.slug);
        setExistingCoverImage(blogData.cover_image);
        setTags(blogData.tags);

        // Set editor content when editor is ready
        if (editor) {
          editor.commands.setContent(blogData.content);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchBlogData();
  }, [blogId]);

  useEffect(() => {
    if (editor && !loading) {
      const setContent = async () => {
        try {
          const apiBase = process.env.NEXT_PUBLIC_API_BASE_URL;
          const response = await fetch(`${apiBase}/insights/${blogId}`);
          if (response.ok) {
            const blogData: ApiBlogPost = await response.json();
            editor.commands.setContent(blogData.content);
          }
        } catch (err) {
          console.error("Failed to set editor content:", err);
        }
      };

      setContent();
    }
  }, [editor, loading, blogId]);

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim() || !slug.trim() || !editor) {
      alert("Please fill in title, slug, and content");
      return;
    }

    setSaving(true);

    try {
      let coverImageUrl = existingCoverImage;

      // Upload new cover image if provided
      if (coverImage) {
        console.log("📤 Uploading new cover image...");
        coverImageUrl = await uploadImageToImgBB(coverImage);
        console.log("✅ Cover image uploaded:", coverImageUrl);
      }

      // Prepare the data for your external API - ONLY send fields your API expects
      const formData = {
        title,
        slug,
        coverImage: coverImageUrl,
        tags,
        content: editor.getHTML(),
        // Remove excerpt, author, published, updatedAt - your API doesn't expect these
      };

      console.log("Form submitted with data:", formData);

      // Use PUT to update the existing post
      const apiBase = process.env.NEXT_PUBLIC_API_BASE_URL;
      const res = await fetch(`${apiBase}/insights/${blogId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const responseData = await res.json();

      if (!res.ok) {
        throw new Error(responseData.error || "Failed to update post");
      }

      alert("Blog post updated successfully!");

      // Redirect to the insights list page
      router.push("/insights");
    } catch (error) {
      console.error("Error updating post:", error);
      alert(
        `Failed to update blog post: ${
          error instanceof Error ? error.message : "Unknown error"
        }`
      );
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto py-10">
        <div className="flex items-center justify-center h-64">
          <div className="text-lg">Loading blog data...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-6xl mx-auto py-10">
        <div className="text-center text-destructive">
          <p>Error: {error}</p>
          <Button
            onClick={() => router.push("/insights")}
            variant="outline"
            className="mt-4"
          >
            Back to Insights
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto py-10">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold mb-2">Edit Post</h1>
          <p className="text-muted-foreground">
            Update the details below to edit your blog post
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
                {existingCoverImage && (
                  <div className="mb-2">
                    <p className="text-sm text-muted-foreground mb-2">
                      Current image:
                    </p>
                    <Image
                      src={existingCoverImage}
                      alt="Current cover"
                      className="object-cover rounded-lg"
                      height={128}
                      width={128}
                    />
                  </div>
                )}
                <Input
                  id="coverImage"
                  type="file"
                  accept="image/*"
                  onChange={(e) => setCoverImage(e.target.files?.[0] || null)}
                />
                <p className="text-sm text-muted-foreground">
                  {coverImage
                    ? "New image selected"
                    : "Select a new image to replace the current one"}
                </p>
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
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="flex gap-4 py-4 justify-end border-t">
            <Button
              type="button"
              variant="outline"
              onClick={() => router.push("/insights")}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={saving} className="min-w-24">
              {saving ? "Updating..." : "Update Post"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
