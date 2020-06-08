import React from 'react';
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

function renderBlog(props) {
  const blog = {
    title: 'test title',
    url: 'www.testurl.com',
    author: 'test author',
    likes: 12,
    user: {
      username: 'test username'
    }
  }

  const incrementBlogLikesMock = jest.fn()

  const component = render(
    <Blog blog = {blog} incrementBlogLikes = {incrementBlogLikesMock} {...props}/>
  )

  return {component, incrementBlogLikesMock}
}

function clickShowDetailsButton(component) {
  const button = component.getByText('Show details')
  fireEvent.click(button)
}

describe('<Blog/>', () => {
  test('renders correct content', () => {
    const {component} = renderBlog()
    const toggleableContent = component.container.querySelector('.toggleable-content')

    expect(component.container).toHaveTextContent('test title')
    expect(component.container).toHaveTextContent('test author')
    expect(toggleableContent).toBeNull()
  })

  test('renders url and likes', () => {
    const {component} = renderBlog()
    clickShowDetailsButton(component)
    const toggleableContent = component.container.querySelector('.toggleable-content')
    
    expect(toggleableContent).toBeDefined()
    expect(toggleableContent).toHaveTextContent('Likes: 12')
    expect(toggleableContent).toHaveTextContent('www.testurl.com')
  })

  test('the event handler is called twice when like button is clicked twice', () => {
    const {component, incrementBlogLikesMock} = renderBlog()
    clickShowDetailsButton(component)

    const button = component.getByText('Like')
    fireEvent.click(button)
    fireEvent.click(button)
    
    expect(incrementBlogLikesMock.mock.calls).toHaveLength(2)
  })

})