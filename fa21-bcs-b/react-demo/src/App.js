import SingleGame from "./components/SingleGame";

const App = () => {
  return (
    <div>
      <h1 style={{ color: "white", paddingTop: "15px" }}>Hello B Section</h1>
      <p>Welcome to React Course</p>
      <SingleGame price="55" name="GTA" />
      <SingleGame price="44" name="MOHAA" />
    </div>
  );
};

export default App;
