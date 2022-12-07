import { useState } from 'react'

const Button = ({type, handleClick}) => <button type="button" onClick={handleClick}> {type}</button>
const Result = ({type,count}) => <p>{type} {count}</p>
const Statistics = ({goodCount, badCount ,neutralCount}) => {
  console.log(goodCount, badCount, neutralCount)
  console.log(goodCount === 0 && badCount === 0 && neutralCount === 0)
  if ( goodCount === 0 && badCount === 0 && neutralCount === 0){
    return <p> No feedback given</p>
  }else{
    return (
      <div>
        <Result type={"good"} count={goodCount}/>
        <Result type={"neutral"} count={neutralCount}/>
        <Result type={"bad"} count={badCount}/> 
        <p> all {getTotalCount(goodCount ,badCount ,neutralCount)}</p>
        <p> average {getAverage(goodCount, badCount, neutralCount)}</p>
        <p>positive {getPosPercentage(goodCount ,badCount ,neutralCount)} %</p>
      </div>   
    )
  }
}
const getTotalCount = (goodCount,badCount,neutralCount) => goodCount + badCount + neutralCount
const getTotal = (goodCount,badCount,neutralCount) => goodCount*1 + neutralCount*0 + badCount*(-1)
const getAverage = (goodCount,badCount,neutralCount) => getTotal(goodCount ,badCount ,neutralCount) / getTotalCount(goodCount ,badCount ,neutralCount)
const getPosPercentage = (goodCount ,badCount ,neutralCount) => goodCount * 100/ getTotalCount(goodCount ,badCount ,neutralCount)
const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h1> Give feedback </h1>
      <Button type={"good"} handleClick={()=>setGood(good+1)}/>
      <Button type={"neutral"} handleClick={()=>setNeutral(neutral+1)}/>
      <Button type={"bad"} handleClick={()=>setBad(bad+1)}/>
      <h1> statistics</h1>
      <Statistics goodCount={good} badCount={bad} neutralCount={neutral} />
    </div>
  )
}

export default App