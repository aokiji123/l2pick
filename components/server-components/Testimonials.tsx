"use client";
import React, { useState } from "react";
import Titlemini from "./TitleMini";
import { renderStars } from "../elements/RenderStars";
import { MdOutlineAccessTime } from "react-icons/md";
import { ProjectDetail, ProjectReview } from "@/lib/types/project";
import {
  useReviewsForProject,
  useCreateReview,
} from "@/lib/queries/useReviews";
import { useQueryClient } from "@tanstack/react-query";
import { useTranslation } from "@/contexts/LanguageContext";

type TestimonialsProps = {
  project: ProjectDetail;
};

const TestimonialCard = ({ testimonial }: { testimonial: ProjectReview }) => {
  const { t, currentLanguage } = useTranslation();
  const locale = currentLanguage === "RU" ? "ru-RU" : "en-US";
  const formattedDate = new Date(testimonial.created_at).toLocaleDateString(
    locale,
  );

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-xl">
      <div className="flex justify-between items-start mb-3">
        <h4 className="font-extrabold text-brand-primary-3 dark:text-white text-sm">
          {testimonial.user.name}
        </h4>
        <div className="flex items-center gap-2">
          <span className="text-xs font-medium text-[#a0a6b5] dark:text-gray-400">
            {t("testimonials_rating")}
          </span>
          <div className="flex">
            {renderStars({
              rating: testimonial.rating,
              filledColor: "text-yellow-400",
              halfColor: "text-yellow-400",
              emptyColor: "text-gray-300",
              size: "size-5",
            })}
          </div>
        </div>
      </div>
      <p className="text-sm text-brand-primary-3 dark:text-white font-medium mb-3 leading-4">
        {testimonial.comment}
      </p>
      <div className="flex items-center gap-0.5 text-xs text-[#a0a6b5] font-medium dark:text-gray-400">
        <MdOutlineAccessTime />
        {formattedDate}
      </div>
    </div>
  );
};

const ReviewForm = ({ projectId }: { projectId: number }) => {
  const { t } = useTranslation();
  const [reviewText, setReviewText] = useState("");
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const queryClient = useQueryClient();
  const createReviewMutation = useCreateReview();

  const maxCharacters = 900;
  const currentCharacters = reviewText.length;

  const handleStarClick = (starRating: number) => {
    setRating(starRating);
  };

  const handleStarHover = (starRating: number) => {
    setHoveredRating(starRating);
  };

  const handleSubmit = async () => {
    if (rating === 0) {
      alert(t("testimonials_rate_server_alert"));
      return;
    }
    if (reviewText.trim().length < 10) {
      alert(t("testimonials_write_review_alert"));
      return;
    }

    setIsSubmitting(true);
    try {
      await createReviewMutation.mutateAsync({
        projectId,
        rating,
        comment: reviewText.trim(),
      });
      // Reset form
      setRating(0);
      setReviewText("");
      // Invalidate and refetch reviews
      await queryClient.invalidateQueries({ queryKey: ["reviews", projectId] });
      alert(t("testimonials_thank_you"));
    } catch (error) {
      console.error("Error creating review:", error);
      alert(t("testimonials_error"));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-4 mt-6 flex flex-col h-full">
      {/* Text Input Area */}
      <div className="relative ">
        <textarea
          value={reviewText}
          onChange={(e) => setReviewText(e.target.value)}
          placeholder={t("testimonials_placeholder")}
          rows={10}
          className={`w-full min-h-13 lg:min-h-96 h-full p-4 rounded-xl border scroll-style border-[#d7dfe4] dark:border-[#21252f] bg-brand-gray-3 dark:bg-brand-dark text-xs text-brand-primary dark:text-white font-medium placeholder:text-brand-secondary outline-none dark:placeholder:text-[#535967]`}
          maxLength={maxCharacters}
        />
        {/* Character Counter */}
        <div className="absolute bottom-4 right-3 text-xs text-[#b0b8c6] dark:text-[#30353f] font-medium">
          {currentCharacters}/{maxCharacters} {t("testimonials_characters")}
        </div>
      </div>

      {/* Submit Button */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between">
        <div className="flex items-center gap-3">
          <span className="text-sm font-medium text-[#a0a6b5] dark:text-[#646979]">
            {t("testimonials_rate_server")}
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
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    className={
                      hoveredRating >= star || rating >= star
                        ? "text-[#f5be39]"
                        : "text-[#a0a6b5] dark:text-[#2e323d]"
                    }
                    d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                  />
                </svg>
              </button>
            ))}
          </div>
        </div>
        <button
          onClick={handleSubmit}
          disabled={isSubmitting}
          className="bg-brand-btn hover:bg-brand-btn/90 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold py-3 px-6 rounded-lg transition-colors duration-200 uppercase text-sm"
        >
          {isSubmitting ? t("testimonials_submitting") : t("testimonials_submit_review")}
        </button>
      </div>
    </div>
  );
};

const Testimonials = ({ project }: TestimonialsProps) => {
  const { t } = useTranslation();
  const { data: reviewsData } = useReviewsForProject(project.id);

  const testimonials: ProjectReview[] = (reviewsData?.data ||
    project.reviews ||
    []) as ProjectReview[];
  const filteredTestimonials = testimonials.filter(
    (review) => review.status === "approved",
  );

  const reviewsCount = filteredTestimonials.length;

  return (
    <div className="grid items-stretch lg:grid-cols-2">
      <div className="order-2 lg:order-1 h-full border-t lg:border-t-0 lg:border-r border-brand-gray dark:border-[#1f222c] py-6 pr-3">
        <h3
          className={`text-brand-primary-3 dark:text-white font-extrabold leading-4 mb-4 pl-3 lg:pl-7`}
        >
          {t("testimonials_total_reviews")} <span className="text-brand-btn">{reviewsCount}</span> {t("testimonials_reviews_count")}
        </h3>
        <div className="flex flex-col gap-3 scroll-style max-h-[442px] overflow-y-auto pr-3 pl-3 lg:pl-7 pb-4">
          {filteredTestimonials.length > 0 ? (
            filteredTestimonials.map((testimonial: ProjectReview) => (
              <TestimonialCard key={testimonial.id} testimonial={testimonial} />
            ))
          ) : (
            <div className="text-center text-brand-primary-3 dark:text-white py-8">
              {t("testimonials_no_reviews")}
            </div>
          )}
        </div>
      </div>
      <div className="order-1 py-6 px-3 lg:px-7">
        <Titlemini title={t("testimonials_leave_review")} />
        <ReviewForm projectId={project.id} />
      </div>
    </div>
  );
};

export default Testimonials;
