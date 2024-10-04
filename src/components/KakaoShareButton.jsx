import React, { useEffect } from "react";
import { Button } from "react-bootstrap";

const { Kakao } = window;

const KakaoShareButton = () => {
  const url = "https://catmbti241004.netlify.app/";
  const resultURL = window.location.href;

  useEffect(() => {
    Kakao.init("308c15c26bd1a5ea3ce7f573105d736b");
    console.log(Kakao.isInitialized()); // true
  }, []);

  const shareKakao = () => {
    Kakao.Share.sendDefault({
      objectType: "feed",
      content: {
        title: "예비집사 판별기 결과",
        description:
          "예비집사님이 고양이를 키운다면 가장 잘 맞는 고양이는 엑죠틱 입니다.",
        imageUrl:
          "https://mud-kage.kakao.com/dn/NTmhS/btqfEUdFAUf/FjKzkZsnoeE4o19klTOVI1/openlink_640x640s.jpg",
        link: {
          mobileWebUrl: "https://developers.kakao.com",
          webUrl: "https://developers.kakao.com",
        },
      },
      buttons: [
        {
          title: "나도 테스트하러 가기",
          link: {
            mobileWebUrl: url,
            webUrl: url,
          },
        },
      ],
    });
  };

  return <Button onClick={shareKakao}>카카오톡 공유하기</Button>;
};

export default KakaoShareButton;
