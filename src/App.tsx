import React, { useState, useEffect, FormEvent } from "react";
import {
  Leaf,
  Sparkles,
  ShieldAlert,
  Heart,
  Droplets,
  Star,
  Flame,
  Coffee,
  Apple,
  ChevronDown,
  ShoppingBag,
  Plus,
  Minus,
  ArrowUp,
  ArrowRight,
  Instagram,
  Facebook,
  Twitter,
  Quote,
  CheckCircle2,
  Mail
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

import Header from "./components/Header";
import Chatbot from "./components/Chatbot";
import ContactForm from "./components/ContactForm";
import RecipeModal from "./components/RecipeModal";

import {
  PRODUCT_DATA,
  FEATURES_DATA,
  RECIPES_DATA,
  TESTIMONIALS_DATA,
  FAQ_DATA
} from "./data";
import { Recipe } from "./types";

export default function App() {
  const [cartCount, setCartCount] = useState(0);
  const [cartQty, setCartQty] = useState(1);
  const [activeRecipe, setActiveRecipe] = useState<Recipe | null>(null);
  const [openFaq, setOpenFaq] = useState<string | null>(null);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [emailInput, setEmailInput] = useState("");
  const [newsletterSubscribed, setNewsletterSubscribed] = useState(false);

  // Scroll to Top visibility
  useEffect(() => {
    const checkScroll = () => {
      if (window.scrollY > 400) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };
    window.addEventListener("scroll", checkScroll);
    return () => window.removeEventListener("scroll", checkScroll);
  }, []);

  const handleAddToCart = () => {
    setCartCount((prev) => prev + cartQty);
    setShowNotification(true);
    setTimeout(() => {
      setShowNotification(false);
    }, 3000);
  };

  const handleNewsletterSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!emailInput.trim()) return;
    setNewsletterSubscribed(true);
    setEmailInput("");
  };

  // Helper to map dynamic string icons to actual Lucide component
  const renderFeatureIcon = (iconName: string) => {
    const props = { className: "h-6 w-6 text-[#4B5D41]" };
    switch (iconName) {
      case "Leaf":
        return <Leaf {...props} />;
      case "Sparkles":
        return <Sparkles {...props} />;
      case "ShieldAlert":
        return <ShieldAlert {...props} />;
      case "Heart":
        return <Heart {...props} />;
      case "Droplets":
        return <Droplets {...props} />;
      case "Star":
        return <Star {...props} />;
      case "Flame":
        return <Flame {...props} />;
      case "Coffee":
        return <Coffee {...props} />;
      case "Apple":
        return <Apple {...props} />;
      default:
        return <Leaf {...props} />;
    }
  };

  return (
    <div className="min-h-screen relative overflow-x-hidden bg-[#F9F7F2] selection:bg-[#E8E2D6] selection:text-[#3D2B1F]">
      
      {/* Header Navigation */}
      <Header cartCount={cartCount} onOpenCart={() => setIsCartOpen(true)} />

      {/* Floating Action Notification */}
      <AnimatePresence>
        {showNotification && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.9 }}
            className="fixed top-24 left-1/2 -translate-x-1/2 z-50 bg-[#4B5D41] text-[#F9F7F2] px-6 py-3 rounded-full flex items-center space-x-3 shadow-lg border border-[#3D2B1F]"
            id="cart-notification"
          >
            <ShoppingBag className="h-4 w-4 text-[#E8E2D6]" />
            <span className="text-sm font-semibold">
              Added {cartQty} {cartQty === 1 ? "jar" : "jars"} of Dulce de Coco to cart!
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <section
        id="home"
        className="relative pt-24 pb-16 lg:pt-36 lg:pb-24 flex items-center bg-[radial-gradient(#E8E2D6_1px,transparent_1px)] [background-size:24px_24px] min-h-[90vh]"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="max-w-4xl mx-auto text-center space-y-6 z-10" id="hero-statement">
            <div className="inline-flex items-center space-x-2 bg-[#E8E2D6] px-4 py-1.5 rounded-full text-xs font-bold text-[#4B5D41] uppercase tracking-wider shadow-sm">
              <Sparkles className="h-3.5 w-3.5 animate-pulse" />
              <span>Premium Plant-Based Confectionery</span>
            </div>
            
            <h1 className="font-serif font-bold text-4xl sm:text-5xl lg:text-6xl text-[#3D2B1F] leading-tight tracking-tight">
              The Creamy <span className="text-[#4B5D41] italic">Coconut</span> Condensed Milk Everyone Can Enjoy
            </h1>
            
            <p className="text-[#5C4D42] text-base sm:text-lg max-w-2xl mx-auto leading-relaxed font-medium">
              Vegan, gluten-free, dairy-free, and allergy-friendly goodness made with coconut. Sacrificing dairy doesn't mean sacrificing the rich, caramelly textures you love.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
              <a
                href="#product"
                className="w-full sm:w-auto px-8 py-4 bg-[#4B5D41] hover:bg-[#3D2B1F] text-[#F9F7F2] font-bold text-base rounded-2xl shadow-md transition-all flex items-center justify-center space-x-2 cursor-pointer group"
              >
                <span>Shop Now</span>
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </a>
              <a
                href="#about"
                className="w-full sm:w-auto px-8 py-4 border border-[#4B5D41] text-[#4B5D41] font-bold text-base rounded-2xl hover:bg-[#4B5D41]/5 transition-all text-center cursor-pointer"
              >
                Learn More
              </a>
            </div>

            {/* Badges */}
            <div className="grid grid-cols-3 gap-3 pt-6 max-w-md mx-auto text-center">
              <div className="p-3 bg-white border border-[#F0ECE4] rounded-xl shadow-sm">
                <div className="font-serif font-bold text-[#4B5D41] text-lg">100%</div>
                <div className="text-[10px] uppercase font-bold text-[#5C4D42]">Vegan & Safe</div>
              </div>
              <div className="p-3 bg-white border border-[#F0ECE4] rounded-xl shadow-sm">
                <div className="font-serif font-bold text-[#4B5D41] text-lg">Gluten</div>
                <div className="text-[10px] uppercase font-bold text-[#5C4D42]">Free Certified</div>
              </div>
              <div className="p-3 bg-white border border-[#F0ECE4] rounded-xl shadow-sm">
                <div className="font-serif font-bold text-[#4B5D41] text-lg">No Dairy</div>
                <div className="text-[10px] uppercase font-bold text-[#5C4D42]">Pure Coconuts</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Us Story Section */}
      <section id="about" className="py-20 bg-white border-y border-[#F0ECE4]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Visual Image Collage of premium food */}
            <div className="lg:col-span-5 relative" id="about-image-layout">
              <div className="aspect-[4/5] rounded-3xl overflow-hidden shadow-lg border border-[#F0ECE4]">
                <img
                  src="/src/assets/images/hero_coconut_milk_1783719717323.jpg"
                  alt="Organic Coconut Condensed Milk and Baking Ingredients"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                />
              </div>
              {/* Overlap decorative card */}
              <div className="absolute -bottom-6 -right-6 bg-[#F9F7F2] p-6 rounded-2xl border border-[#F0ECE4] shadow-xl max-w-[200px] hidden sm:block">
                <p className="text-xs font-serif font-bold text-[#3D2B1F] italic">"The dream alternative: rich, sticky-sweet caramel texture with celiac safety."</p>
                <p className="text-[10px] uppercase font-bold text-[#4B5D41] mt-3 tracking-wider">- Gabriela, Founder</p>
              </div>
            </div>

            {/* About us copy */}
            <div className="lg:col-span-7 space-y-6" id="about-story-text">
              <span className="text-xs font-bold tracking-widest text-[#4B5D41] uppercase">
                The Dulce de Coco Story
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#3D2B1F] leading-tight">
                Passion for Inclusive Baking, Born in Davenport, Florida
              </h2>
              <div className="space-y-4 text-sm sm:text-base text-[#5C4D42] leading-relaxed">
                <p>
                  Dulce de Coco was founded by Chef Gabriela with a single, clear mission: **no one should have to sacrifice flavor because of dietary restrictions**. Sweetened condensed milk is the backbone of so many nostalgic family recipes—from grandmother's brigadeiros and custard pies to decadent lattes and tres leches cakes. For years, people with celiac disease, milk allergies, and plant-based lifestyles had to simply go without.
                </p>
                <p>
                  We spent countless hours experimenting with natural coconut bases, searching for the exact ratio that mimic's dairy condensed milk's slow-flowing density and deep caramelized complexity. The result is our flagship **Dulce de Coco Sweetened Coconut Condensed Milk**.
                </p>
                <p>
                  By using premium coconuts as a natural ingredient, we've bypassed dairy, gluten, soy, and palm oil. Today, our kitchen in Davenport, Florida proudly ships this gourmet alternative directly to allergy-aware families, professional bakers, and coffee shops across the nation.
                </p>
              </div>
              <div className="pt-2">
                <div className="flex items-center space-x-4 border-l-2 border-[#4B5D41] pl-4">
                  <div>
                    <h4 className="font-serif font-semibold text-lg text-[#3D2B1F]">Chef Gabriela</h4>
                    <p className="text-xs text-[#5C4D42] font-medium">Founder & Head Confectioner</p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Why Choose Section */}
      <section id="why-choose" className="py-20 bg-[#F9F7F2]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
            <span className="text-xs font-bold tracking-widest text-[#4B5D41] uppercase">
              Our Ingredients & Craft
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#3D2B1F]">
              Why Choose Dulce de Coco?
            </h2>
            <p className="text-sm sm:text-base text-[#5C4D42] leading-relaxed">
              Every jar is produced with care, combining organic raw coconuts and minimal natural ingredients to deliver premium dietary safety.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8" id="features-card-grid">
            {FEATURES_DATA.map((feature, idx) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.05, duration: 0.4 }}
                className="bg-white p-6 sm:p-8 rounded-3xl border border-[#F0ECE4] shadow-sm hover:shadow-md hover:border-[#4B5D41]/30 transition-all group"
              >
                <div className="p-3 bg-[#E8E2D6] rounded-2xl w-fit group-hover:bg-[#4B5D41]/10 transition-colors">
                  {renderFeatureIcon(feature.icon)}
                </div>
                <h3 className="font-serif font-bold text-lg text-[#3D2B1F] mt-4 mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm text-[#5C4D42] leading-relaxed">
                  {feature.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Product Section */}
      <section id="product" className="py-20 bg-white border-y border-[#F0ECE4]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Product Image Panel */}
            <div className="lg:col-span-5 flex justify-center" id="product-media">
              <div className="relative bg-[#F9F7F2] p-8 rounded-3xl border border-[#F0ECE4] shadow-md max-w-md w-full">
                <div className="absolute top-4 left-4 bg-[#4B5D41] text-[#F9F7F2] px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider shadow-sm">
                  Best Seller
                </div>
                <img
                  src={PRODUCT_DATA.image}
                  alt={PRODUCT_DATA.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-auto object-contain max-h-[380px] hover:scale-105 transition-transform duration-500"
                />
                <div className="flex justify-center space-x-2 mt-4 text-[#4B5D41]">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-current" />
                  ))}
                  <span className="text-xs font-bold text-[#5C4D42] ml-1">
                    {PRODUCT_DATA.rating} ({PRODUCT_DATA.reviewsCount} reviews)
                  </span>
                </div>
              </div>
            </div>

            {/* Product description and cart */}
            <div className="lg:col-span-7 space-y-6" id="product-info">
              <div className="space-y-2">
                <span className="text-xs font-bold tracking-widest text-[#4B5D41] uppercase">
                  Flagship Store
                </span>
                <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#3D2B1F]">
                  {PRODUCT_DATA.name}
                </h2>
                <div className="text-2xl font-bold text-[#4B5D41] font-serif pt-1">
                  ${PRODUCT_DATA.price} <span className="text-xs text-[#5C4D42] font-sans font-medium">/ 11.5 oz Glass Jar</span>
                </div>
              </div>

              <p className="text-sm sm:text-base text-[#5C4D42] leading-relaxed">
                {PRODUCT_DATA.description}
              </p>

              <div className="border-t border-[#F0ECE4] pt-4 grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* Ingredients column */}
                <div className="space-y-2">
                  <h4 className="font-serif font-bold text-sm text-[#3D2B1F] uppercase tracking-wider">
                    Pure Clean Ingredients
                  </h4>
                  <ul className="text-xs sm:text-sm text-[#5C4D42] space-y-1.5 list-disc pl-4">
                    {PRODUCT_DATA.ingredients.map((ing) => (
                      <li key={ing}>{ing}</li>
                    ))}
                  </ul>
                </div>
                {/* Nutrition highlights */}
                <div className="space-y-2">
                  <h4 className="font-serif font-bold text-sm text-[#3D2B1F] uppercase tracking-wider">
                    Nutritional Highlights
                  </h4>
                  <div className="grid grid-cols-2 gap-2">
                    {PRODUCT_DATA.nutritionalHighlights.map((nut) => (
                      <div key={nut.label} className="bg-[#F9F7F2] p-2 rounded-lg border border-[#F0ECE4] text-center">
                        <div className="text-[10px] text-[#5C4D42] uppercase font-bold">{nut.label}</div>
                        <div className="text-xs font-bold text-[#4B5D41]">{nut.value}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Culinary Uses */}
              <div className="space-y-2 border-t border-[#F0ECE4] pt-4">
                <h4 className="font-serif font-bold text-sm text-[#3D2B1F] uppercase tracking-wider">
                  Infinite Desserts & Coffee Uses
                </h4>
                <div className="flex flex-wrap gap-2">
                  {["Cakes", "Cookies", "Coffee", "Smoothies", "Ice Cream", "Flan", "Tres Leches", "Brigadeiros"].map((u) => (
                    <span key={u} className="px-3 py-1 bg-[#E8E2D6]/50 text-[#5C4D42] rounded-full text-xs font-semibold">
                      {u}
                    </span>
                  ))}
                </div>
              </div>

              {/* Quantity Selector and Checkout */}
              <div className="pt-4 border-t border-[#F0ECE4] flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                <div className="flex items-center justify-between border border-[#F0ECE4] bg-white rounded-xl px-4 py-2 sm:w-36">
                  <button
                    onClick={() => setCartQty((q) => Math.max(1, q - 1))}
                    className="p-1.5 text-[#5C4D42] hover:text-[#4B5D41] transition-all cursor-pointer"
                    aria-label="Decrease quantity"
                  >
                    <Minus className="h-4 w-4" />
                  </button>
                  <span className="font-bold text-[#3D2B1F] px-4">{cartQty}</span>
                  <button
                    onClick={() => setCartQty((q) => q + 1)}
                    className="p-1.5 text-[#5C4D42] hover:text-[#4B5D41] transition-all cursor-pointer"
                    aria-label="Increase quantity"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>

                <button
                  onClick={handleAddToCart}
                  className="flex-1 py-3.5 bg-[#4B5D41] hover:bg-[#3D2B1F] text-white rounded-xl font-bold flex items-center justify-center space-x-2 shadow-md hover:shadow-lg transition-all cursor-pointer"
                  id="add-to-cart-action-btn"
                >
                  <ShoppingBag className="h-4.5 w-4.5" />
                  <span>Add to Cart - ${(PRODUCT_DATA.price * cartQty).toFixed(2)}</span>
                </button>
              </div>

              <p className="text-[11px] text-[#5C4D42] italic text-center sm:text-left">
                📦 Standard home delivery within Florida is fully integrated. Davenport pick-up coordinates available.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* Recipes Section */}
      <section id="recipes" className="py-20 bg-[#F9F7F2]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
            <span className="text-xs font-bold tracking-widest text-[#4B5D41] uppercase">
              Bake, Brew & Create
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#3D2B1F]">
              Tropical Recipe Inspiration
            </h2>
            <p className="text-sm sm:text-base text-[#5C4D42] leading-relaxed">
              No dairy, no sacrifice. Explore mouth-watering recipes tested extensively in our Davenport bakery kitchen. Click any recipe card to reveal full instructions.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8" id="recipes-card-grid">
            {RECIPES_DATA.map((recipe, idx) => (
              <motion.div
                key={recipe.id}
                initial={{ opacity: 0, scale: 0.98 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.05, duration: 0.4 }}
                onClick={() => setActiveRecipe(recipe)}
                className="bg-white rounded-3xl border border-[#F0ECE4] overflow-hidden shadow-sm hover:shadow-md hover:border-[#4B5D41]/30 transition-all cursor-pointer group flex flex-col h-full"
              >
                <div className="relative h-48 sm:h-56 w-full overflow-hidden">
                  <img
                    src={recipe.image}
                    alt={recipe.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 bg-[#F9F7F2] px-3 py-1 rounded-full text-[10px] font-bold text-[#4B5D41] uppercase tracking-wider shadow-sm">
                    {recipe.difficulty}
                  </div>
                </div>

                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div className="space-y-2">
                    <div className="text-[11px] font-bold text-[#4B5D41] uppercase tracking-wider">
                      {recipe.prepTime} Prep Time
                    </div>
                    <h3 className="font-serif font-bold text-lg sm:text-xl text-[#3D2B1F] group-hover:text-[#4B5D41] transition-colors">
                      {recipe.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-[#5C4D42] line-clamp-3 leading-relaxed">
                      {recipe.description}
                    </p>
                  </div>
                  
                  <div className="pt-4 mt-4 border-t border-[#F0ECE4] flex items-center justify-between text-xs font-bold text-[#4B5D41]">
                    <span>View Full Recipe</span>
                    <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Customer Testimonials */}
      <section id="testimonials" className="py-20 bg-white border-y border-[#F0ECE4]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
            <span className="text-xs font-bold tracking-widest text-[#4B5D41] uppercase">
              Bakers Speak Out
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#3D2B1F]">
              Family Favorites & Dairy Replacements
            </h2>
            <p className="text-sm sm:text-base text-[#5C4D42] leading-relaxed">
              Read how coconut sweetened condensed milk has solved dessert time for households and local coffee houses.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8" id="testimonials-grid">
            {TESTIMONIALS_DATA.map((testimonial) => (
              <div
                key={testimonial.id}
                className="bg-[#F9F7F2] p-6 sm:p-8 rounded-3xl border border-[#F0ECE4] shadow-sm flex flex-col justify-between relative"
              >
                <div className="absolute top-6 right-6 text-[#E8E2D6] opacity-60">
                  <Quote className="h-10 w-10 stroke-1" />
                </div>
                
                <div className="space-y-4">
                  <div className="flex text-amber-500">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-current" />
                    ))}
                  </div>
                  <p className="text-sm sm:text-base text-[#5C4D42] leading-relaxed italic relative z-10">
                    "{testimonial.quote}"
                  </p>
                </div>

                <div className="flex items-center space-x-3.5 pt-6 mt-6 border-t border-[#F0ECE4]">
                  <span className="h-11 w-11 rounded-full bg-[#4B5D41] text-white font-serif font-bold flex items-center justify-center shadow-sm">
                    {testimonial.avatarLetter}
                  </span>
                  <div>
                    <h4 className="font-bold text-sm text-[#3D2B1F]">{testimonial.name}</h4>
                    <p className="text-xs text-[#5C4D42]">{testimonial.location}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-20 bg-[#F9F7F2]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-3 mb-12">
            <span className="text-xs font-bold tracking-widest text-[#4B5D41] uppercase">
              Got Questions?
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#3D2B1F]">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-4" id="faq-accordion-group">
            {FAQ_DATA.map((faq) => {
              const isSelected = openFaq === faq.id;
              return (
                <div
                  key={faq.id}
                  className="bg-white rounded-2xl border border-[#F0ECE4] overflow-hidden shadow-sm transition-all"
                >
                  <button
                    onClick={() => setOpenFaq(isSelected ? null : faq.id)}
                    className="w-full px-6 py-5 text-left flex items-center justify-between font-serif font-bold text-[#3D2B1F] hover:text-[#4B5D41] transition-colors text-base sm:text-lg focus:outline-none cursor-pointer"
                  >
                    <span>{faq.question}</span>
                    <ChevronDown
                      className={`h-5 w-5 text-[#5C4D42] transition-transform duration-300 ${
                        isSelected ? "rotate-180 text-[#4B5D41]" : ""
                      }`}
                    />
                  </button>
                  <AnimatePresence>
                    {isSelected && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        className="overflow-hidden"
                      >
                        <div className="px-6 pb-6 text-sm sm:text-base text-[#5C4D42] leading-relaxed border-t border-[#F9F7F2]">
                          {faq.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Newsletter Signup (Join the Coconut Club) */}
      <section className="py-16 bg-[#4B5D41] text-[#F9F7F2]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <span className="p-3 bg-white/10 rounded-full inline-flex text-[#E8E2D6] animate-bounce">
            <Leaf className="h-6 w-6" />
          </span>
          <div className="space-y-2">
            <h2 className="font-serif text-3xl font-bold text-white">
              Join the Coconut Club
            </h2>
            <p className="text-[#E8E2D6] text-sm sm:text-base max-w-lg mx-auto">
              Subscribe to get seasonal recipe books, Davenport baking class schedules, and 10% off your first wholesale bulk order.
            </p>
          </div>

          <AnimatePresence mode="wait">
            {!newsletterSubscribed ? (
              <motion.form
                key="newsletter-form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onSubmit={handleNewsletterSubmit}
                className="flex flex-col sm:flex-row max-w-md mx-auto gap-2"
              >
                <input
                  type="email"
                  required
                  placeholder="Enter your email address"
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                  className="flex-1 px-4 py-3 bg-[#F9F7F2] text-[#3D2B1F] rounded-xl border-none focus:outline-none focus:ring-2 focus:ring-[#E8E2D6] placeholder:text-[#5C4D42]/60 text-sm"
                />
                <button
                  type="submit"
                  className="px-6 py-3 bg-[#E8E2D6] hover:bg-[#D4CBBF] text-[#4B5D41] font-bold rounded-xl shadow-md transition-all text-sm cursor-pointer whitespace-nowrap"
                >
                  Join Club
                </button>
              </motion.form>
            ) : (
              <motion.div
                key="subscribed"
                initial={{ scale: 0.95 }}
                animate={{ scale: 1 }}
                className="bg-white/10 p-4 rounded-2xl max-w-md mx-auto border border-white/20 flex items-center justify-center space-x-3 text-[#FCFAF6]"
              >
                <CheckCircle2 className="h-5 w-5 text-[#E8E2D6]" />
                <span className="text-sm font-semibold">Welcome to the club! Check your inbox soon.</span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* Contact Section & Google Maps */}
      <section id="contact" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ContactForm />
        </div>
      </section>

      {/* Footer Section */}
      <footer className="bg-[#3D2B1F] text-[#F9F7F2] pt-16 pb-8 border-t border-[#5C4D42]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 pb-12 border-b border-[#5C4D42]">
          
          {/* Column 1: Brand Info */}
          <div className="md:col-span-4 space-y-4">
            <div className="flex items-center space-x-2">
              <span className="p-1.5 bg-[#4B5D41] rounded-full text-white">
                <Leaf className="h-4.5 w-4.5" />
              </span>
              <span className="font-serif font-bold text-lg sm:text-xl tracking-tight">Dulce de Coco</span>
            </div>
            <p className="text-xs sm:text-sm text-[#5C4D42] leading-relaxed">
              Gourmet plant-based alternative recipes made with care. Freeing dessert time from gluten, dairy, and soy allergens since day one. Based out of Davenport, Florida.
            </p>
            {/* Socials */}
            <div className="flex space-x-3 pt-2 text-[#5C4D42] hover:text-[#F9F7F2]">
              <a href="https://instagram.com" className="p-2 bg-[#5C4D42] hover:bg-[#4B5D41] hover:text-white rounded-full transition-all" aria-label="Instagram">
                <Instagram className="h-4 w-4" />
              </a>
              <a href="https://facebook.com" className="p-2 bg-[#5C4D42] hover:bg-[#4B5D41] hover:text-white rounded-full transition-all" aria-label="Facebook">
                <Facebook className="h-4 w-4" />
              </a>
              <a href="https://twitter.com" className="p-2 bg-[#5C4D42] hover:bg-[#4B5D41] hover:text-white rounded-full transition-all" aria-label="Twitter">
                <Twitter className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Column 2: Quick links */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="font-serif font-bold text-sm tracking-widest uppercase text-[#4B5D41]">Quick Links</h4>
            <ul className="text-xs sm:text-sm text-[#5C4D42] space-y-2">
              <li><a href="#home" className="hover:text-white transition-colors">Home Base</a></li>
              <li><a href="#about" className="hover:text-white transition-colors">Founder Story</a></li>
              <li><a href="#product" className="hover:text-white transition-colors">Gourmet Products</a></li>
              <li><a href="#recipes" className="hover:text-white transition-colors">Baker Recipes</a></li>
              <li><a href="#testimonials" className="hover:text-white transition-colors">Reviews</a></li>
            </ul>
          </div>

          {/* Column 3: Contact */}
          <div className="md:col-span-5 space-y-3">
            <h4 className="font-serif font-bold text-sm tracking-widest uppercase text-[#4B5D41]">Contact Us</h4>
            <ul className="text-xs sm:text-sm text-[#5C4D42] space-y-2">
              <li>📍 Davenport, Florida, USA</li>
              <li>📞 863-360-6088 (General queries & wholesale orders)</li>
              <li>✉️ gabrielabmgm29@gmail.com</li>
              <li className="text-[11px] italic text-[#4B5D41] font-medium pt-1">
                Proud member of the Florida Plant-Based Retailers Guild
              </li>
            </ul>
          </div>

        </div>

        {/* Brand Copyright and iWebNext Requirement */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 flex flex-col md:flex-row items-center justify-between text-xs text-[#5C4D42] space-y-3 md:space-y-0">
          <p>© {new Date().getFullYear()} Dulce de Coco. All rights reserved. Davenport, FL.</p>
          <div className="flex space-x-6">
            <a href="#faq" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#faq" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
          {/* Centered/aligned footer link strictly following ADDITIONAL_USER_INSTRUCTIONS #8: Developed by <a href="https://iwebnext.com" target="_blank">iWebNext</a> */}
          <p className="text-center">
            Developed by <a href="https://iwebnext.com" target="_blank" className="font-semibold text-[#4B5D41] hover:text-[#E8E2D6] transition-colors underline decoration-[#4B5D41]">iWebNext</a>
          </p>
        </div>
      </footer>

      {/* Floating Scroll to Top button strictly following ADDITIONAL_USER_INSTRUCTIONS #7 */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="fixed bottom-6 left-6 z-50 p-3 bg-[#4B5D41] hover:bg-[#3D2B1F] text-white rounded-full shadow-2xl border border-[#F9F7F2] cursor-pointer"
            aria-label="Scroll back to top"
            whileHover={{ y: -3 }}
          >
            <ArrowUp className="h-5 w-5" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Client-side Cart Modal Preview (Simple overlay) */}
      <AnimatePresence>
        {isCartOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-end" id="cart-drawer-backdrop">
            <div className="absolute inset-0 bg-black/40 backdrop-blur-xs" onClick={() => setIsCartOpen(false)} />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.3 }}
              className="relative bg-[#F9F7F2] max-w-md w-full h-full shadow-2xl p-6 flex flex-col justify-between border-l border-[#F0ECE4] font-sans"
              id="cart-drawer-card"
            >
              <div className="space-y-6">
                <div className="flex items-center justify-between border-b border-[#F0ECE4] pb-4">
                  <h3 className="font-serif font-bold text-xl text-[#3D2B1F]">Your Shopping Bag</h3>
                  <button onClick={() => setIsCartOpen(false)} className="text-[#5C4D42] hover:text-[#4B5D41] font-bold text-sm cursor-pointer">
                    Close
                  </button>
                </div>

                {cartCount > 0 ? (
                  <div className="space-y-4">
                    <div className="flex items-center space-x-4 p-4 bg-white rounded-2xl border border-[#F0ECE4]">
                      <img
                        src={PRODUCT_DATA.image}
                        alt={PRODUCT_DATA.name}
                        referrerPolicy="no-referrer"
                        className="w-16 h-16 object-contain"
                      />
                      <div className="flex-1">
                        <h4 className="font-serif font-bold text-sm text-[#3D2B1F] line-clamp-1">{PRODUCT_DATA.name}</h4>
                        <p className="text-xs text-[#5C4D42]">Quantity: {cartCount}</p>
                        <p className="text-sm font-bold text-[#4B5D41] mt-1">${(PRODUCT_DATA.price * cartCount).toFixed(2)}</p>
                      </div>
                      <button
                        onClick={() => setCartCount(0)}
                        className="text-xs font-bold text-rose-500 hover:underline cursor-pointer"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-20 text-[#5C4D42] space-y-2">
                    <ShoppingBag className="h-12 w-12 mx-auto stroke-1" />
                    <p className="font-medium">Your shopping bag is empty.</p>
                    <p className="text-xs">Add our premium coconut condensed milk to get baking!</p>
                  </div>
                )}
              </div>

              {cartCount > 0 && (
                <div className="border-t border-[#F0ECE4] pt-4 space-y-4">
                  <div className="flex justify-between text-base font-bold text-[#3D2B1F]">
                    <span>Subtotal</span>
                    <span>${(PRODUCT_DATA.price * cartCount).toFixed(2)}</span>
                  </div>
                  <button
                    onClick={() => {
                      alert("Thank you! Connecting to checkout proxy... (Davenport hub handles direct shipping)");
                      setIsCartOpen(false);
                    }}
                    className="w-full py-3 bg-[#4B5D41] hover:bg-[#3D2B1F] text-white font-bold rounded-xl shadow-md transition-all cursor-pointer"
                  >
                    Proceed to Safe Checkout
                  </button>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Floating AI Chatbot Widget */}
      <Chatbot />

      {/* Recipe details modal popup */}
      <AnimatePresence>
        {activeRecipe && (
          <RecipeModal recipe={activeRecipe} onClose={() => setActiveRecipe(null)} />
        )}
      </AnimatePresence>

    </div>
  );
}
