import React, { useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import './Accordian.module.css';



function Accordion( ) {

    const items = [
  {
    title: "JavaScript Basics",
    content: "Learn variables, functions, and loops in JavaScript."
  },
  {
    title: "React.js Overview",
    content: "Understand components, state, and props in React."
  },
  {
    title: "Node.js",
    content: "Basics of server-side development with Node.js."
  },
  {
    title: "Full-Stack Development",
    content: "Build full-stack apps with React and Node.js."
  },
];
    const [isOpen, setIsOpen] = useState(false);
    function handleAccordian(index) {

        setIsOpen((prev) => (prev === index) ? null : index);

    }
    if (!items || items.length === 0) {
        return <p>No items available.</p>;
    }
    return (
        <div className="accordion">

            {items.map((item, index) =>
                <div className="accordion-item" key={index}>
                    <button className="accordion-title" onClick={() => handleAccordian(index)}>{item.title}
                        {isOpen === index ? <FaChevronUp style={{ float: 'right' }} /> : <FaChevronDown style={{ float: 'right' }} />}
                    </button>

                    {isOpen === index && <p className="accordion-content">{item.content}</p>}


                </div>)
            }
        </div >
    );
}

export default Accordion;