import { profile } from "../data/content";
import { CliveDefs } from "../components/Clive";
import Nav from "../components/Nav";
import Hero from "../components/Hero";
import Book from "../components/Book";
import Contact from "../components/Contact";
import "./page.css";
import FollowClive from "../components/FollowClive";

export default function Home() {
  return (
    <>
      <CliveDefs />
      <FollowClive />
      <Nav />

      <main id="top">
        <Hero />
        <Book />
        <Contact />
        <footer className="site-footer wrap">
          <span>
            &copy; {new Date().getFullYear()} {profile.name}
          </span>
          <a href="#top">Back to the top</a>
        </footer>
      </main>
    </>
  );
}
