import './App.css';
import { Navbar, Container, Nav } from 'react-bootstrap';
import { useState } from 'react';
import data from './data.js'
import { Routes, Route, Link, useNavigate, Outlet } from 'react-router-dom';
import Detail from './Routes/detail';
import axios from 'axios';

// 실제 서버에서 가져온 데이터도 이렇게 변수에 담겨있음
//길고 복잡한 데이터는 다른파일로 뺄수 있음

function App() {//라우트는 페이지
  let [pc, setPc] = useState(data);

  let navigate = useNavigate([]);//페이지 이동 도와주는 함수 하나가 들어있음
  return (
    <div className="App">


      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="#home">ComputerShop</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link onClick={() => { navigate('/') }}>Home</Nav.Link>
            <Nav.Link onClick={() => { navigate('/detail') }}>Detail</Nav.Link>
            <Nav.Link href="#pricing">Sale</Nav.Link>
          </Nav>
        </Container>
      </Navbar>

      <Routes>
        <Route path='/' element={
          <>

            <div className='main-bg'></div>

            <div className='container'>
              <div className='row'>
                {
                  pc.map((a, i) => {//강의에선 idx랑 product합쳐서 보냄
                    return (<ProductList idx={i} product={pc} imgIdx={i + 1} />)
                  })
                }
              </div>
            </div>
            <button onClick={() => {
              <button>로딩중</button>
              // ajax 이용한 GET요청은 axios.get('url')
              axios.get('https://codingapple1.github.io/shop/data3.json')
                .then((결과) => {
                  //console.log(결과.data[0])//요청결과는 data변수에 담김
                  let copy = [...pc, ...결과.data]
                  //let copy = pc.concat(결과.data)  //왜 일케되지
                  setPc(copy);
                  //console.log(pc);
                })
                .catch(() => {//ajax 요청 실패할 경우
                  console.log('실패함 ㅅㄱ')
                })

            }}>버튼</button>
          </>
        } />

        <Route path='/detail/:id' element={<Detail product={pc} />} />
      </Routes>
    </div>
  );
}
function Event() {
  return (<div>
    <h4>오늘의 이벤트</h4>
    <Outlet></Outlet>
  </div>)
}
function About() {
  return (<div>
    <h4>회사정보임</h4>
    <Outlet></Outlet>
  </div>)
}
function ProductList(props) {
  return (
    <div className='col-md-4'>
      <img src={'https://codingapple1.github.io/shop/shoes' + props.imgIdx + '.jpg'}
        width="80%" />
      <h4>{props.product[props.idx].title}</h4>
      <p>{props.product[props.idx].content}</p>
      <p>{props.product[props.idx].price}원</p>
    </div>);
}


export default App;
