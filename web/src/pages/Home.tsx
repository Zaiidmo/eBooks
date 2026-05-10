import BookSection from "@/components/home/BookSection";
import "../App.css";
import Hero from "@/components/home/HeroSection";
import { MOCK_BOOKS } from "@/constants/demoData";

function Home() {
  const Books = MOCK_BOOKS.map(book => ({
    ...book,
    borrowedDate: new Date(),
    returnDate: new Date(),
    status: "AVAILABLE"
  }));

  return (
    <>
   <Hero/>
   <BookSection title="Recently Added" books={Books} />
    </>
  );
}
export default Home;
