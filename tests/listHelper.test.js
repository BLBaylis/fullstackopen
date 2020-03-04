const listHelper = require('../utils/listHelper')
const initialBlogs = require('./testHelper').initialBlogs

test('dummy returns one', () => {
  const initialBlogs = []

  const result = listHelper.dummy(initialBlogs)
  expect(result).toBe(1)
})

describe('total likes', () => {
    const totalLikes = listHelper.totalLikes;

    test('of empty list is 0', () => {
        const noBlogList = [];
        expect(totalLikes(noBlogList)).toBe(0)
    })

    test('of 1 blog is equal to the likes on that blog', () => {
        const oneBlogList = [initialBlogs[0]];
        expect(totalLikes(oneBlogList)).toBe(7)
    })

    test('of a bigger list is calculated right', () => expect(totalLikes(initialBlogs)).toBe(36))
})

describe('favourite blog', () => {
    const favouriteBlog = listHelper.favouriteBlog;

    test('of empty list is 0', () => {
        const noBlogList = [];
        expect(favouriteBlog(noBlogList)).toBe(null)
    })

    test('of 1 blog is equal to the likes on that blog', () => {
        const oneBlogList = [initialBlogs[0]];
        const theBlog = {
            title: "React patterns",
            author: "Michael Chan",
            url: "https://reactpatterns.com/",
            likes: 7,
        }
        expect(favouriteBlog(oneBlogList)).toEqual(theBlog)
    })

    test('of a bigger list is calculated right', () => {
        const blogWithMostLikes = {
            title: "Canonical string reduction",
            author: "Edsger W. Dijkstra",
            url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
            likes: 12,
        }
        expect(favouriteBlog(initialBlogs)).toEqual(blogWithMostLikes)
    })
})

describe('most initialBlogs', () => {
    const mostBlogs = listHelper.mostBlogs;

    test('of empty list is 0', () => {
        const noBlogList = [];
        expect(mostBlogs(noBlogList)).toBe(null)
    })

    test('of 1 blog is equal to the likes on that blog', () => {
        const oneBlogList = [initialBlogs[0]];
        expect(mostBlogs(oneBlogList)).toEqual({ author : "Michael Chan", blogs: 1})
    })

    test('of a bigger list is calculated right', () => expect(mostBlogs(initialBlogs)).toEqual({ author : "Robert C. Martin", blogs: 3}))
})

describe('most likes', () => {
    const mostLikes = listHelper.mostLikes;

    test('of empty list is 0', () => {
        const noBlogList = [];
        expect(mostLikes(noBlogList)).toBe(null)
    })

    test('of 1 blog is equal to the likes on that blog', () => {
        const oneBlogList = [initialBlogs[0]];
        expect(mostLikes(oneBlogList)).toEqual({ author : "Michael Chan", likes: 7})
    })

    test('of a bigger list is calculated right', () => expect(mostLikes(initialBlogs)).toEqual({ author : "Edsger W. Dijkstra", likes: 17}))
})