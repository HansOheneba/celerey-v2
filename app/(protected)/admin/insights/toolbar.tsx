"use client";

import {
  AlignCenter,
  AlignLeft,
  AlignRight,
  Bold,
  Heading1,
  Heading2,
  Heading3,
  Highlighter,
  Italic,
  List,
  ListOrdered,
  Strikethrough,
  Image as ImageIcon,
} from "lucide-react";
import { Toggle } from "@/components/ui/toggle";
import { Editor } from "@tiptap/react";
import { useReducer } from "react";

interface MenuBarProps {
  editor: Editor | null;
  onImageUpload?: (file: File) => Promise<string | null>;
}

export default function MenuBar({ editor, onImageUpload }: MenuBarProps) {
  // Force re-render when editor changes
  const [, forceUpdate] = useReducer((x) => x + 1, 0);

  if (!editor) {
    return null;
  }

  const handleImageClick = () => {
    if (!onImageUpload) {
      console.error("Image upload function not provided");
      return;
    }

    // Create a hidden file input
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";

    input.onchange = async (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (!file) return;

      // Check file size (ImgBB has a 32MB limit)
      if (file.size > 32 * 1024 * 1024) {
        alert("Image size must be less than 32MB");
        return;
      }

      try {
        // Show loading state or disable button
        const imageUrl = await onImageUpload(file);

        if (imageUrl) {
          // Debug: Check if setImage command exists
          console.log("Editor commands:", Object.keys(editor.chain()));
          console.log(
            "Editor can set image:",
            editor.can().setImage({ src: imageUrl })
          );

          // Insert the image at current cursor position
          editor.chain().focus().setImage({ src: imageUrl }).run();

          console.log("Image inserted successfully");
          forceUpdate(); // Force re-render to update toolbar state
        } else {
          alert("Failed to upload image. Please try again.");
        }
      } catch (error) {
        console.error("Error inserting image:", error);
        alert("Error inserting image. Please try again.");
      }
    };

    input.click();
  };

  const Options = [
    {
      icon: <Heading1 className="size-4" />,
      onClick: () => editor.chain().focus().toggleHeading({ level: 1 }).run(),
      pressed: editor.isActive("heading", { level: 1 }),
    },
    {
      icon: <Heading2 className="size-4" />,
      onClick: () => editor.chain().focus().toggleHeading({ level: 2 }).run(),
      pressed: editor.isActive("heading", { level: 2 }),
    },
    {
      icon: <Heading3 className="size-4" />,
      onClick: () => editor.chain().focus().toggleHeading({ level: 3 }).run(),
      pressed: editor.isActive("heading", { level: 3 }),
    },
    {
      icon: <Bold className="size-4" />,
      onClick: () => {
        editor.chain().focus().toggleBold().run();
        forceUpdate();
      },
      pressed: editor.isActive("bold"),
    },
    {
      icon: <Italic className="size-4" />,
      onClick: () => {
        editor.chain().focus().toggleItalic().run();
        forceUpdate();
      },
      pressed: editor.isActive("italic"),
    },
    {
      icon: <Strikethrough className="size-4" />,
      onClick: () => {
        editor.chain().focus().toggleStrike().run();
        forceUpdate();
      },
      pressed: editor.isActive("strike"),
    },
    {
      icon: <AlignLeft className="size-4" />,
      onClick: () => {
        editor.chain().focus().setTextAlign("left").run();
        forceUpdate();
      },
      pressed: editor.isActive({ textAlign: "left" }),
    },
    {
      icon: <AlignCenter className="size-4" />,
      onClick: () => {
        editor.chain().focus().setTextAlign("center").run();
        forceUpdate();
      },
      pressed: editor.isActive({ textAlign: "center" }),
    },
    {
      icon: <AlignRight className="size-4" />,
      onClick: () => {
        editor.chain().focus().setTextAlign("right").run();
        forceUpdate();
      },
      pressed: editor.isActive({ textAlign: "right" }),
    },
    {
      icon: <List className="size-4" />,
      onClick: () => {
        editor.chain().focus().toggleBulletList().run();
        forceUpdate();
      },
      pressed: editor.isActive("bulletList"),
    },
    {
      icon: <ListOrdered className="size-4" />,
      onClick: () => {
        editor.chain().focus().toggleOrderedList().run();
        forceUpdate();
      },
      pressed: editor.isActive("orderedList"),
    },
    {
      icon: <Highlighter className="size-4" />,
      onClick: () => {
        editor.chain().focus().toggleHighlight().run();
        forceUpdate();
      },
      pressed: editor.isActive("highlight"),
    },
    {
      icon: <ImageIcon className="size-4" />,
      onClick: handleImageClick,
      pressed: false, // Image button doesn't have an active state
    },
  ];

  return (
    <div className="border rounded-md p-1 mb-1 bg-slate-50 space-x-2 z-50">
      {Options.map((option, index) => (
        <Toggle
          key={index}
          pressed={option.pressed}
          onPressedChange={option.onClick}
        >
          {option.icon}
        </Toggle>
      ))}
    </div>
  );
}
