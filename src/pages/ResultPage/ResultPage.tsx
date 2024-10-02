import { useEffect, useState } from "react";
import Header from "../../components/Header/Header.tsx";
import ResultComp from "../../components/ResultComp/ResultComp.tsx";
import useQuiz from "../../quiz_zustand.ts";
import { userAnswer } from "../../quiz_zustand.ts";

import styles from "./ResultPage.module.css";
import { Link } from "react-router-dom";

export default function ResultPage() {
  const { quizzes } = useQuiz((state) => state);
  const { answers } = userAnswer((state) => state);
  const [correctAns, setCorrectAns] = useState<number | null>(null);

  useEffect(() => {
    console.log("useEffect: ", quizzes, answers);
    const correct = quizzes.filter((v, i) => v.answer == answers[i]).length;
    setCorrectAns(correct);
  }, []);

  return (
    <>
      <Header />
      <body className={styles.resultBody}>
        <section className={styles.resultSec}>
          <h2>퀴즈 결과</h2>
          <div className={styles.totResults}>
            <div>{correctAns ? (correctAns / quizzes.length) * 100 : "?"}</div>
            <div>
              <i>{correctAns ? correctAns : "?"}</i>
              <i>맞은 문제</i>
            </div>
            <div>
              <i>{correctAns ? quizzes.length - correctAns : "?"}</i>
              <i>틀린 문제</i>
            </div>
          </div>
          {quizzes.map((v, i) => {
            const isCorrect = v.answer == answers[i];
            return (
              <ResultComp
                isCorrect={isCorrect}
                idx={i}
                quiz={v}
                userAns={answers[i]}
              />
            );
          })}
        </section>
        <Link to="/topics">
          <button className={styles.toHomeBtn}>토픽 페이지로</button>
        </Link>
      </body>
    </>
  );
}
