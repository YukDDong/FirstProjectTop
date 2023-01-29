import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { auth } from "../_actions/user_action";
import { useHistory } from "react-router-dom";

export default function (SpecificComponent, option, adminRoute = null) {
  const history = useHistory();
  // option: null, true, false
  // null: 아무나 출입 가능 페이지
  // true: 로그인한 유저만 출입가능
  // false: 로그인한 유저는 출입불가
  // adminRoute: 관리자만 들어갈 수 있는것 default값이 null
  //             관리자면 true 적어주면 됨

  function AuthenticationCheck() {
    const dispatch = useDispatch();
    // 백엔드에 요청을 보내서 유저정보를 받아옴
    useEffect(() => {
      dispatch(auth()).then((response) => {
        // 로그인 하지 않은 상태
        if (!response.payload.isAuth) {
          if (option) {
            alert("로그인이 필요한 서비스 입니다.");
            history.push("/login");
          }
        } else {
          // 로그인 한 상태
          // 관리자전용페이지이면서, 관리자가 아닌 사람이 들어오면
          // 홈으로 돌려보냄
          if (adminRoute && !response.payload.isAdmin) {
            history.push("/");
          } else {
            // 로그인한 유저가 출입불가한 페이지이면
            // 홈으로 돌려보냄
            if (option == false) {
              alert("로그인 상태입니다.");
              history.push("/");
            }
          }
        }
      });
    }, []);

    return <SpecificComponent />;
  }

  return AuthenticationCheck;
}
