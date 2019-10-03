import React from 'react'

import './HomePage.styles.scss'
import AGILE from '../../assets/AGILE.png'
import SHARE from '../../assets/SHARE.png'

import Directory from '../../components/Directory/Directory.component'

class HomePage extends React.Component {
  sections = [
    {
      title: 'Search',
      subtitle:'Find models, boarding passes and bag tags made by community',
      id: 1,
      linkUrl: 'search/',
      imageUrl: AGILE
    },
    {
      title: 'Create',
      subtitle:'Create a full customized model or generate a quick object',
      id: 2,
      linkUrl: 'create/',
      imageUrl: SHARE
    }
  ]
  
  render() {
    return(
      <div className='homepage'>
        <div className='directory-menu'>
          <Directory sections={ this.sections } />
        </div>
      </div>
    )
  }
}

export default HomePage