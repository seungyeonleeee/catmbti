import React, { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
// 24 Home 컴포넌트와 구조 비슷
import styled from "styled-components";
import { Button } from "react-bootstrap";
import { ResultData } from "../assets/resultdata";
import KakaoShareButton from "../components/KakaoShareButton";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
  color: #fff;
`;
const Header = styled.div`
  font-size: 40px;
`;
const Contents = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
`;
const Title = styled.div`
  font-size: 30px;
  margin: 20px 0 10px;
`;
const LogoImg = styled.div`
  img {
    width: 350px;
    height: 350px;
    border: 4px solid #fff;
  }
`;
const Desc = styled.div`
  font-size: 20px;
  line-height: 1.2;
  text-align: center;
  background: crimson;
  padding: 8px 14px;
  border-radius: 8px;
`;
const ButtonGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const Result = () => {
  // 34
  const [resultData, setResultData] = useState({});

  // 33
  const [searchParams] = useSearchParams();
  // console.log(searchParams);
  const mbti = searchParams.get("mbti"); //get(key) => key에 맞는 value를 찾아옴
  // console.log(mbti);

  // 26
  const navigate = useNavigate();

  // 27
  const handleClickButton = () => {
    navigate("/");
  };

  // 35
  useEffect(() => {
    const result = ResultData.find((s) => s.best === mbti);

    setResultData(result);
  }, [mbti]);
  // console.log(resultData);

  return (
    <Wrapper>
      <Header>예비집사 판별기</Header>
      <Contents>
        <Title>결과보기</Title>
        <LogoImg>
          <img className="rounded-circle" src={resultData.image} alt="cat" />
        </LogoImg>
        <Desc>
          예비집사님과 찰떡궁합인 😻고양이는?! <br />
          {/* // 30, // 36 */}
          {resultData.best}형 {resultData.name} 입니다!
        </Desc>
        <ButtonGroup>
          <Button
            // 25
            onClick={handleClickButton}
          >
            테스트 다시 시작하기
          </Button>
          <KakaoShareButton data={resultData} />
        </ButtonGroup>
      </Contents>
    </Wrapper>
  );
};

export default Result;
