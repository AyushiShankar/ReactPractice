import React from "react";
import './styles.css'

function DataTable({ data }) {
    const [currentPage, setCurrentPage] = React.useState(1);
    const [pageSize, setPageSize] = React.useState(5);

    const TOTAL_PAGE = Math.ceil(data.length / pageSize);
    let StartIndex = pageSize * (currentPage - 1);
    let EndIndex = StartIndex + pageSize;
    const handlePage = (mode) => {
        setCurrentPage((prev) => {
            if (mode === "inc" && prev < TOTAL_PAGE) return prev + 1;
            if (mode === "dec" && prev > 1) return prev - 1;
            return prev;
        });
    };

    return (
        <div>
            <h1>Data Table</h1>
            <table style={{
                border: "1px solid black",
                width: "100%",
                height: "100%",
                textAlign: "left",
                borderCollapse: "collapse"
            }}>
                <thead style={{
                    textAlign: "center",
                }}>
                    <tr>
                        <th style={{
                            border: "1px solid black",
                            padding: "8px",
                        }}>id</th>
                        <th style={{
                            border: "1px solid black",
                            padding: "8px",
                        }}>name</th>
                        <th style={{
                            border: "1px solid black",
                            padding: "8px",
                        }}>age</th>
                    </tr>
                </thead>
                <tbody>
                    {data.length > 0 && data.slice(StartIndex, EndIndex).map((row) => (
                        <tr key={row.id}>
                            <td style={{
                                border: "1px solid black",
                                padding: "8px",
                            }}>{row.id}</td>
                            <td style={{
                                border: "1px solid black",
                                padding: "8px",
                            }}>{row.name}</td>
                            <td style={{
                                border: "1px solid black",
                                padding: "8px",
                            }}>{row.age}</td>
                        </tr>
                    ))
                    }
                </tbody>
            </table>
            <br />
            <div style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
            }}>
                <div>
                    <button disabled={currentPage === 1} onClick={() => handlePage("dec")}>Previous</button>
                    <span style={{ margin: "0 10px" }}>Page {currentPage} of {TOTAL_PAGE}</span>
                    <button onClick={() => handlePage("inc")} disabled={currentPage === TOTAL_PAGE}>Next</button>
                </div>
                <div>
                    <span style={{ margin: "0 10px" }}>Rows per page:</span>
                    <select
                        value={pageSize}
                        onChange={(e) => setPageSize(Number(e.target.value))}>
                        {[5, 10, 15].map((num) => (
                            <option key={num} value={num}>
                                {num}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
        </div >
    );
}

export default DataTable;
