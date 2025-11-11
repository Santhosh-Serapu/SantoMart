import * as Icons from 'lucide-react'
import './index.css'

const iconMapping = {
  all: 'ShoppingCart',
  'fruits & vegetables': 'Carrot',
  'cold drinks & juices': 'CupSoda',
  beverages: 'Beer',
  'foodgrains, oil & masala': 'Wheat',
  'bakery, cakes & dairy': 'Croissant',
  'snacks & branded foods': 'Pizza',
  'eggs, meat & fish': 'Drumstick',
  'baby care': 'Baby',
  'cleaning & household': 'Broom',
  'beauty & hygiene': 'Sparkles',
  'kitchen, garden & pets': 'CookingPot',
  'chocolates & candies': 'Candy',
  'dry fruits': 'Nut',
  'indian mithai': 'IceCream',
  'gourmet & world food': 'Globe',
  'prepared foods': 'Utensils',
  'canned foods': 'Package',
  'frozen foods': 'Snowflake',
}

const CategoryMenu = ({categoryList, setActiveCategory, activeCategory}) => {
  const fullList = ['All', ...categoryList]

  return (
    <div className="catogery-main-container">
      <h1 className="catogery-heading">Catogeries</h1>
      <ul className="category-menu">
        {fullList.map(each => {
          const key = each?.trim().toLowerCase()
          const iconName = iconMapping[key]
          const IconComponent = Icons[iconName] || Icons.Box
          const isActive = activeCategory === each

          return (
            <li
              key={each}
              className={`category-item ${isActive ? 'active-name' : ''}`}
              onClick={() => setActiveCategory(each)}
            >
              <div className={`icon-wrapper ${isActive ? 'active' : ''}`}>
                <IconComponent
                  size={24}
                  strokeWidth={1.5}
                  fill={isActive ? '#00b894' : 'rgba(179, 179, 179, 0.8)'}
                  stroke={isActive ? '#fff' : '#ccc'}
                />
              </div>

              <p className="category-name">{each}</p>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default CategoryMenu
