import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createNewBook } from "@/services/books/createBook";
import { useNavigate } from "react-router-dom";
import { toastNotifier } from "@/utils/toastNotifier";
import { BookFormData } from "@/types";


export function AddBookForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<BookFormData>();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<BookFormData> = async (data) => {
    setIsSubmitting(true);
    const formData = new FormData();
    
    // Add file validation
    if (data.cover[0]) {
      const file = data.cover[0];
      // console.log("File details:", {
      //   name: file.name,
      //   type: file.type,
      //   size: file.size
      // });
      
      // Validate file type
      if (!file.type.startsWith('image/')) {
        toastNotifier({
          message: "Please upload an image file",
          type: "error",
          duration: 3000,
        });
        setIsSubmitting(false);
        return;
      }
      
      formData.append("cover", file);
    }
  
    // Add other fields
    formData.append("title", data.title);
    formData.append("author", data.author);
    formData.append("description", data.description);
    formData.append("category", data.category);
    formData.append("quantity", data.quantity.toString());
    formData.append("price", data.price.toString());
    formData.append("isbn", data.isbn);

    try {
       await createNewBook(formData);
      // console.log(response);

      toastNotifier({
        message: "Book created successfully",
        type: "success",
        duration: 3000,
      });
      navigate("/dashboard");
    } catch (error: any) {
      toastNotifier({
        message: error.message,
        type: "error",
        duration: 3000,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      <div>
        <Label htmlFor="title">Title</Label>
        <Input
          id="title"
          placeholder="Book Title"
          {...register("title", { required: "Title is required" })}
          className="w-full px-3 py-2 text-white bg-white/60 dark:bg-gray-700/60 border border-gray-400  dark:border-gray-600 rounded-lg focus:outline-non"
        />
        {errors.title && (
          <p className="text-red-500 text-sm">{errors.title.message}</p>
        )}
      </div>

      <div>
        <Label htmlFor="author">Author</Label>
        <Input
          id="author"
          placeholder="Author Name"
          {...register("author", { required: "Author is required" })}
          className="w-full px-3 py-2 text-white bg-white/60 dark:bg-gray-700/60 border border-gray-400  dark:border-gray-600 rounded-lg focus:outline-non"
        />
        {errors.author && (
          <p className="text-red-500 text-sm">{errors.author.message}</p>
        )}
      </div>

      <div className="flex flex-col md:flex-row gap-4 w-full">
        <div className="w-1/2">
          <Label htmlFor="genre">Category</Label>
          <Input
            placeholder="Book Category"
            className="bg-white/60 dark:bg-gray-700/60 border border-gray-400  dark:border-gray-600 rounded-lg focus:outline-non"
            id="genre"
            {...register("category", { required: "Category is required" })}
          />
          {errors.category && (
            <p className="text-red-500 text-sm">{errors.category.message}</p>
          )}
        </div>
        <div className="w-1/2">
          <Label htmlFor="isbn">Isbn?</Label>
          <Input
            placeholder="Book ISBN"
            className="bg-white/60 dark:bg-gray-700/60 border border-gray-400  dark:border-gray-600 rounded-lg focus:outline-non"
            id="genre"
            {...register("isbn", { required: "Isbn is required" })}
          />
          {errors.isbn && (
            <p className="text-red-500 text-sm">{errors.isbn.message}</p>
          )}
        </div>
      </div>

      <div>
        <Label htmlFor="description">Description</Label>
        <textarea
          placeholder="Book Description"
          id="description"
          {...register("description", { required: "Description is required" })}
          className="w-full px-3 py-2 text-white bg-white/60 dark:bg-gray-700/60 border border-gray-400  dark:border-gray-600 rounded-lg focus:outline-non"
          rows={4}
        />
        {errors.description && (
          <p className="text-red-500 text-sm">{errors.description.message}</p>
        )}
      </div>


      <div className="flex flex-col md:flex-row gap-4 ">
        <div className="w-1/2">
          <Label htmlFor="quantity">Quantity</Label>
          <Input
            className="bg-white/60 dark:bg-gray-700/60 border border-gray-400  dark:border-gray-600 rounded-lg focus:outline-non"
            id="quantity"
            type="number"
            defaultValue={1}
            {...register("quantity", { required: "Quantity is required" })}
          />
          {errors.quantity && (
            <p className="text-red-500 text-sm">{errors.quantity.message}</p>
          )}
        </div>
        <div className="w-1/2">
          <Label htmlFor="price">Price $</Label>
          <Input
            className="bg-white/60 dark:bg-gray-700/60 border border-gray-400  dark:border-gray-600 rounded-lg focus:outline-non"
            id="price"
            type="number"
            defaultValue={0}
            {...register("price", { required: "price is required" })}
          />
          {errors.price && (
            <p className="text-red-500 text-sm">{errors.price.message}</p>
          )}
        </div>
      </div>

      <div>
        <Label htmlFor="cover">Cover Image</Label>
        <Input
          className="bg-white/60 dark:bg-gray-700/60 border border-gray-400  dark:border-gray-600 rounded-lg focus:outline-non"
          id="cover"
          type="file"
          accept="image/*"
          {...register("cover")}
        />
      </div>

      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Creating..." : "Create Book"}
      </Button>
    </form>
  );
}



