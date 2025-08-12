import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Body from "./components/Body";
import Header from "./components/Header";
const About = () => (
  <div>
    <h2>About</h2>
    <p>This is a demo SPA with restaurant cards and routing.</p>
  </div>
);

const Contact = () => (
  <div>
    <h2>Contact</h2>
    <p>Contact us at <a href="mailto:info@example.com">info@example.com</a></p>
  </div>
);

const CardPage = () => (
  <div>
    <h2>Card Page</h2>
    <p>Details about a specific card will go here.</p>
  </div>
);

function Footer() {
  return (
    <footer className="footer">
      <small>© 2025 My SPA Example</small>
    </footer>
  );
}

function App() {
  return (
    <Router>
      <div className="container">
        <Header />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Body />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/card" element={<CardPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;