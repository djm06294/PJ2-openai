import { userAnswer } from "../../quiz_zustand.ts";
import { useQuizOption } from "../../quiz_zustand.ts";
import useQuiz from "../../quiz_zustand.ts";
import "../../types.d.ts";

import { useEffect } from "react";
import fetchQuiz from "../../api.ts";
import { useNavigate } from "react-router-dom";

export default function LoadingPage() {
  const { quizzes, setQuiz, removeQuiz } = useQuiz((state) => state);
  const { quizOption, resetQuizOption } = useQuizOption((state) => state);
  const { removeAnswer } = userAnswer((state) => state);
  const navigate = useNavigate();

  const getQuiz = async () => {
    try {
      console.log("final", quizOption);
      const data: QuizResponse = await fetchQuiz(quizOption);
      resetQuizOption();

      setQuiz(data.MultipleQuestion);
      console.log("quizzes", data.MultipleQuestion);
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

  return <div style={{ fontSize: "3rem" }}>loading</div>;
}
