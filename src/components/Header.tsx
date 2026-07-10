import { useState, useEffect } from "react";
import { Menu, X, ShoppingBag, Leaf, Phone } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface HeaderProps {
  cartCount: number;
  onOpenCart: () => void;
}

export default function Header({ cartCount, onOpenCart }: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "#home" },
    { name: "About Us", href: "#about" },
    { name: "Our Product", href: "#product" },
    { name: "Recipes", href: "#recipes" },
    { name: "Testimonials", href: "#testimonials" },
    { name: "FAQ", href: "#faq" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 w-full z-40 transition-all duration-300 ${
        isScrolled
          ? "bg-[#F9F7F2]/90 backdrop-blur-md shadow-sm border-b border-[#F0ECE4]"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <a href="#home" className="flex items-center space-x-2 group">
            <span className="p-2 bg-[#4B5D41] rounded-full text-white shadow-md group-hover:bg-[#3D2B1F] transition-colors">
              <Leaf className="h-5 w-5" />
            </span>
            <div className="flex flex-col">
              <span className="font-serif font-bold text-xl sm:text-2xl tracking-tight text-[#3D2B1F] group-hover:text-[#4B5D41] transition-colors leading-none">
                Dulce de Coco
              </span>
              <span className="text-[10px] tracking-widest text-[#7C8D6C] uppercase font-semibold mt-0.5">
                Plant-Based Luxury
              </span>
            </div>
          </a>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex space-x-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="font-medium text-[#5C4D42] hover:text-[#4B5D41] transition-colors relative py-2 text-sm lg:text-base group"
              >
                {link.name}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#4B5D41] transition-all duration-300 group-hover:w-full"></span>
              </a>
            ))}
          </nav>

          {/* Right Utilities */}
          <div className="flex items-center space-x-4">
            <a
              href="tel:863-360-6088"
              className="hidden lg:flex items-center space-x-2 text-[#4B5D41] font-semibold text-sm hover:text-[#3D2B1F] transition-colors bg-[#E8E2D6] px-3.5 py-1.5 rounded-full"
            >
              <Phone className="h-4 w-4" />
              <span>863-360-6088</span>
            </a>

            <button
              id="header-cart-btn"
              onClick={onOpenCart}
              className="relative p-2.5 bg-[#F9F7F2] hover:bg-[#E8E2D6] border border-[#F0ECE4] rounded-full text-[#3D2B1F] hover:text-[#4B5D41] transition-all shadow-sm group"
              aria-label="View shopping cart"
            >
              <ShoppingBag className="h-5 w-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#4B5D41] text-[#F9F7F2] text-xs font-bold w-5.5 h-5.5 rounded-full flex items-center justify-center border border-[#F9F7F2] shadow-md">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2.5 rounded-full text-[#3D2B1F] hover:text-[#4B5D41] bg-[#F9F7F2] hover:bg-[#E8E2D6] border border-[#F0ECE4] shadow-sm transition-all"
              aria-expanded={isOpen}
              aria-label="Toggle navigation menu"
            >
              {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="md:hidden bg-[#F9F7F2] border-b border-[#F0ECE4] shadow-lg overflow-hidden"
          >
            <div className="px-4 pt-2 pb-6 space-y-2">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="block px-4 py-3 rounded-xl text-base font-semibold text-[#5C4D42] hover:text-[#4B5D41] hover:bg-[#E8E2D6] transition-all"
                >
                  {link.name}
                </a>
              ))}
              <div className="pt-4 px-4 border-t border-[#E8E2D6] flex flex-col space-y-3">
                <a
                  href="tel:863-360-6088"
                  className="flex items-center justify-center space-x-2 text-white bg-[#4B5D41] py-3 rounded-xl font-bold hover:bg-[#3D2B1F] transition-colors shadow-sm"
                >
                  <Phone className="h-4 w-4" />
                  <span>Call Us: 863-360-6088</span>
                </a>
                <p className="text-center text-xs text-[#7C8D6C] italic font-medium">Davenport, Florida</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
