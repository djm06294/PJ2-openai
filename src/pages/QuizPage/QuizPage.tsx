// import { useEffect, useState } from "react";
import useQuiz from "../../quiz_zustand.ts";
import { userAnswer } from "../../quiz_zustand.ts";

import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
// import fetchQuiz from "../../api.tsx";
import "../../types.d.ts";

import styles from "./QuizPage.module.css";
import Header from "../../components/Header/Header.tsx";
import QuizSlide from "../../components/QuizSlide/QuizSlide.tsx";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

export default function QuizPage() {
  const { quizzes, getCountQuiz } = useQuiz((state) => state);
  const { answers, getCountAnswer } = userAnswer((state) => state);
  const [isSubmitActive, setIsSubmitActive] = useState(false);

  useEffect(() => {
    if (getCountQuiz() != 0 && getCountAnswer() === getCountQuiz())
      setIsSubmitActive(true);
  }, [answers]);
  return (
    <>
      <Header />
      <div className={styles.swiperWrap}>
        <Swiper
          className={styles.swiper}
          modules={[Navigation, Pagination, Scrollbar, A11y]}
          // spaceBetween={50}
          slidesPerView={1}
          navigation
          pagination={{ clickable: true, type: "progressbar" }}
          scrollbar={{ draggable: true }}
        >
          {quizzes.map((q, idx) => (
            <SwiperSlide key={idx}>
              <QuizSlide quiz={q} quizNum={idx + 1} />
            </SwiperSlide>
          ))}
        </Swiper>
        <Link to="/result">
          <button
            className={`${styles.submitBtn} ${
              isSubmitActive ? styles.active : ""
            }`}
            disabled={!isSubmitActive}
            // onClick={}
          >
            제출하기
          </button>
        </Link>
      </div>
    </>
  );
}
