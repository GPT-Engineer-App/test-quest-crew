import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Facebook, Twitter, Instagram, Github, ChevronLeft, ChevronRight, Paw } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useQuery } from "@tanstack/react-query";

const catFacts = [
  "Cats sleep for about 70% of their lives.",
  "A group of cats is called a clowder.",
  "Cats have over 20 vocalizations, including the purr, meow, and hiss.",
  "The first cat in space was a French cat named Felicette in 1963.",
  "Cats can jump up to six times their length.",
  "A cat's nose print is unique, like a human's fingerprint.",
  "Cats have 32 muscles in each ear.",
  "The oldest known pet cat was found in a 9,500-year-old grave on Cyprus.",
  "A cat's hearing is much more sensitive than a human's or dog's.",
  "Cats spend 15-20% of their time grooming themselves.",
];

const catBreeds = [
  { name: "Siamese", image: "https://upload.wikimedia.org/wikipedia/commons/2/25/Siam_lilacpoint.jpg" },
  { name: "Persian", image: "https://upload.wikimedia.org/wikipedia/commons/1/15/White_Persian_Cat.jpg" },
  { name: "Maine Coon", image: "https://upload.wikimedia.org/wikipedia/commons/5/5f/Maine_Coon_cat_by_Tomitheos.JPG" },
  { name: "Bengal", image: "https://upload.wikimedia.org/wikipedia/commons/b/ba/Paintedcats_Red_Star_standing.jpg" },
  { name: "British Shorthair", image: "https://upload.wikimedia.org/wikipedia/commons/9/9d/Britishblue.jpg" },
  { name: "Sphynx", image: "https://upload.wikimedia.org/wikipedia/commons/e/e8/Sphinx2_July_2006.jpg" },
];

const fetchCatFact = async () => {
  const response = await fetch("https://catfact.ninja/fact");
  const data = await response.json();
  return data.fact;
};

const Index = () => {
  const [currentBreedIndex, setCurrentBreedIndex] = useState(0);
  const [scrollY, setScrollY] = useState(0);
  const [isHovering, setIsHovering] = useState(false);

  const { data: catFact, refetch: generateCatFact } = useQuery({
    queryKey: ["catFact"],
    queryFn: fetchCatFact,
    enabled: false,
  });

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const nextBreed = () => {
    setCurrentBreedIndex((prevIndex) => (prevIndex + 1) % catBreeds.length);
  };

  const prevBreed = () => {
    setCurrentBreedIndex((prevIndex) => (prevIndex - 1 + catBreeds.length) % catBreeds.length);
  };

  const handleHover = () => {
    setIsHovering(true);
  };

  const handleHoverEnd = () => {
    setIsHovering(false);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 100 }}
        className="bg-gray-800 text-white p-4 fixed w-full z-10"
      >
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <motion.h1
            className="text-2xl font-bold flex items-center"
            whileHover={{ scale: 1.1 }}
          >
            <Paw className="mr-2" /> CatWorld
          </motion.h1>
          <ul className="flex space-x-4">
            {["Home", "About", "Gallery", "Contact"].map((item) => (
              <motion.li key={item} whileHover={{ scale: 1.1 }}>
                <a href="#" className="hover:text-gray-300 transition-colors">
                  {item}
                </a>
              </motion.li>
            ))}
          </ul>
        </div>
      </motion.nav>

      <div className="flex-grow pt-16">
        <div className="relative h-screen overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: "url('https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80')",
              transform: `translateY(${scrollY * 0.5}px)`,
            }}
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div
              className="text-center text-white bg-black bg-opacity-50 p-8 rounded-lg"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8 }}
            >
              <motion.h1
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
                className="text-6xl font-bold mb-4"
              >
                All About Cats
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.5 }}
                className="text-2xl"
              >
                Discover the fascinating world of our feline friends
              </motion.p>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5 }}
              >
                <Button
                  className="mt-6"
                  onMouseEnter={handleHover}
                  onMouseLeave={handleHoverEnd}
                >
                  <motion.span
                    animate={{ rotate: isHovering ? 360 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Paw className="mr-2" />
                  </motion.span>
                  Explore Now
                </Button>
              </motion.div>
            </motion.div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle>Characteristics of Cats</CardTitle>
                  <CardDescription>What makes cats unique?</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="list-disc pl-6">
                    <li>Independent nature</li>
                    <li>Excellent hunters with sharp claws and teeth</li>
                    <li>Flexible bodies and quick reflexes</li>
                    <li>Keen senses, especially hearing and night vision</li>
                    <li>Communicate through vocalizations, body language, and scent</li>
                  </ul>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle>Popular Cat Breeds</CardTitle>
                  <CardDescription>Explore different cat breeds</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="relative">
                    <img
                      src={catBreeds[currentBreedIndex].image}
                      alt={catBreeds[currentBreedIndex].name}
                      className="w-full h-64 object-cover rounded-lg"
                    />
                    <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-2 rounded-b-lg">
                      <p className="text-center text-lg font-semibold">{catBreeds[currentBreedIndex].name}</p>
                    </div>
                    <Button className="absolute top-1/2 left-2 transform -translate-y-1/2" onClick={prevBreed}>
                      <ChevronLeft />
                    </Button>
                    <Button className="absolute top-1/2 right-2 transform -translate-y-1/2" onClick={nextBreed}>
                      <ChevronRight />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Card className="mb-12">
              <CardHeader>
                <CardTitle>Cat Fact Generator</CardTitle>
                <CardDescription>Learn interesting facts about cats!</CardDescription>
              </CardHeader>
              <CardContent>
                <Button onClick={() => generateCatFact()}>Generate Cat Fact</Button>
                <AnimatePresence mode="wait">
                  {catFact && (
                    <motion.div
                      key={catFact}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.3 }}
                      className="mt-4 p-4 bg-gray-100 rounded-lg"
                    >
                      <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                      >
                        {catFact}
                      </motion.p>
                      <motion.div
                        className="w-full h-1 bg-blue-500 mt-2"
                        initial={{ width: 0 }}
                        animate={{ width: "100%" }}
                        transition={{ duration: 5 }}
                      />
                    </motion.div>
                  )}
                </AnimatePresence>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>

      <footer className="bg-gray-800 text-white p-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="mb-4 md:mb-0">&copy; 2023 CatWorld. All rights reserved.</p>
            <div className="flex space-x-4">
              <motion.a whileHover={{ scale: 1.2 }} href="#" className="hover:text-gray-300 transition-colors">
                <Facebook size={24} />
              </motion.a>
              <motion.a whileHover={{ scale: 1.2 }} href="#" className="hover:text-gray-300 transition-colors">
                <Twitter size={24} />
              </motion.a>
              <motion.a whileHover={{ scale: 1.2 }} href="#" className="hover:text-gray-300 transition-colors">
                <Instagram size={24} />
              </motion.a>
              <motion.a whileHover={{ scale: 1.2 }} href="#" className="hover:text-gray-300 transition-colors">
                <Github size={24} />
              </motion.a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
