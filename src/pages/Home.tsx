
import BookSection from "@/components/home/BookSection";
import "../App.css";
import Hero from "@/components/home/HeroSection";
function Home() {
  const Books = [
    {
      id: "1",
      title: "The Great Gatsby",
      author: "F. Scott Fitzgerald",
      isbn: "978-0743273565",
      cover:
        "https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&q=80&w=400",
      description:
        "A story of decadence and excess, Gatsby explores the darker aspects of the American Dream.",
      status: "available",
      borrowedDate: new Date("2024-03-01"),
      returnDate: new Date("2024-03-15"),
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
