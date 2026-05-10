
import BookSection from "@/components/home/BookSection";
import "../App.css";
import Hero from "@/components/home/HeroSection";
function Home() {
  const Books = [
    {
      book_id: "1",
      title: "The Great Gatsby",
      author: "F. Scott Fitzgerald",
      isbn: "978-0743273565",
      cover:
        "https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&q=80&w=400",
      description:
        "A story of decadence and excess, Gatsby explores the darker aspects of the American Dream.",
      category: "Fiction",
      quantity: 10,
      price: 20,
      borrowedDate: new Date(),
      returnDate: new Date(),
      status: "AVAILABLE"
    }
  ];

  return (
    <>
   <Hero/>
   <BookSection title="Recently Added" books={Books} />
    </>
  );
}
export default Home;
