import Loader from 'react-loader-spinner'
import {Component} from 'react'

import BlogItem from '../BlogItem'

import './index.css'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'

class BlogsList extends Component {
  state = {
    blogsData: [],
    isLoading: true,
  }

  componentDidMount() {
    this.getBlogsData()
  }

  getBlogsData = async () => {
    const response = await fetch('https://apis.ccbp.in/blogs')
    const data = await response.json()
    const updatedData = data.map(eachData => ({
      id: eachData.id,
      author: eachData.author,
      topic: eachData.topic,
      imageUrl: eachData.image_url,
      avatarUrl: eachData.avatar_url,
      title: eachData.title,
    }))
    this.setState({blogsData: updatedData, isLoading: false})
  }

  render() {
    const {blogsData, isLoading} = this.state
    return (
      <div className="blog-list-container">
        {isLoading ? (
          <Loader type="TailSpin" color="#00BFFF" height={50} width={50} />
        ) : (
          blogsData.map(item => <BlogItem blogData={item} key={item.id} />)
        )}
      </div>
    )
  }
}

export default BlogsList
