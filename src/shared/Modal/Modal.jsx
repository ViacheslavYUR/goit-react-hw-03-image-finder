import { Component } from 'react';

import css from './modal.module.css';
import { createPortal } from 'react-dom';

const modalPortal = document.querySelector('#modal-root');

class Modal extends Component {
  componentDidMount() {
    document.addEventListener('keydown', this.closeModal);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.closeModal);
  }

  closeModal = ({ curentTarget, target, code }) => {
    if (curentTarget === target || code === 'Escape') {
      console.log(code);
      this.props.close();
    }
  };
  render() {
    const { children, close } = this.props;
    return createPortal(
      <div className={css.overlay} onClick={this.closeModal}>
        <div className={css.modal}>{children}</div>
      </div>,
      modalPortal
    );
  }
}

export default Modal;
