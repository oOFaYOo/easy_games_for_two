import React, {useState} from 'react';
import Games from "./pages/Games";
import {RootState} from "./store";
import {useSelector} from "react-redux";
import {Navigate, Route, Routes} from "react-router-dom";
import Game from "./pages/Games/Game";
import Modal from "./components/Modal";
import Header from "./components/Header";

function App() {
    const {theme} = useSelector((state: RootState) => state.Task7Store)
    const [openModal, setOpenModal] = useState<boolean>(!(!!localStorage.userName));
    const [userName, setUserName] = useState<string>('');

  return (
      <div
          className={`${theme === 'dark' ? 'bg-neutral-900' : 'bg-neutral-100'} 
          relative select-none w-full h-full flex flex-col`}>
          {
              openModal
                  ? <Modal text={'Please enter your name'} modalValue={userName} setModalValue={setUserName}
                           buttonText={'Go'} action={() => {
                      if (userName) {
                          localStorage.userName = userName;
                          setOpenModal(false);
                      }
                  }}/>
                  : null
          }
          <Header/>
          <Routes>
              <Route path={'/'} element={<Navigate to={'/games'}/>}/>
              <Route path={'/games'} element={<Games/>}/>
              <Route path={'/games/:type/:id'} element={<Game/>}/>
          </Routes>
      </div>
  );
}

export default App;
