import React from "react";

const Home = () => {
  return (
    <>
      <div className='ui block segment' id='homeSegment'>
        <h1 className='ui center aligned header'>Gotta Catch Em' All!</h1>
      </div>
      <div className='ui inverted block segment'>
        <h3 className='ui inverted center aligned header' id='homeInfo'>
          Click the Cards button at the top to explore all available cards.
          Don't forget to click a card for more info. You can also use the
          search feature to find a specific card!
        </h3>        
      </div>
    </>
  );
};

export default Home;
