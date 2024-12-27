const Hero = () => {
  return (
    <section className="h-screen relative flex items-center justify-center">
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1481627834876-b7833e8f5570?auto=format&fit=crop&q=80')] bg-cover bg-center">
        <div className="absolute inset-0 bg-black/40 dark:bg-black/70" />
      </div>
      <div className="relative z-10 font-monoton text-center text-white max-w-5xl mx-auto px-4">
        <h1 className="text-6xl font-bold mb-6 animate-fade-in">
          Discover the Magic of Reading
        </h1>
        <p className="text-xl mb-8 font-poiret text-gray-200">
          Step into a world of endless possibilities. From enchanting tales to profound knowledge,
          your next adventure awaits.
        </p>
      </div>
    </section>
  );
};
export default Hero;