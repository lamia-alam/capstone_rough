import React, { useEffect, useState } from "react";
import { api } from "../config/axios";

const categories = [
  "Teamwork",
  "Communication",
  "Conflict Resolution",
  "Problem-Solving",
  "Personal",
  "Mixed",
];

export const Session: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [numQuestions, setNumQuestions] = useState<number | null>(null);
  const [stage, setStage] = useState<number>(0);
  const [currQuestion, setCurrQuestion] = useState<number>(0);
  const [questions, setQuestions] = useState<
    {
      question_text: string;
      category: string;
    }[]
  >([]);
  const [timer, setTimer] = useState<number | null>(120);

  const getQuestions = async () => {
    try {
      const res = await api.get(`/questions/${selectedCategory}`);
      console.log("🚀 ~ getQuestions ~ res:", res);
      setQuestions(res.data.slice(0, numQuestions || res.data.length));
    } catch (error) {
      console.log("🚀 ~ getQuestions ~ error:", error);
    }
  };

  useEffect(() => {
    if (stage !== 2) {
      setTimer(null);
    }
    const interval = setInterval(() => {
      setTimer((prev) => {
        if (prev === 0) {
          clearInterval(interval);
          return 0;
        }
        if (prev === null) {
          return 120;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [stage]);

  return (
    <div className="flex justify-center items-center card bg-gray-200 border mt-4 mb-20 mx-20  h-full">
      {stage === 0 && (
        <>
          <h2 className="text-3xl">Select a category</h2>
          <div className="flex gap-2 justify-center flex-wrap px-4 py-16">
            {categories.map((category) => (
              <button
                className={`btn ${
                  category === selectedCategory ? "btn-accent" : "btn-secondary"
                }`}
                key={category}
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>
          <div className="flex gap-2 justify-center">
            <button
              className="btn btn-primary btn-wide"
              onClick={() => {
                setStage(1);
              }}
              disabled={selectedCategory === null}
            >
              Next
            </button>
          </div>
        </>
      )}

      {stage === 1 && (
        <>
          <h2 className="text-3xl">
            How many questions would you like to practice?
          </h2>
          <div className="flex gap-2 justify-center flex-wrap px-4 py-16">
            {Array(5)
              .fill(1)
              .map((e, idx) => e + idx)
              .map((val) => (
                <button
                  className={`btn ${
                    val === numQuestions ? "btn-accent" : "btn-secondary"
                  }`}
                  key={val}
                  onClick={() => setNumQuestions(val)}
                >
                  {val}
                </button>
              ))}
          </div>
          <div className="flex gap-2 justify-center">
            <button
              className="btn btn-primary btn-wide"
              onClick={() => {
                setStage(0);
              }}
            >
              Back
            </button>
            <button
              className="btn btn-primary btn-wide"
              onClick={() => {
                setStage(2);
                getQuestions();
              }}
              disabled={numQuestions === null}
            >
              Done
            </button>
          </div>
        </>
      )}

      {stage === 2 && (
        <>
          <h2 className="text-xl">Category: {selectedCategory}</h2>
          <p className="text-lg">
            <span>Question {currQuestion + 1}:</span>{" "}
            {questions.length ? questions[currQuestion].question_text : ""}
            {/* How many questions would you like to practice? */}
          </p>
          <p>Prepare before recording your answer</p>
          <h2 className="text-3xl">
            {timer !== null
              ? `${Math.floor(timer / 60)
                  .toString()
                  .padStart(2, "0")}:${(timer % 60)
                  .toString()
                  .padStart(2, "0")}`
              : "00:00"}
          </h2>
          <button
            className="btn btn-primary btn-wide"
            disabled={currQuestion === questions.length - 1}
            onClick={() => {
              if (currQuestion < questions.length - 1) {
                setCurrQuestion((prev) => prev + 1);
                setTimer(120); // reset timer
              }
            }}
          >
            Next Question
          </button>
        </>
      )}
    </div>
  );
};
