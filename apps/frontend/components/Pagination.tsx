import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, MoreHorizontal, ChevronsLeft, ChevronsRight } from "lucide-react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 640);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  if (totalPages <= 1) return null;

  // Generate visible page numbers with ellipsis logic
  const getVisiblePages = () => {
    const delta = isMobile ? 1 : 2; // Fewer pages on mobile
    const range = [];
    const rangeWithDots = [];

    for (let i = Math.max(2, currentPage - delta); i <= Math.min(totalPages - 1, currentPage + delta); i++) {
      range.push(i);
    }

    if (currentPage - delta > 2) {
      rangeWithDots.push(1, '...');
    } else {
      rangeWithDots.push(1);
    }

    rangeWithDots.push(...range);

    if (currentPage + delta < totalPages - 1) {
      rangeWithDots.push('...', totalPages);
    } else if (totalPages > 1) {
      rangeWithDots.push(totalPages);
    }

    return rangeWithDots.filter((page, index, arr) => arr.indexOf(page) === index);
  };

  const visiblePages = getVisiblePages();

  return (
    <nav className="flex flex-col items-center justify-center mt-12 mb-8 px-4" aria-label="Pagination">
      {/* Main Pagination */}
      <div className="flex items-center gap-1 bg-white rounded-xl shadow-lg border border-gray-200 p-1.5 backdrop-blur-sm">
        {/* First Page Button (Desktop only) */}
        {totalPages > 7 && currentPage > 4 && (
          <button
            className="hidden md:flex items-center justify-center w-9 h-9 rounded-lg text-gray-600 hover:text-orange-600 hover:bg-orange-50 transition-all duration-200 hover:scale-105 active:scale-95"
            onClick={() => onPageChange(1)}
            aria-label="Go to first page"
          >
            <ChevronsLeft size={16} />
          </button>
        )}

        {/* Previous Button */}
        <button
          className={`
            flex items-center gap-1.5 px-3 py-2 rounded-lg font-medium text-sm transition-all duration-200 transform
            ${currentPage === 1 
              ? 'text-gray-400 cursor-not-allowed opacity-50' 
              : 'text-gray-700 hover:text-orange-600 hover:bg-orange-50 hover:scale-105 active:scale-95 hover:shadow-md'
            }
          `}
          disabled={currentPage === 1}
          onClick={() => onPageChange(currentPage - 1)}
          aria-label="Go to previous page"
        >
          <ChevronLeft size={16} />
          <span className="hidden sm:inline">Prev</span>
        </button>

        {/* Page Numbers */}
        <div className="flex items-center gap-1 px-1">
          {visiblePages.map((page, index) => {
            if (page === '...') {
              return (
                <div
                  key={`ellipsis-${index}`}
                  className="flex items-center justify-center w-9 h-9 text-gray-400"
                >
                  <MoreHorizontal size={16} />
                </div>
              );
            }

            const pageNumber = page as number;
            const isCurrentPage = pageNumber === currentPage;

            return (
              <button
                key={pageNumber}
                className={`
                  relative w-9 h-9 rounded-lg font-semibold text-sm transition-all duration-300 transform
                  ${isCurrentPage
                    ? 'bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-lg shadow-orange-500/30 scale-110 ring-2 ring-orange-200' 
                    : 'text-gray-700 hover:text-orange-600 hover:bg-gradient-to-r hover:from-orange-50 hover:to-orange-100 hover:scale-105 active:scale-95 hover:shadow-md'
                  }
                `}
                onClick={() => onPageChange(pageNumber)}
                aria-label={`Go to page ${pageNumber}`}
                aria-current={isCurrentPage ? 'page' : undefined}
              >
                {pageNumber}
                {isCurrentPage && (
                  <>
                    <div className="absolute inset-0 rounded-lg bg-white opacity-20 animate-pulse" />
                    <div className="absolute -inset-1 rounded-lg bg-gradient-to-r from-orange-400 to-orange-600 opacity-30 blur-sm" />
                  </>
                )}
              </button>
            );
          })}
        </div>

        {/* Next Button */}
        <button
          className={`
            flex items-center gap-1.5 px-3 py-2 rounded-lg font-medium text-sm transition-all duration-200 transform
            ${currentPage === totalPages 
              ? 'text-gray-400 cursor-not-allowed opacity-50' 
              : 'text-gray-700 hover:text-orange-600 hover:bg-orange-50 hover:scale-105 active:scale-95 hover:shadow-md'
            }
          `}
          disabled={currentPage === totalPages}
          onClick={() => onPageChange(currentPage + 1)}
          aria-label="Go to next page"
        >
          <span className="hidden sm:inline">Next</span>
          <ChevronRight size={16} />
        </button>

        {/* Last Page Button (Desktop only) */}
        {totalPages > 7 && currentPage < totalPages - 3 && (
          <button
            className="hidden md:flex items-center justify-center w-9 h-9 rounded-lg text-gray-600 hover:text-orange-600 hover:bg-orange-50 transition-all duration-200 hover:scale-105 active:scale-95"
            onClick={() => onPageChange(totalPages)}
            aria-label="Go to last page"
          >
            <ChevronsRight size={16} />
          </button>
        )}
      </div>

      {/* Page Info & Quick Jump (Desktop) */}
      <div className="mt-4 flex items-center gap-6">
        {/* Page Counter */}
        <div className="text-sm text-gray-600 bg-gray-50 px-3 py-1.5 rounded-full border">
          <span className="font-medium text-gray-800">{currentPage}</span>
          <span className="mx-1 text-gray-400">/</span>
          <span className="font-medium text-gray-800">{totalPages}</span>
          <span className="ml-1 text-gray-500">pages</span>
        </div>

        {/* Quick Jump (Desktop only) */}
        {totalPages > 10 && (
          <div className="hidden lg:flex items-center gap-2">
            <label htmlFor="page-jump" className="text-sm text-gray-600">
              Jump to:
            </label>
            <input
              id="page-jump"
              type="number"
              min="1"
              max={totalPages}
              className="w-16 px-2 py-1 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  const value = parseInt((e.target as HTMLInputElement).value);
                  if (value >= 1 && value <= totalPages && value !== currentPage) {
                    onPageChange(value);
                    (e.target as HTMLInputElement).value = '';
                  }
                }
              }}
              placeholder={currentPage.toString()}
            />
          </div>
        )}
      </div>

      {/* Mobile Simple Navigation */}
      <div className="md:hidden mt-3 flex items-center justify-between w-full max-w-xs">
        <button
          className={`
            flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-sm transition-all duration-200
            ${currentPage === 1 
              ? 'text-gray-400 cursor-not-allowed' 
              : 'text-white bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 shadow-lg active:scale-95'
            }
          `}
          disabled={currentPage === 1}
          onClick={() => onPageChange(1)}
        >
          <ChevronsLeft size={16} />
          First
        </button>

        <button
          className={`
            flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-sm transition-all duration-200
            ${currentPage === totalPages 
              ? 'text-gray-400 cursor-not-allowed' 
              : 'text-white bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 shadow-lg active:scale-95'
            }
          `}
          disabled={currentPage === totalPages}
          onClick={() => onPageChange(totalPages)}
        >
          Last
          <ChevronsRight size={16} />
        </button>
      </div>
    </nav>
  );
};
