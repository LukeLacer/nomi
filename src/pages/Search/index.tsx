import React, { useEffect, useState } from "react"

import "./styles.css"
import allcards from "../../data/allcards.json"
import { Header, Modal } from "../../components"
import { strings } from "../../helpers"
import { find } from "../../utils/search"
import { useNavigate } from "react-router-dom"

const Search = () => {
  const [localStorageWarningModal, setLocalStorageWarningModal] = useState<boolean>(false)
  const [searchValue, setSearchValue] = useState<string>('')

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
    navigate('Results', { state: { cards: find(allcards, searchValue) } })
  }

  const neverRememberMeHandler = () => {
    localStorage.setItem('rememberMe', 'false')
    setLocalStorageWarningModal(false)
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
        <button onClick={() => neverRememberMeHandler()}>Don't remeber me again</button>
      </Modal>
      <div className="search-wrapper">
        <input className="search-input" type="text" onChange={e => setSearchValue(e.target.value)} />
        <button className="search-button" onClick={() => clickSearchHandler()}>Search</button>
      </div>
    </div>
  );
};

export default Search;
