import "./App.css";
import Home from "./pages/Home";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Routes, Route, useNavigate } from "react-router-dom";
import Detail from "./pages/Detail";
import DetailCarousel from "./pages/DetailCarousel"; // Import the DetailCarousel component
import AddEditBlog from "./pages/AddEditBlog";
import About from "./pages/About";
import NotFound from "./pages/NotFound";
import Header from "./components/Header";
import AuthUser from "./pages/Auth";
import { useEffect, useState } from "react";
import { auth } from "./firebase-config";
import { signOut } from "firebase/auth";
import BlogList from "./pages/blogList";
import DeleteArticle from "./components/DeleteArticle";
import EditBlog from "./components/EditArticle";
import Footer from "./components/Footer";
// import SearchResults from "./components/SearchBar/SearchResults";
import CategoryPage from "./components/CategoryPage";

function App() {
  const [active, setActive] = useState("home");
  const [user, setUser] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        setUser(authUser);
      } else {
        setUser(null);
      }
    });
  }, []);

  const handleLogOut = () => {
    signOut(auth).then(() => {
      setUser(null);
      setActive("login");
      navigate("/auth");
    });
  };

  //  const handleSearch = (query) => {
  //   // Add the logic to handle the search here
  //   // For example, you can filter the articles based on the query
  //   console.log("Searching for:", query);
  // };

  return (
    <div className="App">
      <Header
        setActive={setActive}
        active={active}
        user={user}
        handleLogOut={handleLogOut}
      />
      <ToastContainer position="top-center" />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/detail/:id" element={<Detail />} />
        <Route exact path="/detailCarousel/:id" component={DetailCarousel} />
        <Route path="/create" element={<AddEditBlog user={user} />} />
        <Route path="/update/:id" element={<AddEditBlog user={user} />} />
        <Route path="/about" element={<About />} />
        <Route
          path="/auth"
          element={<AuthUser setUser={setUser} setActive={setActive} />}
        />
        <Route path="*" element={<NotFound />} />
        <Route path="/BlogList" element={<BlogList />} />
        <Route path="/DeleteArticle" element={<DeleteArticle />} />
        <Route path="/edit/:articleId" element={<EditBlog />} />
        <Route path="/Footer" element={<Footer />} />
        <Route
          path="/trending"
          element={<CategoryPage category="trending" />}
        />
        <Route
          path="/bollywood"
          element={<CategoryPage category="bollywood" />}
        />
        <Route
          path="/technology"
          element={<CategoryPage category="technology" />}
        />
        {/* <Route path="/search" element={<SearchResults />} /> */}
      </Routes>
    </div>
  );
}

export default App;
