import { Routes, Route } from "@solidjs/router";
import { Homepage, Meetpage, Trial } from './pages';

const App = () => {
  return (
    <div class='min-h-screen bg-background flex justify-center'>
      <div class='w-full flex flex-col'>
        <Routes>
          <Route path='/' element={Homepage()}/>
          <Route path='/meet/:room' element={Meetpage()}/>
          <Route path='/trial' element={Trial()}/>
        </Routes>
      </div>
    </div>
  )
};

export default App