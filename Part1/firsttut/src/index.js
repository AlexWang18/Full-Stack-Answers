import React from 'react';
import ReactDOM from 'react-dom';

const Hello = (props) => { //pass prop into function assigned to constant funct type ig
  return (
    <p>Hello {props.name} </p>
  )
}

const Bye = (props) => {

  return ( //cano only return one element must wrap them in a divider i see why theyre usefull now, can use JSX fragmets instead as root element   
    <> 

      <p> Bye {props.swag}  </p>

      <p>See you again {props.cool}</p>
      <p>{props.ok}</p>

    </>
  )

}
const App = () => { //JSX , basically HTML compiled into JS by Babel. can embed dynamic content in {}
  console.log('hello from compunent son')

  const now = new Date()
  const a = 10
  const b = 20

  return (
    <div>
      {/* why are closing functions like this  */}

      <Hello name="family" />

      <p>Greetings it is {now.toString}</p>
      <p>
        {a} plus {b} is {a + b}
      </p>
      <Bye swag="family" cool="cool" ok="okay" />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
//ReactDOM.render(<Hello />, document.getElementsByTagName)
