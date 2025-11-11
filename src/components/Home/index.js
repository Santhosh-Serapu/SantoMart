import './index.css'
import {useEffect, useState} from 'react'
import Loader from 'react-loader-spinner'
import CategoryMenu from '../CategoryMenu'
import ProductItems from '../ProductItems'
import Footer from '../Footer'

const apiStatusList = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  in_progress: 'IN_PROGRESS',
}

const Home = () => {
  const [categoryList, setCategoryList] = useState([])
  const [fullData, setFullData] = useState({})
  const [apiStatus, setApiStatus] = useState(apiStatusList.initial)
  const [activeCategory, setActiveCategory] = useState('All')

  const getNxtMartData = async () => {
    try {
      setApiStatus(apiStatusList.in_progress)

      const url = 'https://apis2.ccbp.in/nxt-mart/category-list-details'
      const response = await fetch(url)

      const data = await response.json()

      if (response.ok) {
        const category = data.categories.map(each => each.name)
        setCategoryList(category)
        setFullData(data)
        setApiStatus(apiStatusList.success)
      } else {
        setApiStatus(apiStatusList.failure)
      }
    } catch (error) {
      setApiStatus(apiStatusList.failure)
    }
  }

  useEffect(() => {
    getNxtMartData()
  }, [])

  const renderSuccessView = () => (
    <div className="home-container">
      <CategoryMenu
        categoryList={categoryList}
        setActiveCategory={setActiveCategory}
        activeCategory={activeCategory}
      />
      <ProductItems fullData={fullData} activeCategory={activeCategory} />
    </div>
  )

  const retry = () => {
    getNxtMartData()
  }

  const renderFailureView = () => (
    <div className="failure-view">
      <img
        src="https://res.cloudinary.com/drji3ydue/image/upload/v1762454929/9de4b6bd-8b47-4150-b64f-75f4bd918edf.png"
        alt="failure view"
        className="failure-image"
      />
      <h1 className="opps-text">Oops! Something went wrong</h1>
      <p className="trouble-text">
        We are having some trouble fetching the data.
      </p>
      <button type="button" className="retry-btn" onClick={retry}>
        Retry
      </button>
    </div>
  )

  const renderLoaderView = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#088c03" height="40" width="40" />
    </div>
  )

  const renderHomePage = () => {
    switch (apiStatus) {
      case apiStatusList.success:
        return renderSuccessView()
      case apiStatusList.failure:
        return renderFailureView()
      case apiStatusList.in_progress:
        return renderLoaderView()
      default:
        return null
    }
  }

  return (
    <div className="home-page">
      <Footer />
      {renderHomePage()}
    </div>
  )
}

export default Home
