import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import BlogForm from './BlogForm'

describe('<BlogForm />', () => {

  test(' updates parent state and calls onSubmit', () => {
  
    const addBlogMock = jest.fn()
    const setBlogMessagesMock = jest.fn()
  
    const {container} = render(
      <BlogForm addBlog = {addBlogMock} setBlogMessages = {setBlogMessagesMock} />
    )

    const titleInput = container.querySelector('#title')
    const authorInput = container.querySelector('#author')
    const urlInput = container.querySelector('#url')
    const form = container.querySelector('form')

    fireEvent.change(titleInput, {
      target: { value: 'Test title'}
    })
    fireEvent.change(authorInput, {
      target: { value: 'Test author'}
    })
    fireEvent.change(urlInput, {
      target: { value: 'Test url'}
    })
    fireEvent.submit(form)
    
    const submittedObj = addBlogMock.mock.calls[0][0]
    
    expect(addBlogMock.mock.calls).toHaveLength(1)
    expect(submittedObj.title).toBe('Test title')
    expect(submittedObj.author).toBe('Test author')
    expect(submittedObj.url).toBe('Test url')
  })

})