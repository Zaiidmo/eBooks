import React, { useEffect, useState } from 'react';
import { BookFormData } from '@/types';
import { categoryOptions } from './constants';

interface BookFormFieldsProps {
  formData: BookFormData;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
  onFileChange: (file: File) => void;
}

export function BookFormFields({ formData, onChange, onFileChange }: BookFormFieldsProps) {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  useEffect(() => {
    // Clean up the object URL when component unmounts or when a new file is selected
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Create a preview URL for the new image
      const objectUrl = URL.createObjectURL(file);
      setPreviewUrl(objectUrl);
      onFileChange(file);
    }
  };

  
  return (
    <div className="grid grid-cols-1 gap-6 mt-4">
      {/* Other fields remain the same */}
      <div className='flex flex-col md:flex-row gap-4 w-full'>
        <div className='w-1/2'>
          <label htmlFor="title" className="block  text-sm font-medium text-gray-700 dark:text-gray-200">
            Title
          </label>
          <input
            type="text"
            name="title"
            id="title"
            required
            value={formData.title}
            onChange={onChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500"
          />
        </div>
  
        <div className='w-1/2'>
          <label htmlFor="author" className="block text-sm font-medium text-gray-700 dark:text-gray-200">
            Author
          </label>
          <input
            type="text"
            name="author"
            id="author"
            required
            value={formData.author}
            onChange={onChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500"
          />
        </div>
      </div>
<div className='flex flex-col md:flex-row gap-4 w-full'>
  
        <div className='w-1/2'>
          <label htmlFor="isbn" className="block text-sm font-medium text-gray-700 dark:text-gray-200">
            ISBN
          </label>
          <input
            type="text"
            name="isbn"
            id="isbn"
            required
            value={formData.isbn}
            onChange={onChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500"
          />
        </div>
  
        <div className='w-1/2'>
          <label htmlFor="category" className="block text-sm font-medium text-gray-700 dark:text-gray-200">
            Category
          </label>
          <select
            name="category"
            id="category"
            required
            value={formData.category}
            onChange={onChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500"
          >
            <option value="">Select a category</option>
            {categoryOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
</div>

      <div className='flex flex-col md:flex-row gap-4 w-full'>
        <div className='w-1/2'>
          <label htmlFor="quantity" className="block text-sm font-medium text-gray-700 dark:text-gray-200">
            Quantity
          </label>
          <input
            type="number"
            name="quantity"
            id="quantity"
            required
            min="0"
            value={formData.quantity}
            onChange={onChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500"
          />
        </div>
        <div className='w-1/2'>
        <label htmlFor="price" className="block text-sm font-medium text-gray-700 dark:text-gray-200">
          Price
        </label>
        <input
          type="number"
          name="price"
          id="price"
          required
          min="0"
          step="0.01"
          value={formData.price}
          onChange={onChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500"
        />
      </div>
      </div>

      {/* Updated cover image section with preview */}
      <div>
        <label htmlFor="cover" className="block text-sm font-medium text-gray-700 dark:text-gray-200">
          Cover Image
        </label>
        <div className="mt-1 flex flex-col space-y-4">
          <input
            type="file"
            name="cover"
            id="cover"
            accept="image/*"
            onChange={handleFileInput}
            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-teal-50 file:text-teal-700 hover:file:bg-teal-100"
          />
          {previewUrl && (
            <div className="relative w-40 h-56 overflow-hidden rounded-lg border border-gray-200">
              <img
                src={previewUrl}
                alt="Cover preview"
                className="w-full h-full object-cover"
              />
              <button
                type="button"
                onClick={() => {
                  setPreviewUrl(null);
                  onFileChange('' as any); // Reset the file input
                }}
                className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
          )}
        </div>
      </div>

      
      

      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-200">
          Description
        </label>
        <textarea
          name="description"
          id="description"
          rows={4}
          required
          value={formData.description}
          onChange={onChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500"
        />
      </div>
    </div>
  );
}