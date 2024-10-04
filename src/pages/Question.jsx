import React, { useState } from "react";
import { createSearchParams, useNavigate } from "react-router-dom";
import { Button, ProgressBar } from "react-bootstrap";
import styled from "styled-components";
// 10
import { QuestionData } from "../assets/questiondata";

// 9
const Wrapper = styled.div`
  width: 100%;
  height: 98vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
  padding: 0 10px;
  color: #fff;
`;
const Title = styled.div`
  font-size: 30px;
  background: crimson;
  border-radius: 8px;
  padding: 8px 16px;
  @media screen and (max-width: 780px) {
    font-size: 24px;
    text-align: center;
  }
  @media screen and (max-width: 360px) {
    font-size: 18px;
  }
`;
const ButtonGroup = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  button {
    width: 400px;
    height: 200px;
    font-size: 22px;
  }
  @media screen and (max-width: 780px) {
    flex-direction: column;
    button {
      width: 300px;
      height: 150px;
      font-size: 16px;
    }
  }
  @media screen and (max-width: 360px) {
    button {
      width: 200px;
      height: 100px;
    }
  }
`;

const Question = () => {
  // 12
  const [questionNo, setQuestionNo] = useState(0);

  // 17
  const [totalScore, setTotalScore] = useState([
    { id: "EI", score: 0 },
    { id: "SN", score: 0 },
    { id: "TF", score: 0 },
    { id: "JP", score: 0 },
  ]);

  // 23 문항을 다 풀면 다음 페이지로 이동하게
  const navigate = useNavigate();

  // 14
  // const handleClickButtonA = (no, type) => {
  //   // 19
  //   if (type === "EI") {
  //     const addScore = totalScore[0].score + no; // 값 업데이트
  //     const newObject = { id: "EI", score: addScore }; // 신규값 삽입
  //     totalScore.splice(0, 1, newObject); // 0번째 인덱스부터 1개를 찾아 newObject로 대체
  //   } else if (type === "SN") {
  //     const addScore = totalScore[1].score + no;
  //     const newObject = { id: "SN", score: addScore };
  //     totalScore.splice(1, 1, newObject);
  //   } else if (type === "TF") {
  //     const addScore = totalScore[2].score + no;
  //     const newObject = { id: "TF", score: addScore };
  //     totalScore.splice(2, 1, newObject);
  //   } else {
  //     const addScore = totalScore[3].score + no;
  //     const newObject = { id: "JP", score: addScore };
  //     totalScore.splice(3, 1, newObject);
  //   }

  //   setQuestionNo(questionNo + 1); // 공통 : 어떤 버튼을 눌러도 문항은 풀기 때문
  // };
  // const handleClickButtonB = (no, type) => {
  //   if (type === "EI") {
  //     const addScore = totalScore[0].score + no;
  //     const newObject = { id: "EI", score: addScore };
  //     totalScore.splice(0, 1, newObject);
  //   } else if (type === "SN") {
  //     const addScore = totalScore[1].score + no;
  //     const newObject = { id: "SN", score: addScore };
  //     totalScore.splice(1, 1, newObject);
  //   } else if (type === "TF") {
  //     const addScore = totalScore[2].score + no;
  //     const newObject = { id: "TF", score: addScore };
  //     totalScore.splice(2, 1, newObject);
  //   } else {
  //     const addScore = totalScore[3].score + no;
  //     const newObject = { id: "JP", score: addScore };
  //     totalScore.splice(3, 1, newObject);
  //   }

  //   setQuestionNo(questionNo + 1);
  // };
  // 반복되는 코드가 비효율적으로 길어짐
  // 20
  // console.log(totalScore);

  // 21 반복문을 활용해서 코드 축약
  const handleClickButton = (no, type) => {
    const newScore = totalScore.map((s) =>
      s.id === type ? { id: s.id, score: s.score + no } : s
    );
    setTotalScore(newScore);
    // 24
    if (QuestionData.length !== questionNo + 1) {
      setQuestionNo(questionNo + 1);
    } else {
      // 31
      const mbti = newScore.reduce(
        (acc, curr) =>
          acc +
          (curr.score >= 2 ? curr.id.substring(0, 1) : curr.id.substring(1, 2)),
        ""
      );
      // acc : 초기값 // curr : 현재값 = 배열안의 각각의 객체 // () : 연산 // "" : 초기값
      // substring(0, 1) : 0번 인덱스부터 1번 전까지
      // console.log(mbti);

      // 24
      // navigate("/result");
      // 32 쿼리값으로 result에 결과 보내기
      navigate({
        pathname: "/result",
        search: `?${createSearchParams({
          mbti: mbti,
        })}`, // 쿼리스트링(key: value)
      });
    }
  };
  // 22
  // console.log(totalScore);

  return (
    <>
      <ProgressBar
        striped
        variant="danger"
        // 15 프로그래스 바 백분율 만들기
        now={(questionNo / QuestionData.length) * 100}
      />
      <Wrapper>
        <Title>
          {/* // 11, // 16 0 => questionNo으로 바꾸기 */}
          {QuestionData[questionNo].title}
        </Title>
        <ButtonGroup>
          <Button
            variant="danger"
            // 13 가중치가 달라서 함수 다르게, // 18 type 인자값 추가
            onClick={() => handleClickButton(1, QuestionData[questionNo].type)}
          >
            {QuestionData[questionNo].answera}
          </Button>
          <Button
            onClick={() => handleClickButton(0, QuestionData[questionNo].type)}
          >
            {QuestionData[questionNo].answerb}
          </Button>
        </ButtonGroup>
      </Wrapper>
    </>
  );
};

export default Question;
