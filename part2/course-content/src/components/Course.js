import React from 'react';

const Header = ({name}) => <h1>{name}</h1>

const Part = ({name, exercises}) => <p>{name} {exercises}</p>

const Content = ({parts}) => {  
    const getParts = () => parts.map(part => <Part key = {part.id} name = {part.name} exercises = {part.exercises}/>)
    return <>{getParts()}</>
}

const Total = ({total}) => <p><b>{`Total of: ${total}`}</b></p>

const Course = ({course}) => {
    const {name, parts} = course;
    const totalExercises = parts.reduce((total, curr) => total + curr.exercises, 0);
    return (
        <div>
            <Header name = {name}/>
            <Content parts = {parts}/>
            <Total total = {totalExercises}/>
        </div>
    )
}

export default Course;