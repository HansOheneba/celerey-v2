"use client";

import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import React from "react";
import MenuBar from "./toolbar";
import TextAlign from "@tiptap/extension-text-align";
import Highlight from "@tiptap/extension-highlight";
import Image from "@tiptap/extension-image";

interface RichTextEditorProps {
  content: string;
  onChange: (content: string) => void;
}

interface ImgBBResponse {
  data: {
    id: string;
    title: string;
    url_viewer: string;
    url: string;
    display_url: string;
    width: string;
    height: string;
    size: number;
    time: string;
    expiration: string;
    image: {
      filename: string;
      name: string;
      mime: string;
      extension: string;
      url: string;
    };
    thumb: {
      filename: string;
      name: string;
      mime: string;
      extension: string;
      url: string;
    };
    medium: {
      filename: string;
      name: string;
      mime: string;
      extension: string;
      url: string;
    };
    delete_url: string;
  };
  success: boolean;
  status: number;
}

export default function RichTextEditor({
  content,
  onChange,
}: RichTextEditorProps) {
  const imgBBApiKey = process.env.NEXT_PUBLIC_IMGBB_API_KEY;

  const handleImageUpload = async (file: File) => {
    if (!imgBBApiKey) {
      console.error("ImgBB API key is missing");
      return null;
    }

    try {
      console.log("Starting imgBB upload...");

      const uploadFormData = new FormData();
      uploadFormData.append("key", imgBBApiKey);
      uploadFormData.append("image", file);

      console.log("File details:", {
        name: file.name,
        type: file.type,
        size: file.size,
      });

      const response = await fetch("https://api.imgbb.com/1/upload", {
        method: "POST",
        body: uploadFormData,
      });

      console.log("Response status:", response.status);
      console.log("Response ok:", response.ok);

      if (!response.ok) {
        throw new Error(`Upload failed with status: ${response.status}`);
      }

      const result: ImgBBResponse = await response.json();

      if (result.success) {
        console.log("Image uploaded successfully:", result.data.url);
        return result.data.url;
      } else {
        throw new Error("Upload failed - ImgBB returned success: false");
      }
    } catch (error) {
      console.error("Error uploading image to ImgBB:", error);
      return null;
    }
  };

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        bulletList: {
          HTMLAttributes: {
            class: "list-disc ml-3",
          },
        },
        orderedList: {
          HTMLAttributes: {
            class: "list-decimal ml-3",
          },
        },
      }),
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      Highlight,
      Image.configure({
        HTMLAttributes: {
          class: "rounded-lg max-w-full h-auto",
        },
        inline: false, // Set to false for block-level images
        allowBase64: false,
      }),
    ],
    content: content,
    editorProps: {
      attributes: {
        class:
          "min-h-[156px] border rounded-md bg-slate-50 py-2 px-3 prose max-w-none",
      },
    },
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    immediatelyRender: false,
  });

  return (
    <div>
      <MenuBar editor={editor} onImageUpload={handleImageUpload} />
      <EditorContent editor={editor} />
    </div>
  );
}
