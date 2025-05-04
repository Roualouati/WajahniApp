"use client";

import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useEffect, useState } from "react";
import { getSubjectsByBacType } from "../(screen)/competence-test/utils/subject";
import React from "react";

interface SubjectListProps {
  bacType: string;
  onDataChange?: (scores: Record<string, number>, comments: Record<string, string>, option: string, generalAverage?: number, allComplete?: boolean) => void;
}

export default function SubjectList({ bacType, onDataChange }: SubjectListProps) {
  const subjects = getSubjectsByBacType(bacType);
  const [scores, setScores] = useState<Record<string, number>>({});
  const [comments, setComments] = useState<Record<string, string>>({});
  const [selectedOption, setSelectedOption] = useState<string>("");
  const [generalAverage, setGeneralAverage] = useState<number | null>(null);
  const [api, setApi] = useState<any>(null);
  const [currentSlide, setCurrentSlide] = useState(0);

  // Check if all required fields are complete
  const isAllComplete = () => {
    // Check general average
    if (generalAverage === null) return false;
    
    // Check all subjects have scores
    const allSubjectsComplete = subjects.every(subject => 
      scores[subject.field] !== undefined
    );
    if (!allSubjectsComplete) return false;
    
    // Check optional subject is complete
    return selectedOption !== "" && scores["noteOptions"] !== undefined;
  };
  

  useEffect(() => {
    if (onDataChange) {
      onDataChange(scores, comments, selectedOption, generalAverage || undefined, isAllComplete());
    }
  }, [scores, comments, selectedOption, generalAverage]);

  // Check if current slide is complete
  const isCurrentSlideComplete = () => {
    if (currentSlide === 0) {
      return generalAverage !== null;
    } else if (currentSlide <= subjects.length) {
      const subject = subjects[currentSlide - 1];
      return scores[subject.field] !== undefined;
    } else {
      return selectedOption !== "" && scores["noteOptions"] !== undefined;
    }
  };

  const handleScoreChange = (subjectField: string, value: string) => {
    const numValue = parseFloat(value);
    
    if (!isNaN(numValue)) {
      const clampedValue = Math.min(20, Math.max(0, numValue));
      setScores(prev => ({ ...prev, [subjectField]: clampedValue }));
    } else if (value === '') {
      setScores(prev => ({ ...prev, [subjectField]: 0 }));
    }
  };

  const handleCommentChange = (subjectField: string, value: string) => {
    setComments(prev => ({ ...prev, [subjectField]: value }));
  };

  const handleOptionChange = (value: string) => {
    setSelectedOption(value);
  };

  const handleGeneralAverageChange = (value: string) => {
    const numValue = parseFloat(value);
    if (!isNaN(numValue)) {
      const clampedValue = Math.min(20, Math.max(0, numValue));
      setGeneralAverage(clampedValue);
    } else if (value === '') {
      setGeneralAverage(null);
    }
  };

  const handleNext = () => {
    if (isCurrentSlideComplete() && api) {
      api.scrollNext();
    }
  };

  const handlePrev = () => {
    if (api) {
      api.scrollPrev();
    }
  };

  useEffect(() => {
    if (!api) return;

    api.on("select", () => {
      setCurrentSlide(api.selectedScrollSnap());
    });
  }, [api]);

  const optionalSubjects = [
    { value: "CHINESE", label: "Chinese" },
    { value: "SPANISH", label: "Spanish" },
    { value: "GERMAN", label: "German" },
    { value: "DRAWING", label: "Drawing" },
    { value: "RUSSIAN", label: "Russian" },
    { value: "MUSIC", label: "Music" },
    { value: "ITALIAN", label: "Italian" },
    { value: "SCIENCE", label: "Science" }
  ];

  const formatDisplayValue = (value: number | undefined | null) => {
    if (value === undefined || value === null) return '';
    return value.toString();
  };


  return (
    <div className="flex flex-col gap-6 w-full max-w-md">
      <Carousel 
        setApi={setApi}
        opts={{
          dragFree: true,
          containScroll: "keepSnaps",
          watchDrag: false
        }}
      >
   
        <CarouselContent>
          <CarouselItem>
            <Card>
              <CardContent className="flex flex-col gap-4 p-6">
                <h3 className="text-xl font-semibold">General Average</h3>
                <div>
                  <label className="block mb-1 text-sm font-medium">Your Overall Average (0-20)*</label>
                  <Input
                    type="number"
                    step="0.1"
                    min="0"
                    max="20"
                    value={formatDisplayValue(generalAverage)}
                    onChange={(e) => handleGeneralAverageChange(e.target.value)}
                    className="rounded-none"
                    required
                  />
                  <p className="text-sm text-muted-foreground mt-1">
                    Enter your general average score from your baccalaureate.
                  </p>
                </div>
              </CardContent>
            </Card>
          </CarouselItem>

          {subjects.map((subject) => (
            <CarouselItem key={subject.field}>
              <Card>
                <CardContent className="flex flex-col gap-4 p-6">
                  <h3 className="text-xl font-semibold">{subject.name}</h3>
                  
                  <div>
                    <label className="block mb-1 text-sm font-medium">Score (0-20)*</label>
                    <Input
                      type="number"
                      step="0.1"
                      min="0"
                      max="20"
                      value={formatDisplayValue(scores[subject.field])}
                      onChange={(e) => handleScoreChange(subject.field, e.target.value)}
                      className="rounded-none"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block mb-1 text-sm font-medium">Comments</label>
                    <Textarea
                      value={comments[subject.commentField] || ''}
                      onChange={(e) => handleCommentChange(subject.commentField, e.target.value)}
                      placeholder="e.g: I think I'm good at it."
                      className="rounded-none"
                    />
                  </div>
                </CardContent>
              </Card>
            </CarouselItem>
          ))}

          <CarouselItem key="optional-subject">
            <Card>
              <CardContent className="flex flex-col gap-4 p-6">
                <h3 className="text-xl font-semibold">Optional Subject</h3>
                
                <div>
                  <label className="block mb-1 text-sm font-medium ">Select an Option*</label>
                  <select
                    value={selectedOption}
                    onChange={(e) => handleOptionChange(e.target.value)}
                   className="w-full p-2 border rounded-none hover:bg-gray-100 focus:outline-none"
                    required
                  >
                    <option value="" disabled>Choose an option</option>
                    {optionalSubjects.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>

                {selectedOption && (
                  <>
                    <div>
                      <label className="block mb-1 text-sm font-medium">Score (0-20)*</label>
                      <Input
                        type="number"
                        step="0.1"
                        min="0"
                        max="20"
                        value={formatDisplayValue(scores["noteOptions"])}
                        onChange={(e) => handleScoreChange("noteOptions", e.target.value)}
                        className="rounded-none"
                        required
                      />
                    </div>
                    
                    <div>
                      <label className="block mb-1 text-sm font-medium">Comments</label>
                      <Textarea
                        value={comments["optionComment"] || ''}
                        onChange={(e) => handleCommentChange("optionComment", e.target.value)}
                        placeholder="e.g: I think this option is interesting."
                        className="rounded-none"
                      />
                    </div>
                  </>
                )}
              </CardContent>
            </Card>
          </CarouselItem>
        </CarouselContent>
        <CarouselPrevious onClick={handlePrev} />
        <CarouselNext 
          onClick={handleNext}
          disabled={!isCurrentSlideComplete()}
        />
      </Carousel>

      {!isCurrentSlideComplete() && (
        <p className="text-sm text-gray-400 text-center">
          Please fill in all required fields (marked with *) before proceeding.
        </p>
      )}
    </div>
  );
}

