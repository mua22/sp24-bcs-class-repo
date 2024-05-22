const SingleGame = (props) => {
  console.log(props);
  return (
    <div className="game">
      <h1>{props.name}</h1>
      <p>Price: {props.price}</p>
      {props.price < 50 && <div>OnSale</div>}
    </div>
  );
};

export default SingleGame;
