import logo from "./logo.svg";
import "./App.css";
import { GlobalStyle } from "./Styles/GlobalStyle";
import styled from "styled-components";
import bg from './img/bg.png';
import { MainLayout } from "./Styles/Layout";
import Orb from "./Components/Orb/Orb";
import Navigation from "./Components/Navigation/Navigation";
import React,  { useMemo, useState } from "react";
import Dashboard from "./Components/Dashboard/Dashboard";
import Incomes from "./Components/Incomes/Incomes";
import Expenses from "./Components/Expenses/Expenses";
import { useGlobalContext } from "./Context/globalcontext";
import Sales from "./Components/Sales/Sales";
import Analyze from "./Components/Analyze/Analyze";
function App() {

  const[active,setActive] = React.useState(1)

  const  global = useGlobalContext()

  const displayData = () =>{
    switch(active){
      case 1:
        return <Dashboard/>
      case 2:
        return <Analyze/>
      case 3:
         return <Incomes/>
      case 4:
        return <Expenses/>
      case 5:
        return <Sales/>
      default : 
      return <Dashboard/>
    }
  }





  const orbMemo = useMemo(() => {
    return <Orb/>

  },[])

  return (
    <Appstyled bg = {bg} className="App">

      <GlobalStyle></GlobalStyle>
        {orbMemo}
      <MainLayout>
        <Navigation active={active} setActive={setActive} />
        <main>
          {displayData()}
        </main>
      </MainLayout>
    </Appstyled>
  );
}



const Appstyled = styled.div`
height: 100vh;
background-image: url(${props => props.bg});

main{
  flex: 1;
  background: rgba(252, 246, 249, 0.78);
  border: 3px solid #FFFFFF;
  backdrop-filter: blur(4.5px);
  border-radius: 32px;
  overflow-x: hidden;
  &::-webkit-scrollbar{
    width: 0;
  }
}

`;


export default App;
