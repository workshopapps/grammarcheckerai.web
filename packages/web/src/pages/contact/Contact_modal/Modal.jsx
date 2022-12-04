import React from 'react';
import './Modal.css'
import useTheme from '../../../hooks/useTheme'

import {MdOutlineArrowForwardIos} from "react-icons/md";

const Modal = ({open, onClose}) => {
      const context = useTheme();
      const dark = context.theme === 'dark';

  if (!open) return null
  return (
    <div className="overlay">
      <div contact-theme={context.theme} className="modalContainer rounded-lg bg-white px-4 pt-5 pb-4 sm:p-4 sm:pb-4">
        <div contact-theme={context.theme} className="content">
        <p
          onClick={onClose}
          className="closeBtn ">X</p>
        <div contact-theme={context.theme} className="modal_container m-2 mb-4">
          <span contact-theme={context.theme} className="text-xl font-bold mt-2"> Message sent </span>
          <div contact-theme={context.theme} className="message-border"></div>
          <div>
            <p contact-theme={context.theme}>Thank you for reaching us, your message has been sent and a you would get a reply from us soon.</p>
          </div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default Modal;
