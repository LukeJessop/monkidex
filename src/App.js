import './App.css';
import routes from './routes';
import Nav from './Components/navbar'
import './Components/dashboard.css'
import './Components/map.css'
import './Components/navbar.css'
import './Components/post.css'
import './Components/login.css'
import './Components/yourdex.css'
function App() {
  return (
    <div className='App'>
      <Nav/>
      {routes}
    </div>
  );
}

export default App;
