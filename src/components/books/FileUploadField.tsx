import React, { useRef, useState } from 'react';
import { Upload } from 'lucide-react';

interface FileUploadFieldProps {
  label: string;
  name: string;
  onChange: (file: File) => void;
  accept?: string;
  required?: boolean;
  preview?: string | File;
}

export function FileUploadField({
  label,
  name,
  onChange,
  accept = "image/*",
  required = false,
  preview,
}: FileUploadFieldProps) {
  const fileRef = useRef<HTMLInputElement>(null);
  const [filePreview, setFilePreview] = useState<string | undefined>(preview ? (preview instanceof File ? URL.createObjectURL(preview) : preview) : undefined);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file size and type
      if (file.size > 10 * 1024 * 1024) { // 10MB limit
        setError("File is too large. Max size is 10MB.");
        return;
      }
      if (!file.type.startsWith("image/")) {
        setError("Only image files are allowed.");
        return;
      }

      setError(null);
      setFilePreview(URL.createObjectURL(file));
      onChange(file);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) {
      handleFileChange({ target: { files: [file] } } as any);
    }
  };

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <div
        onClick={() => fileRef.current?.click()}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer hover:border-teal-500 transition-colors"
      >
        <div className="space-y-1 text-center">
          {filePreview ? (
            <img src={filePreview} alt="Preview" className="mx-auto h-32 w-32 object-cover rounded-lg" />
          ) : (
            <Upload className="mx-auto h-12 w-12 text-gray-400" />
          )}
          <div className="flex text-sm text-gray-600">
            <label className="relative cursor-pointer rounded-md font-medium text-teal-600 hover:text-teal-500">
              <span>Upload a file</span>
            </label>
            <p className="pl-1">or drag and drop</p>
          </div>
          <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
        </div>
      </div>
      {error && <p className="text-sm text-red-500">{error}</p>}
      <input
        ref={fileRef}
        type="file"
        name={name}
        onChange={handleFileChange}
        accept={accept}
        className="hidden"
        required={required}
      />
    </div>
  );
}
