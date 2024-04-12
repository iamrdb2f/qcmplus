import './App.css';
import QcmPlusContainer from "./components/QcmPlusContainer/QcmPlusContainer";
import Navbar from "./components/Navbar/Navbar";

function App() {
  return (
      <div className={"container-fluid bg-body-secondary p-0"}>
          <Navbar/>
          <QcmPlusContainer/>
      </div>

  );
}

export default App;
