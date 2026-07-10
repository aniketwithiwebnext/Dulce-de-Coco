import { X, Clock, Sparkles } from "lucide-react";
import { motion } from "motion/react";
import { Recipe } from "../types";

interface RecipeModalProps {
  recipe: Recipe | null;
  onClose: () => void;
}

export default function RecipeModal({ recipe, onClose }: RecipeModalProps) {
  if (!recipe) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6" id="recipe-modal-backdrop">
      {/* Dimmed Background */}
      <div
        className="absolute inset-0 bg-[#3D2B1F]/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal Card */}
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 50, opacity: 0 }}
        className="relative bg-[#F9F7F2] rounded-3xl max-w-2xl w-full max-h-[85vh] overflow-y-auto shadow-2xl border border-[#F0ECE4] flex flex-col"
        id="recipe-modal-card"
      >
        {/* Header Image */}
        <div className="relative h-48 sm:h-64 w-full">
          <img
            src={recipe.image}
            alt={recipe.title}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#F9F7F2] via-transparent to-black/20" />
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 bg-[#F9F7F2] hover:bg-[#E8E2D6] rounded-full border border-[#F0ECE4] text-[#3D2B1F] shadow-md transition-all cursor-pointer"
            aria-label="Close details"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-8 space-y-6">
          <div className="flex flex-wrap items-center gap-3">
            <span className="px-3 py-1 bg-[#E8E2D6] text-[#4B5D41] rounded-full text-xs font-bold uppercase tracking-wider">
              {recipe.difficulty}
            </span>
            <span className="flex items-center space-x-1 text-xs text-[#7C8D6C] font-semibold">
              <Clock className="h-3.5 w-3.5" />
              <span>{recipe.prepTime}</span>
            </span>
          </div>

          <div className="space-y-2">
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#3D2B1F] flex items-center gap-2">
              <span>{recipe.title}</span>
              <Sparkles className="h-5 w-5 text-[#4B5D41]" />
            </h3>
            <p className="text-[#5C4D42] text-sm leading-relaxed italic">
              {recipe.description}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 pt-2">
            {/* Ingredients column */}
            <div className="md:col-span-5 space-y-3">
              <h4 className="font-serif font-bold text-base text-[#3D2B1F] border-b border-[#F0ECE4] pb-2">
                Ingredients
              </h4>
              <ul className="space-y-2">
                {recipe.ingredients.map((ing, idx) => (
                  <li key={idx} className="text-xs sm:text-sm text-[#5C4D42] flex items-start space-x-2">
                    <span className="text-[#4B5D41] font-bold mt-0.5">•</span>
                    <span>{ing}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Instructions column */}
            <div className="md:col-span-7 space-y-3">
              <h4 className="font-serif font-bold text-base text-[#3D2B1F] border-b border-[#F0ECE4] pb-2">
                Step-by-Step Directions
              </h4>
              <ol className="space-y-4">
                {recipe.instructions.map((step, idx) => (
                  <li key={idx} className="space-y-1">
                    <span className="text-xs font-bold text-[#4B5D41] tracking-wider uppercase">
                      Step {idx + 1}
                    </span>
                    <p className="text-xs sm:text-sm text-[#5C4D42] leading-relaxed">
                      {step}
                    </p>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
