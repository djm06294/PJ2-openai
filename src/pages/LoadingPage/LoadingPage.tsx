import { userAnswer } from "../../quiz_zustand.ts";
import { useQuizOption } from "../../quiz_zustand.ts";
import useQuiz from "../../quiz_zustand.ts";
import "../../types.d.ts";

import styles from "./LoadingPage.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircle } from "@fortawesome/free-solid-svg-icons";

import { useEffect } from "react";
import fetchQuiz from "../../api.ts";
import { useNavigate } from "react-router-dom";

export default function LoadingPage() {
  const { quizzes, setQuiz, setQuizType, removeQuiz } = useQuiz(
    (state) => state
  );
  const { quizOption, resetQuizOption } = useQuizOption((state) => state);
  const { removeAnswer } = userAnswer((state) => state);
  const navigate = useNavigate();

  const getQuiz = async () => {
    try {
      console.log("final", quizOption);
      const data: QuizResponse = await fetchQuiz(quizOption);
      resetQuizOption();

      if ("MultipleQuestion" in data) {
        setQuizType("객관식");
        setQuiz(data.MultipleQuestion as Quiz[]);
      } else if ("TrueOrFalse" in data) {
        setQuizType("OX 퀴즈");
        setQuiz(data.TrueOrFalse as Quiz[]);
      } else if ("FillBlank" in data) {
        setQuizType("빈칸 채우기");
        setQuiz(data.FillBlank as Quiz[]);
      }

      console.log("quizzes", data);
      return true;
    } catch (e) {
      console.log("fetchquiz err: ", e);
      return false;
    }
  };

  useEffect(() => {
    removeQuiz();
    removeAnswer();

    getQuiz()
      .then((result) => {
        if (result) navigate("/quiz", { state: { quiz: quizzes } });
      })
      .catch(() => {});
  }, []);

  return (
    <>
      <div className={styles.loadingDiv}>
        <div className={styles.circles}>
          <FontAwesomeIcon icon={faCircle} className={styles.circle} />
          <FontAwesomeIcon icon={faCircle} className={styles.circle} />
          <FontAwesomeIcon icon={faCircle} className={styles.circle} />
        </div>
        <p>퀴즈를 생성하고 있어요.</p>
      </div>
    </>
  );
}
