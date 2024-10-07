import { useState } from "react";
import styles from "./QuizSlide.module.css";
import "../../types.d.ts";
import { userAnswer } from "../../quiz_zustand.ts";

import useQuiz from "../../quiz_zustand.ts";

type QuizProps = { quiz: Quiz; quizNum: number };

export default function QuizSlide({ quiz, quizNum }: QuizProps) {
  const [selectedNum, setSelectedNum] = useState<number | boolean | null>(null);
  const { answers, setAnswer } = userAnswer((state) => state);
  const { quizType } = useQuiz((state) => state);

  const checkAnswer = (target: HTMLElement, checked: number | boolean) => {
    if (typeof checked === "boolean") {
      if (checked) setSelectedNum(1);
      else setSelectedNum(0);
      setAnswer(quizNum - 1, checked);
      console.log("userAnswer", answers);
    } else {
      setSelectedNum(checked);
      setAnswer(quizNum - 1, target.innerText);
      console.log("userAnswer", answers);
    }
  };
  const checkAnswerInput = (target: HTMLInputElement) => {
    // console.log(target.value);
    setAnswer(quizNum - 1, target.value);
    console.log("userAnswer", answers);
  };
  return (
    <div className={styles.slide}>
      <h4>Q{quizNum}</h4>
      <p className={styles.question}>{quiz.question}</p>
      <div className={styles.options}>
        {quizType === "객관식" && "options" in quiz
          ? quiz.options.map((v, idx) => (
              <button
                key={idx}
                className={`${selectedNum === idx ? styles.active : ""} ${
                  styles.MultipleQuestion
                }`}
                onClick={(e) => checkAnswer(e.target as HTMLElement, idx)}
              >
                {v}
              </button>
            ))
          : ""}
        {quizType === "OX 퀴즈" ? (
          <>
            <button
              className={`${selectedNum === 0 ? styles.active : ""} ${
                styles.TrueOrFalse
              }`}
              onClick={(e) => checkAnswer(e.target as HTMLElement, false)}
            >
              X
            </button>
            <button
              className={`${selectedNum === 1 ? styles.active : ""} ${
                styles.TrueOrFalse
              }`}
              onClick={(e) => checkAnswer(e.target as HTMLElement, true)}
            >
              O
            </button>
          </>
        ) : (
          ""
        )}
        {quizType === "빈칸 채우기" ? (
          <>
            <input
              type="text"
              className={styles.FillBlank}
              onChange={(e) => checkAnswerInput(e.target as HTMLInputElement)}
            />
          </>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}
