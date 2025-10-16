import React, { useState } from 'react'
import Titlemini from './TitleMini'
import { renderStars } from '../elements/RenderStars'
import { MdOutlineAccessTime } from 'react-icons/md'

// Mock data for testimonials
const mockTestimonials = [
  {
    id: 1,
    name: "James Corsa",
    rating: 3.5,
    text: "С учётом сложивш 1964 международной обстановки, высококачественный прототип будущего проекта, а также свежий взгляд на привычные вещи — безусловно открывает новые горизонты системы обучения кадров.",
    date: "25.07.2015"
  },
  {
    id: 2,
    name: "Maria Petrova",
    rating: 4.2,
    text: "Отличный сервер с высоким уровнем стабильности. Администрация всегда на связи и быстро решает возникающие проблемы. Рекомендую всем игрокам, которые ценят качество.",
    date: "18.11.2023"
  },
  {
    id: 3,
    name: "Alex Thompson",
    rating: 5.0,
    text: "Лучший сервер, на котором я когда-либо играл! Отличная экономика, сбалансированный геймплей и дружелюбное сообщество. Огромное спасибо команде разработчиков.",
    date: "03.09.2023"
  },
  {
    id: 4,
    name: "Elena Smirnova",
    rating: 3.8,
    text: "Хороший сервер, но есть небольшие проблемы с лагами в вечернее время. В целом довольна игровым процессом и системой наград.",
    date: "12.08.2023"
  },
  {
    id: 5,
    name: "Dmitry Volkov",
    rating: 4.7,
    text: "Потрясающий сервер! Отличная производительность, интересные события и активная администрация. Играть здесь одно удовольствие.",
    date: "29.06.2023"
  },
  {
    id: 6,
    name: "Anna Kozlova",
    rating: 4.0,
    text: "Сервер оправдал все мои ожидания. Стабильная работа, интересные квесты и хорошая система прокачки персонажа.",
    date: "15.05.2023"
  }
]

const TestimonialCard = ({ testimonial }: { testimonial: typeof mockTestimonials[0] }) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-xl">
      <div className="flex justify-between items-start mb-3">
        <h4 className="font-extrabold text-brand-primary-3 dark:text-white text-sm">
          {testimonial.name}
        </h4>
        <div className="flex items-center gap-2">
          <span className="text-xs font-medium text-[#a0a6b5] dark:text-gray-400">Оценка:</span>
          <div className="flex">
            {renderStars({ 
              rating: testimonial.rating,
              filledColor: "text-yellow-400",
              halfColor: "text-yellow-400", 
              emptyColor: "text-gray-300",
              size: "size-5"
            })}
          </div>
        </div>
      </div>
      <p className="text-sm text-brand-primary-3 dark:text-white font-medium mb-3 leading-4">
        {testimonial.text}
      </p>
      <div className="flex items-center gap-0.5 text-xs text-[#a0a6b5] font-medium dark:text-gray-400">
        <MdOutlineAccessTime />
        {testimonial.date}
      </div>
    </div>
  )
}

const ReviewForm = () => {
  const [reviewText, setReviewText] = useState('')
  const [rating, setRating] = useState(0)
  const [hoveredRating, setHoveredRating] = useState(0)
  
  const maxCharacters = 900
  const currentCharacters = reviewText.length

  const handleStarClick = (starRating: number) => {
    setRating(starRating)
  }

  const handleStarHover = (starRating: number) => {
    setHoveredRating(starRating)
  }

  const handleSubmit = () => {
    if (rating === 0) {
      alert('Пожалуйста, поставьте оценку серверу')
      return
    }
    if (reviewText.trim().length < 10) {
      alert('Пожалуйста, напишите отзыв (минимум 10 символов)')
      return
    }
    // Reset form
    setRating(0)
    setReviewText('')
    alert('Спасибо за ваш отзыв!')
  }

  return (
    <div className="space-y-4 mt-6 flex flex-col h-full">
      {/* Text Input Area */}
      <div className="relative ">
        <textarea
          value={reviewText}
          onChange={(e) => setReviewText(e.target.value)}
          placeholder="Напишите свой отзыв"
          rows={10}
          className={`w-full lg:min-h-96 h-full p-4 rounded-xl border scroll-style border-[#d7dfe4] dark:border-[#21252f] bg-brand-gray-3 dark:bg-brand-dark text-xs text-brand-primary dark:text-white font-medium placeholder:text-brand-secondary outline-none dark:placeholder:text-[#535967]`}
          maxLength={maxCharacters}
        />
        {/* Character Counter */}
        <div className="absolute bottom-4 right-3 text-xs text-[#b0b8c6] dark:text-[#30353f] font-medium">
          {currentCharacters}/{maxCharacters} Символов
        </div>
      </div>

      {/* Submit Button */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between">
        <div className="flex items-center gap-3">
          <span className="text-sm font-medium text-[#a0a6b5] dark:text-[#646979]">
            Оцените сервер:
          </span>
          <div className="flex items-center gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                onClick={() => handleStarClick(star)}
                onMouseEnter={() => handleStarHover(star)}
                onMouseLeave={() => setHoveredRating(0)}
                className="transition-colors duration-200"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                  <path 
                    className={hoveredRating >= star || rating >= star ? "text-[#f5be39]" : "text-[#a0a6b5] dark:text-[#2e323d]"}
                    d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" 
                  />
                </svg>
              </button>
            ))}
          </div>
        </div>
        <button
          onClick={handleSubmit}
          className="bg-brand-btn hover:bg-brand-btn/90 text-white font-bold py-3 px-6 rounded-lg transition-colors duration-200 uppercase text-sm"
        >
          ОТПРАВИТЬ ОТЗЫВ
        </button>
      </div>
    </div>
  )
}

const Testimonials = () => {
  return (
    <div className='grid items-stretch lg:grid-cols-2'>
      <div className='order-2 lg:order-1 h-full border-t lg:border-t-0 lg:border-r border-brand-gray dark:border-[#1f222c] py-6 pr-3'>
        <h3 className={`text-brand-primary-3 dark:text-white font-extrabold leading-4 mb-4 pl-3 lg:pl-7`}>
          Всего <span className='text-brand-btn'>590</span> отзывов
        </h3>
        <div className='flex flex-col gap-3 scroll-style max-h-[442px] overflow-y-auto pr-3 pl-3 lg:pl-7 pb-4'>
          {mockTestimonials.map((testimonial) => (
            <TestimonialCard key={testimonial.id} testimonial={testimonial} />
          ))}
        </div>
      </div>
      <div className='order-1 py-6 px-3 lg:px-7'>
        <Titlemini title="Оставьте свой отзыв" />
        <ReviewForm />
      </div>
    </div>
  )
}

export default Testimonials