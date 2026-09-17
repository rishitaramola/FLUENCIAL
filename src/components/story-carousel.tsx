'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import type { SuccessStory } from '@/lib/data/testimonials'
import { StoryCard } from './story-card'

interface StoryCarouselProps {
  stories: SuccessStory[]
}

export function StoryCarousel({ stories }: StoryCarouselProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const [playingVideoId, setPlayingVideoId] = useState<string | null>(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)

  // Intersection observer to track active index
  useEffect(() => {
    const container = scrollContainerRef.current
    if (!container) return

    const handleScroll = () => {
      const scrollLeft = container.scrollLeft
      const scrollWidth = container.scrollWidth
      const clientWidth = container.clientWidth
      
      setCanScrollLeft(scrollLeft > 0)
      setCanScrollRight(Math.ceil(scrollLeft + clientWidth) < scrollWidth)
    }

    container.addEventListener('scroll', handleScroll, { passive: true })
    // Initial check
    handleScroll()

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio >= 0.5) {
            const index = Number(entry.target.getAttribute('data-index'))
            setActiveIndex(index)
            // Stop playing video when a new card becomes active
            if (playingVideoId !== null) {
              setPlayingVideoId(null)
            }
          }
        })
      },
      {
        root: container,
        threshold: 0.5,
      }
    )

    const cards = container.querySelectorAll('.story-card-wrapper')
    cards.forEach((card) => observer.observe(card))

    return () => {
      container.removeEventListener('scroll', handleScroll)
      observer.disconnect()
    }
  }, [playingVideoId])

  const scrollToIndex = useCallback((index: number) => {
    const container = scrollContainerRef.current
    if (!container) return
    
    const cards = container.querySelectorAll('.story-card-wrapper')
    const targetCard = cards[index] as HTMLElement
    
    if (targetCard) {
      // Calculate scroll position to center the card
      const containerCenter = container.clientWidth / 2
      const cardCenter = targetCard.offsetLeft + (targetCard.clientWidth / 2)
      const scrollPosition = cardCenter - containerCenter
      
      container.scrollTo({
        left: scrollPosition,
        behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth'
      })
      
      setActiveIndex(index)
      setPlayingVideoId(null)
    }
  }, [])

  const scrollPrev = () => {
    if (activeIndex > 0) {
      scrollToIndex(activeIndex - 1)
    }
  }

  const scrollNext = () => {
    if (activeIndex < stories.length - 1) {
      scrollToIndex(activeIndex + 1)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft') {
      e.preventDefault()
      scrollPrev()
    } else if (e.key === 'ArrowRight') {
      e.preventDefault()
      scrollNext()
    }
  }

  if (!stories || stories.length === 0) return null

  return (
    <div 
      className="relative w-full py-8 focus:outline-none" 
      tabIndex={0} 
      onKeyDown={handleKeyDown}
      aria-roledescription="carousel"
    >
      {/* Desktop Navigation Arrows */}
      <div className="pointer-events-none absolute inset-0 hidden items-center justify-between px-4 sm:flex lg:px-8">
        <button
          onClick={scrollPrev}
          disabled={!canScrollLeft}
          className="pointer-events-auto z-10 flex h-12 w-12 items-center justify-center rounded-full bg-white/90 text-slate-900 shadow-lg backdrop-blur transition-transform hover:scale-110 disabled:opacity-0"
          aria-label="Previous story"
        >
          <ChevronLeft className="h-6 w-6" />
        </button>
        <button
          onClick={scrollNext}
          disabled={!canScrollRight}
          className="pointer-events-auto z-10 flex h-12 w-12 items-center justify-center rounded-full bg-white/90 text-slate-900 shadow-lg backdrop-blur transition-transform hover:scale-110 disabled:opacity-0"
          aria-label="Next story"
        >
          <ChevronRight className="h-6 w-6" />
        </button>
      </div>

      {/* Scrollable Container */}
      <div 
        ref={scrollContainerRef}
        className="flex snap-x snap-mandatory overflow-x-auto px-4 pb-8 pt-4 sm:px-8 lg:px-12"
        style={{ 
          scrollbarWidth: 'none', 
          msOverflowStyle: 'none',
          WebkitOverflowScrolling: 'touch',
          willChange: 'scroll-position'
        }}
      >
        <style dangerouslySetInnerHTML={{ __html: `
          .story-carousel-container::-webkit-scrollbar {
            display: none;
          }
        `}} />
        
        {/* Empty space for starting alignment */}
        <div className="shrink-0 w-[5vw] sm:w-[calc(50%-240px)]" />

        {stories.map((story, idx) => (
          <div 
            key={story.id || idx}
            data-index={idx}
            className="story-card-wrapper shrink-0 snap-center px-3"
            style={{ width: 'clamp(280px, 85vw, 480px)' }}
          >
            <StoryCard 
              story={story} 
              isActive={playingVideoId === story.video_url}
              onPlay={() => setPlayingVideoId(story.video_url)}
            />
          </div>
        ))}
        
        {/* Empty space for ending alignment */}
        <div className="shrink-0 w-[5vw] sm:w-[calc(50%-240px)]" />
      </div>

      {/* Pagination Dots */}
      <div className="mt-2 flex items-center justify-center gap-2">
        {stories.map((_, idx) => (
          <button
            key={idx}
            onClick={() => scrollToIndex(idx)}
            className={`h-2.5 rounded-full transition-all ${
              idx === activeIndex 
                ? 'w-8 bg-slate-900' 
                : 'w-2.5 bg-slate-900/20 hover:bg-slate-900/40'
            }`}
            aria-label={`Go to slide ${idx + 1}`}
            aria-current={idx === activeIndex}
          />
        ))}
      </div>
    </div>
  )
}
