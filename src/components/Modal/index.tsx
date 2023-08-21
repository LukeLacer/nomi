import React, { ReactNode } from "react"
import "./styles.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faXmark } from '@fortawesome/free-solid-svg-icons'

type ModalProps = {
    children: ReactNode,
    closeModal: Function,
    isOpened: boolean,
    title: string
}

const Modal = (props: ModalProps) => {
    const {children, closeModal, isOpened, title} = props
    return isOpened ? <>
        <div className="modal-background" />
        <div className="modal-container">
            <div className="modal-close-button-container">
                <button className="modal-close-button" onClick={() => closeModal()}>
                    <FontAwesomeIcon icon={faXmark} size="2x"/>
                </button>
            </div>
            <div className="modal-title-container"><h2>{title}</h2></div>
            {children}
        </div>
    </> : null
}

export default Modal