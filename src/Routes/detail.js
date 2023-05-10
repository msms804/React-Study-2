import { useParams } from "react-router-dom";
import styled from "styled-components";
import React, { useEffect, useState } from "react";
/*styled-components 장점
1. css파일 안열어도 됨
2. 스타일이 다른 js파일로 오염되지 않음(4m)
3. 페이지 로딩시간 단축
*/
let YellowBtn = styled.button`
background : yellow;
color: black;
padding:10px;

`
//박스만들기
let box = styled.div`
background : grey;
padding:20px;
`


function Detail(props) {
    let [alert, setAlert] = useState(true)
    useEffect(() => {//mount, update시 코드 실행해줌
        let a = setTimeout(() => { setAlert(false) }, 2000) // 실행할코드 , 1000ms
        console.log(2);
        return () => {
            console.log(1)
            clearTimeout(a)
        }
    })
    let [count, setCount] = useState(0)

    //유저가 url파라미터에 입력한거 가져오려면 useParams()
    let { id } = useParams();
    // console.log(id);
    let item = props.product.find((x) => {
        return x.id == id;
    });
    console.log(item);
    return (
        <div className="container">
            {(alert === true) ? <div className="alert alert-warning">
                2초 이내 구매시 할인
            </div>
                : ""}
            <button onClick={() => { setCount(count + 1) }}>{count}</button>
            <YellowBtn>버튼</YellowBtn>
            <div className="row">
                <div className="col-md-6">
                    <img src="https://codingapple1.github.io/shop/shoes1.jpg" width="100%" />
                </div>
                <div className="col-md-6">
                    <h4 className="pt-5">{item.title}</h4>
                    <p>{item.content}</p>
                    <p>{item.price}원</p>
                    <button className="btn btn-danger">주문하기</button>
                </div>
            </div>
        </div>
    )
}
//근데 왜 이미지는 안바뀜..??
//filter, find공부
export default Detail;