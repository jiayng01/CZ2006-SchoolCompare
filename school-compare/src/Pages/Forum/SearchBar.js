import React from 'react'
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import { Link } from 'react-router-dom';
import "../../PagesCSS/Forum/SearchBar.css"

function SearchBar({ placeholder, handleFilter, filteredPost, setFilteredPost, textEntered, setTextEntered }) {

  const clearInput = () => {
    setFilteredPost([])
    setTextEntered("")
  }

  return (
    <div className='search'>
      <div className='search-container'>
        <div className='search-icon'>
          {filteredPost.length === 0 ?
            <SearchIcon /> :
            <CloseIcon id='clearBtn' onClick={clearInput} />}
        </div>
        <input
          type='text'
          placeholder={placeholder}
          onChange={(e) => handleFilter(e, filteredPost)}
          value={textEntered} />
      </div>
      {filteredPost.length !== 0 && (
        <div className='data-result'>
          {filteredPost.slice(0, 5).map((post) => {
            return (
              <Link to={`./Post/${post.values.title.trim().replace(/\s+/g, '-')}/${post.id}`}>
                <p id={post.id}>{post.values.title}</p>
              </Link>
            )
          }
          )}
        </div>
      )}
    </div>
  )
}

export default SearchBar