import "./HolyGrail.module.css";


export default function HolyGrail() {
  return (
    <div className="container">
      <header>Header</header>
      <div className="columns" style={{display: "flex"}}>
        <nav>Navigation</nav>
        <main>Main</main>
        <aside>Sidebar</aside>
      </div>
      <footer style={{position:"absolute", marginBottom:0}}>Footer</footer>
    </div>
  );
}