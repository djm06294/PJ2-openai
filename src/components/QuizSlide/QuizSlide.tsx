// import { useQuery } from '@tanstack/react-query';
import { useState } from "react";
import styles from "./QuizSlide.module.css";
import "../../types.d.ts";
import { userAnswer } from "../../quiz_zustand.ts";

type QuizProps = { quiz: Quiz; quizNum: number };

export default function QuizSlide({ quiz, quizNum }: QuizProps) {
  const [selectedNum, setSelectedNum] = useState<number | null>(null);
  const { answers, setAnswer } = userAnswer((state) => state);

  const checkAnswer = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    idx: number
  ) => {
    setSelectedNum(idx);

    const target = e.target as HTMLElement;
    console.log("target", target.innerHTML);
    setAnswer(quizNum - 1, target.innerHTML);
    console.log("userAnswer", answers);
  };
  return (
    <div className={styles.slide}>
      <h4>Q{quizNum}</h4>
      <p className={styles.question}>{quiz.question}</p>
      <div className={styles.options}>
        {quiz.options.map((v, idx) => (
          <button
            key={idx}
            className={selectedNum === idx ? styles.active : ""}
            onClick={(e) => checkAnswer(e, idx)}
          >
            {v}
          </button>
        ))}
      </div>
    </div>
  );
}
