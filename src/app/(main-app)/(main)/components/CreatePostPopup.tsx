"use client";
import React, { FormEvent, useEffect, useRef, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { FcAddImage } from "react-icons/fc";
import { Button } from "@/components/ui/button";
import Dropzone from "react-dropzone";
import { FaFileUpload } from "react-icons/fa";
import Image from "next/image";
import { createPost } from "@/actions/post";
import { toast } from "sonner";

const CreatePostPopup = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={"outline"} className="flex items-center gap-2">
          <FcAddImage />
          Image
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-center">Create Post</DialogTitle>
        </DialogHeader>
        <CreatePostPopupContent />
      </DialogContent>
    </Dialog>
  );
};

export default CreatePostPopup;

const CreatePostPopupContent = () => {
  const [image, setImage] = useState<File>();
  const [filePreview, setFilePreview] = useState<string | ArrayBuffer | null>();
  const [loading, setLoading] = useState(false);
  const [textValue, setTextValue] = useState("");

  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  const handleFileChange = (file: File) => {
    setImage(file);

    const reader = new FileReader();
    reader.onload = function () {
      setFilePreview(reader.result);
    };

    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (loading) return;
    setLoading(true);

    const formData = new FormData(e.currentTarget);

    formData.append("file", image as any);

    const res = await createPost({ formData });
    if (res.error) {
      toast.warning("Someting went worng");
      setLoading(false);
      return;
    }
    toast.success("New post created");
    setLoading(false);
  };

  useEffect(() => {
    if (textAreaRef.current) {
      textAreaRef.current.style.height = "auto";
      textAreaRef.current.style.height = `${textAreaRef.current.scrollHeight}px`;
    }
  }, [textValue]);

  return (
    <form onSubmit={handleSubmit} className="flex flex-col space-y-3">
      <textarea
        ref={textAreaRef}
        className="h-auto max-h-[30vh] resize-none border-none outline-none"
        placeholder="What is on your mind?"
        id="text"
        name="text"
        onChange={(e) => setTextValue(e.target.value)}
      />
      <Dropzone
        accept={{
          "image/jpeg": [".jpg", ".jpeg", ".png", ".webp"],
        }}
        onDrop={(acceptedFiles) => handleFileChange(acceptedFiles[0])}
      >
        {({ getRootProps, getInputProps }) => (
          <section className="">
            <div {...getRootProps()}>
              <input {...getInputProps()} />
              {filePreview ? (
                <Image
                  src={filePreview as string}
                  height={500}
                  width={500}
                  alt=""
                  className="cursor-pointer hover:opacity-60"
                />
              ) : (
                <div className="flex cursor-pointer flex-col items-center gap-2 rounded-md border-2 border-dashed border-primary bg-secondary/90 p-5 hover:bg-secondary">
                  <FaFileUpload className="size-8 text-primary shadow-md" />
                  <span className="text-center">
                    Add image
                    <br />
                    <span className="text-sm text-muted-foreground">
                      or drag image here
                    </span>
                  </span>
                </div>
              )}
            </div>
          </section>
        )}
      </Dropzone>
      <Button loading={loading} className="w-full">
        Post
      </Button>
    </form>
  );
};
