"use client"
import Image from "next/image"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel"

const images = [
  "/slide-1.jpg",
  "https://picsum.photos/id/250/200/300",
  "https://picsum.photos/id/236/200/300"
]

export default function ImageCarousel() {
  return (
    <div className="relative w-full max-w-4xl mx-auto overflow-hidden rounded-2xl">
      <Carousel className="w-full">
        <CarouselContent>
          {images.map((src, index) => (
            <CarouselItem key={index}>
              <div className="relative h-[266px]">
                <Image
                  src={src}
                  alt={`Slide ${index + 1}`}
                  fill
                  className="object-cover"
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        <CarouselPrevious
          variant="secondary"
          className="top-1/2 left-4 -translate-y-1/2 size-12 rounded-full bg-brand-primary hover:bg-brand-btn cursor-pointer [&_svg]:size-6 [&_svg]:text-white"
        />
        <CarouselNext
          variant="secondary"
          className="top-1/2 right-4 -translate-y-1/2 size-12 rounded-full bg-brand-primary hover:bg-brand-btn cursor-pointer [&_svg]:size-6 [&_svg]:text-white"
        />
      </Carousel>
    </div>
  )
}
