"use client";

import { useState, useEffect } from 'react';
import { recipes } from '@/mocks/recipes';
import { Recipe } from '@/types';
import { Card } from '@/components/ui/card';
import { FaClock, FaUsers, FaBookmark, FaChevronRight } from 'react-icons/fa';
import { FiX } from 'react-icons/fi';
import { GiTreasureMap, GiOpenTreasureChest, GiLockedChest } from 'react-icons/gi';

const RandomRecipeBox = () => {
  const [isOpening, setIsOpening] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const [showRecipe, setShowRecipe] = useState(false);
  const [tooltipVisible, setTooltipVisible] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [showChestRays, setShowChestRays] = useState(false);
  const [chestStage, setChestStage] = useState(0); // 0: closed, 1: opening, 2: open
  
  // Show tooltip after some time if user hasn't interacted
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!selectedRecipe) {
        setTooltipVisible(true);
        setTimeout(() => setTooltipVisible(false), 5000);
      }
    }, 10000);
    
    return () => clearTimeout(timer);
  }, [selectedRecipe]);

  const handleBoxClick = () => {
    if (isOpening) return;
    
    setIsOpening(true);
    setShowRecipe(false);
    setIsBookmarked(false);
    
    // Start chest opening animation
    setChestStage(1); // Start opening
    
    // Show the magical rays
    setTimeout(() => {
      setShowChestRays(true);
    }, 300);
    
    // Hide current recipe during animation
    if (selectedRecipe) {
      setTimeout(() => setSelectedRecipe(null), 300);
    }

    // After initial animation, show fully open chest
    setTimeout(() => {
      setChestStage(2); // Fully open
    }, 1200);

    // Select random recipe and finish animation
    setTimeout(() => {
      // Random recipe selection
      const randomIndex = Math.floor(Math.random() * recipes.length);
      const randomRecipe = recipes[randomIndex];
      
      setSelectedRecipe(randomRecipe);
      setIsOpening(false);
      
      // Show recipe with animation
      setTimeout(() => {
        setShowRecipe(true);
        
        // Reset chest after recipe shows
        setTimeout(() => {
          setChestStage(0);
          setShowChestRays(false);
        }, 500);
        
      }, 300);
    }, 2000);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Tooltip */}
      {tooltipVisible && (
        <div 
          className="absolute bottom-24 right-0 bg-black/80 text-white p-4 rounded-lg w-64 shadow-xl
                     animate-fade-in"
        >
          <p className="text-sm">Discover a surprise recipe from our treasure chest!</p>
          <div className="absolute -bottom-2 right-6 w-0 h-0 
                         border-l-[8px] border-l-transparent 
                         border-t-[8px] border-t-black/80 
                         border-r-[8px] border-r-transparent" />
        </div>
      )}
      
      {/* Loot Box / Treasure Chest Button */}
      <div
        onClick={handleBoxClick}
        className="relative cursor-pointer group"
      >
        {/* Magical rays when chest is opening */}
        {showChestRays && (
          <div className="absolute inset-[-20px] z-[-1]">
            <div className="w-full h-full animate-rays">
              {[...Array(12)].map((_, i) => (
                <div 
                  key={i} 
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gradient-to-t from-amber-400 to-amber-300/0"
                  style={{
                    height: '120px',
                    width: '10px',
                    transformOrigin: 'bottom center',
                    transform: `rotate(${i * 30}deg)`,
                    opacity: 0.7,
                  }}
                ></div>
              ))}
            </div>
          </div>
        )}
        
        <div
          className={`
            w-24 h-24 flex items-center justify-center
            transition-all duration-300 transform
            ${isOpening ? 'scale-110' : 'hover:scale-105'}
          `}
        >
          {/* Treasure chest with state animations */}
          <div className="relative flex items-center justify-center">
            {/* Glow behind chest */}
            <div className={`
              absolute inset-0 rounded-xl bg-gradient-to-br from-yellow-300/80 to-amber-500/80
              blur-md transition-opacity duration-500 
              ${isOpening ? 'opacity-100' : 'opacity-0 group-hover:opacity-40'}
            `}></div>
            
            {/* The chest itself */}
            <div className={`
              bg-gradient-to-br from-amber-600 to-amber-800
              rounded-lg shadow-lg p-3 w-full h-full z-10
              flex flex-col items-center justify-center
              border-2 border-amber-400 relative
              ${isOpening ? 'animate-bounce-once' : ''}
            `}>
              <div className="relative size-14">
                {chestStage === 0 && (
                  <GiLockedChest className="text-amber-200 size-14 drop-shadow-glow animate-pulse-slow" />
                )}
                {chestStage === 1 && (
                  <div className="animate-chest-opening">
                    <GiLockedChest className="text-amber-200 size-14 drop-shadow-glow" />
                  </div>
                )}
                {chestStage === 2 && (
                  <GiOpenTreasureChest className="text-amber-200 size-14 drop-shadow-glow animate-float" />
                )}
              </div>
              <span className="text-white text-xs font-bold mt-1 text-center drop-shadow-md">
                RECIPE CHEST
              </span>
              
              {/* Sparkles around the chest when not opening */}
              {!isOpening && (
                <div className="absolute inset-0">
                  <div className="absolute top-0 left-1/4 size-1 bg-yellow-200 rounded-full animate-sparkle"></div>
                  <div className="absolute top-1/3 right-1/4 size-1 bg-yellow-200 rounded-full animate-sparkle" style={{ animationDelay: '0.5s' }}></div>
                  <div className="absolute bottom-1/4 left-1/5 size-1 bg-yellow-200 rounded-full animate-sparkle" style={{ animationDelay: '1s' }}></div>
                  <div className="absolute bottom-1/3 right-1/5 size-1 bg-yellow-200 rounded-full animate-sparkle" style={{ animationDelay: '1.5s' }}></div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Recipe Card */}
      {selectedRecipe && (
        <div 
          className={`
            absolute bottom-28 right-0 transition-all duration-700 ease-out
            ${showRecipe 
              ? 'opacity-100 translate-y-0 scale-100' 
              : 'opacity-0 translate-y-8 scale-95'
            }
          `}
        >
          <Card className="w-80 sm:w-96 bg-white shadow-2xl border-0 overflow-hidden rounded-xl">
            {/* Close button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                setShowRecipe(false);
                setTimeout(() => setSelectedRecipe(null), 300);
              }}
              className="absolute top-3 right-3 z-10 w-8 h-8 bg-black/30
                       hover:bg-black/50 rounded-full flex items-center justify-center text-white
                       transition-all duration-200 hover:scale-110"
            >
              <FiX />
            </button>

            {/* Recipe Image */}
            <div className="relative h-56 overflow-hidden">
              <div className="absolute inset-0 bg-black/20 z-10"></div>
              
              <img
                src={selectedRecipe.image}
                alt={selectedRecipe.title}
                className="w-full h-full object-cover transition-transform duration-10000 animate-slow-zoom"
              />
              
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent z-20" />
              
              {/* Animated treasure map icon as "discovery badge" */}
              <div className="absolute top-4 left-4 z-30 animate-fade-in-with-bounce">
                <div className="bg-amber-600/90 p-2 rounded-full shadow-glow">
                  <GiTreasureMap className="text-amber-100 size-5" />
                </div>
              </div>
              
              {/* Difficulty badge */}
              <div className="absolute top-4 left-16 z-30 animate-slide-in-left">
                <span className={`
                  px-3 py-1 rounded-full text-xs font-semibold text-white
                  ${selectedRecipe.difficulty === 'Easy' ? 'bg-emerald-500/90' :
                    selectedRecipe.difficulty === 'Medium' ? 'bg-amber-500/90' :
                    'bg-rose-500/90'
                  }
                  shadow-md
                `}>
                  {selectedRecipe.difficulty}
                </span>
              </div>

              {/* Category badge */}
              <div className="absolute top-4 right-14 z-30 animate-slide-in-right">
                <span className="bg-blue-600/90 text-white px-3 py-1 rounded-full text-xs font-semibold shadow-md">
                  {selectedRecipe.category}
                </span>
              </div>

              {/* Title overlay with animated reveal */}
              <div className="absolute bottom-0 left-0 right-0 p-5 z-30">
                <h3 className="text-2xl font-bold text-white leading-tight animate-title-reveal">
                  {selectedRecipe.title}
                </h3>
              </div>
              
              {/* Bookmark button */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setIsBookmarked(!isBookmarked);
                }}
                className="absolute top-4 right-4 z-30 w-8 h-8 
                         flex items-center justify-center
                         transition-all duration-300"
              >
                <FaBookmark 
                  className={`
                    transition-all duration-300
                    ${isBookmarked ? 'text-amber-400 size-5' : 'text-white/80 size-4'}
                  `}
                />
                
                {/* Animation when bookmarked */}
                {isBookmarked && (
                  <div className="absolute inset-0">
                    <div className="absolute inset-0 animate-bookmark-ping rounded-full bg-amber-400/30"></div>
                  </div>
                )}
              </button>
            </div>

            {/* Recipe Content with staggered animations */}
            <div className="p-6 bg-gradient-to-b from-amber-50/30 to-white">                
              <div className="overflow-hidden mb-4">
                <p className="text-gray-600 line-clamp-3 leading-relaxed animate-text-reveal">
                  {selectedRecipe.description}
                </p>
              </div>

              {/* Recipe Stats */}
              <div className="flex items-center justify-between text-sm text-gray-600 mb-5 animate-fade-in-delay">
                <div className="flex items-center gap-5">
                  <div className="flex items-center gap-1 bg-amber-50 py-1 px-2 rounded-md">
                    <FaClock className="text-amber-600" /> 
                    <span className="font-medium">{selectedRecipe.prepTime + selectedRecipe.cookTime} min</span>
                  </div>
                  <div className="flex items-center gap-1 bg-blue-50 py-1 px-2 rounded-md">
                    <FaUsers className="text-blue-600" /> 
                    <span className="font-medium">{selectedRecipe.servings}</span>
                  </div>
                </div>
              </div>

              {/* Action Button with hover effect */}
              <div className="animate-button-reveal">
                <button className="group w-full bg-gradient-to-r from-amber-500 to-orange-600 
                                 text-white py-3 px-4 rounded-lg font-medium shadow-lg
                                 hover:shadow-amber-300/50 overflow-hidden relative">
                  <div className="absolute inset-0 w-full h-full transition-all duration-300 ease-out transform 
                                translate-y-full bg-gradient-to-r from-amber-600 to-orange-700 
                                group-hover:translate-y-0"></div>
                  <div className="relative flex items-center justify-center gap-2">
                    <span>View Full Recipe</span>
                    <FaChevronRight size={14} className="transition-transform duration-300 group-hover:translate-x-1" />
                  </div>
                </button>
              </div>
            </div>
          </Card>
        </div>
      )}

      {/* CSS Animations */}
      <style jsx>{`
        @keyframes rays {
          0%, 100% { opacity: 0.5; }
          50% { opacity: 1; }
        }
        
        @keyframes chest-opening {
          0% { transform: scaleY(1); }
          50% { transform: scaleY(0.8); }
          100% { transform: scaleY(1); }
        }
        
        @keyframes bounce-once {
          0% { transform: translateY(0); }
          50% { transform: translateY(-20px); }
          100% { transform: translateY(0); }
        }
        
        @keyframes sparkle {
          0%, 100% { opacity: 0; transform: scale(0); }
          50% { opacity: 1; transform: scale(1.5); }
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-5px); }
        }
        
        @keyframes slow-zoom {
          0% { transform: scale(1); }
          100% { transform: scale(1.1); }
        }
        
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes title-reveal {
          0% { 
            opacity: 0;
            transform: translateY(20px);
          }
          100% { 
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes text-reveal {
          0% { 
            opacity: 0;
            transform: translateY(20px);
          }
          100% { 
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes fade-in-with-bounce {
          0% { 
            opacity: 0;
            transform: scale(0.5);
          }
          70% {
            transform: scale(1.2);
          }
          100% { 
            opacity: 1;
            transform: scale(1);
          }
        }
        
        @keyframes slide-in-left {
          from { 
            opacity: 0;
            transform: translateX(-20px);
          }
          to { 
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        @keyframes slide-in-right {
          from { 
            opacity: 0;
            transform: translateX(20px);
          }
          to { 
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        @keyframes bookmark-ping {
          0% {
            transform: scale(0.8);
            opacity: 1;
          }
          80%, 100% {
            transform: scale(2.5);
            opacity: 0;
          }
        }
        
        @keyframes button-reveal {
          0% { 
            opacity: 0;
            transform: translateY(20px);
          }
          100% { 
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fade-in {
          animation: fade-in 0.5s forwards;
        }
        
        .animate-pulse-slow {
          animation: pulse 2s infinite;
        }
        
        .animate-title-reveal {
          animation: title-reveal 0.8s forwards;
          animation-delay: 0.4s;
          opacity: 0;
        }
        
        .animate-text-reveal {
          animation: text-reveal 0.8s forwards;
          animation-delay: 0.6s;
          opacity: 0;
        }
        
        .animate-fade-in-delay {
          animation: fade-in 0.8s forwards;
          animation-delay: 0.8s;
          opacity: 0;
        }
        
        .animate-fade-in-with-bounce {
          animation: fade-in-with-bounce 0.8s forwards;
          animation-delay: 0.2s;
          opacity: 0;
        }
        
        .animate-slide-in-left {
          animation: slide-in-left 0.6s forwards;
          animation-delay: 0.3s;
          opacity: 0;
        }
        
        .animate-slide-in-right {
          animation: slide-in-right 0.6s forwards;
          animation-delay: 0.4s;
          opacity: 0;
        }
        
        .animate-bookmark-ping {
          animation: bookmark-ping 0.8s cubic-bezier(0, 0, 0.2, 1);
        }
        
        .animate-button-reveal {
          animation: button-reveal 0.8s forwards;
          animation-delay: 1s;
          opacity: 0;
        }
        
        .animate-slow-zoom {
          animation: slow-zoom 15s forwards linear;
        }
        
        .animate-rays {
          animation: rays 2s infinite;
        }
        
        .shadow-glow {
          box-shadow: 0 0 15px rgba(251, 191, 36, 0.6);
        }
        
        .drop-shadow-glow {
          filter: drop-shadow(0 0 5px rgba(251, 191, 36, 0.6));
        }
      `}</style>
    </div>
  );
};

export default RandomRecipeBox;