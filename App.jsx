import { Home } from "./pages/Home";
import Aos from "aos";
import { useEffect } from "react";

function App() {
  useEffect(() => {
    Aos.init({ duration: 2000 });
  }, []);

  return (
    <section>
      <Home />
    </section>
  );
}

export default App;
