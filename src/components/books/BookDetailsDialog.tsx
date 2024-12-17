import { Book } from "@/types";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Calendar, Book as BookIcon, QrCode } from "lucide-react";

interface BookDetailsDialogProps {
  book: Book;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function BookDetailsDialog({ book, open, onOpenChange }: BookDetailsDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>{book.title}</DialogTitle>
          <DialogDescription>by {book.author}</DialogDescription>
        </DialogHeader>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="aspect-[2/3] relative">
            <img
              src={book.cover}
              alt={book.title}
              className="object-cover rounded-lg w-full h-full"
            />
          </div>
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Badge variant={book.status === 'available' ? 'default' : 'secondary'}>
                {book.status}
              </Badge>
            </div>
            <p className="text-sm text-muted-foreground">{book.description}</p>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm">
                <BookIcon className="h-4 w-4" />
                <span>ISBN: {book.isbn}</span>
              </div>
              {book.borrowedDate && (
                <div className="flex items-center gap-2 text-sm">
                  <Calendar className="h-4 w-4" />
                  <span>Borrowed: {new Date(book.borrowedDate).toLocaleDateString()}</span>
                </div>
              )}
              {book.returnDate && (
                <div className="flex items-center gap-2 text-sm">
                  <Calendar className="h-4 w-4" />
                  <span>Due: {new Date(book.returnDate).toLocaleDateString()}</span>
                </div>
              )}
              <div className="flex items-center gap-2 text-sm">
                <QrCode className="h-4 w-4" />
                <span>Location: Section A, Shelf 3</span>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}