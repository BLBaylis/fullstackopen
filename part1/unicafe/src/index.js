import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Statistic = ({label, value}) => <tr><td>{label}</td><td>{value}</td></tr>

const Button = ({label, onClick}) => <button onClick = {onClick}>{label}</button>

const Statistics = ({categoryTotals}) => {
    const {good, neutral, bad} = categoryTotals;
    const total = good + neutral + bad;
    const voteCast = total > 0;
    if (!voteCast) {
        return <div>No feedback given</div>
    }
    return (
        <table>
            <tbody>
                <Statistic label = "good" value = {good}/>
                <Statistic label = "neutral" value = {neutral}/>
                <Statistic label = "bad" value = {bad}/>
                <Statistic label = "total" value = {total}/>
                <Statistic label = "average" value = {(good - bad)/total}/>
                <Statistic label = "positive" value = {good/total * 100 + "%"}/>
            </tbody>
        </table>
    )
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const incrementGood = () => setGood(good + 1);
  const incrementNeutral = () => setNeutral(neutral + 1);
  const incrementBad = () => setBad(bad + 1);

  const categoryTotals = {good, neutral, bad}

  return (
    <div>
        <h1>give feedback</h1>
        <Button onClick = {incrementGood} label = "good"/>
        <Button onClick = {incrementNeutral} label = "neutral"/>
        <Button onClick = {incrementBad} label = "bad"/>
        <h1>statistics</h1>
        <Statistics categoryTotals = {categoryTotals}/>
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)