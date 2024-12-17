import { Book } from "@/types";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface BookCardProps {
  book: Book;
  onBorrow?: (bookId: string) => void;
  onReturn?: (bookId: string) => void;
  isLibrarian?: boolean;
}

export function BookCard({ book, onBorrow, onReturn, isLibrarian }: BookCardProps) {
  return (
    <Card className="h-full flex flex-col bg-gradient-to-b dark:from-gray-800/70 dark:to-gray-900/50">
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
      <CardFooter className="flex justify-between items-center">
        <Badge variant={book.status === 'available' ? 'default' : 'secondary'}>
          {book.status}
        </Badge>
        {isLibrarian ? (
          <Button variant="outline" onClick={() => onReturn?.(book.id)}>
            Manage
          </Button>
        ) : (
          book.status === 'available' && (
            <Button onClick={() => onBorrow?.(book.id)}>
              Borrow
            </Button>
          )
        )}
      </CardFooter>
    </Card>
  );
}