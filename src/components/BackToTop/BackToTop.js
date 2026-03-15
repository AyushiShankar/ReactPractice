import { useEffect, useState } from "react";

function BackToTop() {
  const [isVisible, setIsVisible] = useState(false);

  const data = Array.from({ length: 40 }, (any, i) => ({
    id: i + 1,
    text: `This is a paragragh ${i + 1}`,

  }));

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 400)
        setIsVisible(true);
      else
        setIsVisible(false);
    };

      window.addEventListener("scroll", handleScroll);


    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <div className="backToTop">
      <h1>Back To Top</h1>

      {data.map((obj) => (
        <p key={obj.id}>{obj.text}</p>
      ))}

      <div className="container">

        {isVisible && <button
          className="backtotop-btn"
          onClick={scrollToTop}
          data-testid="back-to-top-btn"
        >
          Back to Top
        </button>}

      </div>
    </div>
  );
}

export default BackToTop;
