import { Book } from "@/types";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BookIcon, Calendar, Info, QrCode } from "lucide-react";
import { GlassModal } from "../modals/GlassModal";

interface BookCardProps {
  book: Book;
  onBorrow?: (bookId: string) => void;
  onReturn?: (bookId: string) => void;
  isLibrarian?: boolean;
}

export function BookCard({
  book,
  onBorrow,
  onReturn,
  isLibrarian,
}: BookCardProps) {
  return (
    <Card className="h-full bg-gradient-to-b from-white to-black/20 dark:from-gray-800/80 dark:to-gray-800/50 flex flex-col">
      <CardHeader>
        <div className="aspect-[2/3] relative mb-4">
          <img
            src={book.cover}
            alt={book.title}
            className="object-cover rounded-lg w-full h-full"
          />
        </div>
        <CardTitle className="line-clamp-2">{book.title}</CardTitle>
        <p className="text-sm text-muted-foreground">{book.author}</p>
      </CardHeader>
      <CardContent className="flex-grow">
        <p className="text-sm text-muted-foreground line-clamp-3">
          {book.description}
        </p>
      </CardContent>
      <CardFooter className="flex justify-end items-center">
        {isLibrarian ? (
          <Button variant="outline" onClick={() => onReturn?.(book.id)}>
            Manage
          </Button>
        ) : (
          <GlassModal
            trigger={
              <Button
                className="p-1 rounded-full h-fit"
                onClick={() => onBorrow?.(book.id)}
              >
                <Info className="h-4 w-4" />
              </Button>
            }
          >
            <div className="flex flex-col space-y-1.5 text-center sm:text-left">
              <h1 className="text-2xl font-semibold leading-none tracking-tight">{book.title}</h1>
              <h4 className="text-sm text-muted-foreground">by {book.author}</h4>
            </div>
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
                  <Badge
                    variant={
                      book.status === "available" ? "default" : "secondary"
                    }
                  >
                    {book.status}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground">
                  {book.description}
                </p>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <BookIcon className="h-4 w-4" />
                    <span>ISBN: {book.isbn}</span>
                  </div>
                  {book.borrowedDate && (
                    <div className="flex items-center gap-2 text-sm">
                      <Calendar className="h-4 w-4" />
                      <span>
                        Borrowed:{" "}
                        {new Date(book.borrowedDate).toLocaleDateString()}
                      </span>
                    </div>
                  )}
                  {book.returnDate && (
                    <div className="flex items-center gap-2 text-sm">
                      <Calendar className="h-4 w-4" />
                      <span>
                        Due: {new Date(book.returnDate).toLocaleDateString()}
                      </span>
                    </div>
                  )}
                  <div className="flex items-center gap-2 text-sm">
                    <QrCode className="h-4 w-4" />
                    <span>Location: Section A, Shelf 3</span>
                  </div>
                </div>
              </div>
            </div>
          </GlassModal>
        )}
      </CardFooter>
    </Card>
  );
}
