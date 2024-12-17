import { Book } from "@/types";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal, Info, Share2, BookMarked } from "lucide-react";

interface BookCardActionsProps {
  book: Book;
  isLibrarian?: boolean;
  onViewDetails: () => void;
  onBorrow?: (bookId: string) => void;
  onReturn?: (bookId: string) => void;
}

export function BookCardActions({
  book,
  isLibrarian,
  onViewDetails,
  onBorrow,
  onReturn,
}: BookCardActionsProps) {
  return (
    <div className="flex items-center gap-2">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon">
            <MoreHorizontal className="h-4 w-4" />
            <span className="sr-only">More options</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={onViewDetails}>
            <Info className="mr-2 h-4 w-4" />
            View Details
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Share2 className="mr-2 h-4 w-4" />
            Share
          </DropdownMenuItem>
          {isLibrarian && (
            <DropdownMenuItem onClick={() => onReturn?.(book.id)}>
              <BookMarked className="mr-2 h-4 w-4" />
              Manage Book
            </DropdownMenuItem>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
      
      {!isLibrarian && book.status === 'available' && (
        <Button onClick={() => onBorrow?.(book.id)}>
          Borrow
        </Button>
      )}
    </div>
  );
}