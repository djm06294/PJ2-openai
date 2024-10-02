import "../../types.d.ts";
import styles from "./ResultComp.module.css";

export default function ResultComp({
  isCorrect,
  idx,
  quiz,
  userAns,
}: {
  isCorrect: boolean;
  idx: number;
  quiz: Quiz;
  userAns?: string;
}) {
  return (
    <div
      className={`${styles.results} ${
        isCorrect ? styles.correct : styles.wrong
      }`}
    >
      <div className={styles.question}>
        <i>Q{idx + 1}</i> {quiz.question}
      </div>
      <div className={styles.answer}>
        <i>A{idx + 1}</i>
        <i className={styles.wrongAns}>{userAns}</i>
      </div>
      {isCorrect ? "" : <div className={styles.correctAns}>{quiz.answer}</div>}
    </div>
  );
}
