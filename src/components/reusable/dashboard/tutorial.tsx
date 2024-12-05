'use client'

import tutorialBg from '@/assets/images/common/dashboard/tutorial-bg.png'
import digitalCeoScreenshot from '@/assets/images/common/dashboard/digitalceo_screenshot.jpg'
import { Button } from '@/components/ui/button'
import { Img } from '@/components/ui/img'
import Typography from '@/components/ui/typography'
import { cn } from '@/lib/utils'
import { useState, useEffect, useCallback } from 'react'
import { ArrowLeft, ArrowRight } from 'lucide-react'

interface Props {
  className?: string
}

const slides = [
  {
    id: 1,
    imgSrc: 'https://argobot-bucket.s3.us-east-2.amazonaws.com/pm-pal.png',
    title: 'SYNC NOW',
    description: 'You can train your bot through Google Drive directly',
    link: 'https://pm-pal-frontend.vercel.app',
  },
  {
    id: 2,
    imgSrc: digitalCeoScreenshot.src,
    title: 'RESEARCH TOOL',
    description: 'Use Google, scraper, and your knowledge base in an Argobots chat',
    link: 'https://r3.argobots.chat/',
  },
]

export default function Tutorial({ className }: Props) {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [fade, setFade] = useState(true)
  const [resetTimer, setResetTimer] = useState(0)

  const changeSlide = useCallback((direction: 'next' | 'prev') => {
    setFade(false) // Trigger fade-out
    setTimeout(() => {
      setCurrentSlide((prevSlide) => {
        if (direction === 'next') {
          return (prevSlide + 1) % slides.length
        } else {
          return (prevSlide - 1 + slides.length) % slides.length
        }
      })
      setFade(true) // Trigger fade-in after slide change
    }, 300)
    setResetTimer((prev) => prev + 1) // Increment to trigger useEffect and reset timer
  }, [])

  const handleNext = useCallback(() => {
    changeSlide('next')
  }, [changeSlide])

  const handlePrev = useCallback(() => {
    changeSlide('prev')
  }, [changeSlide])

  // Set up auto-slide every 7 seconds
  useEffect(() => {
    const slideInterval = setInterval(() => changeSlide('next'), 7000)
    return () => clearInterval(slideInterval) // Clear interval on component unmount
  }, [changeSlide, resetTimer]) // Add resetTimer to dependencies

  return (
    <div className='relative'>
      <section
        className={cn(
          'bg-cover bg-center bg-no-repeat p-2 min-[400px]:p-4 sm:p-6 rounded-[10px] shadow-sm flex flex-col min-[900px]:flex-row lg:flex-col min-[1200px]:flex-row items-center justify-between gap-x-10 gap-y-12 transition-opacity duration-500',
          fade ? 'opacity-100' : 'opacity-0',
          className
        )}
        style={{ backgroundImage: `url(${tutorialBg.src})`, height: '300px' }}
      >
        <Img
          src={slides[currentSlide].imgSrc}
          alt='tutorial'
          className='w-full min-[900px]:w-1/2 lg:w-full min-[1200px]:w-1/2 rounded-md h-full object-cover'
        />
        <div className='w-full min-[900px]:w-1/2 lg:w-full min-[1200px]:w-1/2 flex flex-col items-center justify-center gap-y-4 pt-10 min-[900px]:pt-0 lg:pt-10 min-[1200px]:pt-0 h-full'>
          <Typography variant='h1' className='text-white font-bold'>
            {slides[currentSlide].title}
          </Typography>
          <p className='text-lg font-normal text-white text-center'>
            {slides[currentSlide].description}
          </p>
          <Button
            variant='unstyled'
            className='bg-orange-dark text-white px-8'
            onClick={() => window.open(slides[currentSlide].link, '_blank')}
          >
            Go
          </Button>
        </div>

        {/* Slider Navigation Buttons */}
        <button
          onClick={handlePrev}
          className='absolute bottom-2 right-16 transform -translate-y-1/2 bg-gray-300 text-black p-2 rounded-full'
        >
          <ArrowLeft />
        </button>
        <button
          onClick={handleNext}
          className='absolute bottom-2 right-4 transform -translate-y-1/2 bg-gray-300 text-black p-2 rounded-full'
        >
          <ArrowRight />
        </button>
      </section>
    </div>
  )
}

