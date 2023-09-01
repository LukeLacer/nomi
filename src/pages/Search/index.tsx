import React, { useEffect, useState } from "react"

import "./styles.css"
import allcards from "../../data/allcards.json"
import { Header, HowTo, Modal } from "../../components"
import { strings } from "../../helpers"
import { find } from "../../searchEngine"
import { useNavigate } from "react-router-dom"

const Search = () => {
  const [localStorageWarningModal, setLocalStorageWarningModal] = useState<boolean>(false)
  const [searchValue, setSearchValue] = useState<string>('')
  const [removeAlters, setRemoveAlters] = useState<boolean>(false)

  useEffect(() => {
    const rememberMe = localStorage.getItem('rememberMe')

    if (rememberMe === 'false') {
      setLocalStorageWarningModal(false)
    } else {
      setLocalStorageWarningModal(true)
    }

  }, [])

  const navigate = useNavigate();

  const clickSearchHandler = () => {
    navigate('Results', { state: find(allcards, searchValue, removeAlters) })
  }

  const neverRememberMeHandler = () => {
    localStorage.setItem('rememberMe', 'false')
    setLocalStorageWarningModal(false)
  }

  const removeAltersHandler = () => {
    setRemoveAlters(!removeAlters)
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      clickSearchHandler()
    }
  }
  
  return (
    <div className="search-page-wrapper">
      <Header />
      <Modal
        closeModal={() => setLocalStorageWarningModal(false)}
        isOpened={localStorageWarningModal}
        title={strings.localStorageWarningModal.title}
      >
        <span>{strings.localStorageWarningModal.message}</span>
        <button className='remeber-storage-button' onClick={() => neverRememberMeHandler()}>Don't remeber me again</button>
      </Modal>
      <div className="search-wrapper">
        <input
          className="search-input"
          type="text"
          autoFocus
          onChange={e => setSearchValue(e.target.value)}
          onKeyDown={e => handleKeyDown(e)}
        />
        <button className="search-button" onClick={() => clickSearchHandler()}>Search</button>
        <div className="search-options-wrapper">
          <input
            type="checkbox"
            name="removeAlters"
            id="removeAlters"
            checked={removeAlters}
            onChange={() => removeAltersHandler()}
          />
          <label htmlFor="removeAlters">Remove alternative cards from results</label>
        </div>
        <HowTo />
      </div>
    </div>
  );
};

export default Search;
