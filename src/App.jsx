import resume from './data/resume';
import Navbar from './components/Navbar/Navbar';
import Hero from './components/Hero/Hero';
import About from './components/About/About';
import Projects from './components/Projects/Projects';
import Strengths from './components/Strengths/Strengths';
import Experience from './components/Experience/Experience';
import Footer from './components/Footer/Footer';
import styles from './App.module.css';

function App() {
  return (
    <div className={styles.app}>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Projects />
        <Strengths />
        <Experience
          id="experience"
          label="CAMPUS"
          title="校园经历"
          items={resume.campusExperience}
          variant="campus"
        />
        <Experience
          id="internship"
          label="INTERNSHIP"
          title="实习经历"
          items={resume.internshipExperience}
        />
      </main>
      <Footer />
    </div>
  );
}

export default App;
