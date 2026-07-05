import React from "react";
import './styles.css'

function Tabs({ tabs }) {
    const [currentTab, setCurrentTab] = React.useState(0);
    if (tabs.length === 0) {
        return <p>No tabs available</p>
    }

    return (
        <div>
            {tabs.map((tab, index) => (
                <button
                    style={{
                        border: "none",
                        backgroundColor: "white",
                        fontSize: "16px",
                        justifyContent: "space-between",
                        padding: "10px",
                        marginLeft: "10px",
                        borderBottom: currentTab === index ? "2px solid blue" : "none"
                    }}
                    onClick={() => setCurrentTab(index)}>{tab.title || `Tab ${index + 1}`}</button>
            ))}
            <div style={{ marginTop: "10px" }}>{tabs[currentTab]?.content || "No content available"}</div>
        </div>
    );
}

export default Tabs;