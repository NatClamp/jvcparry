import React from 'react'
import { Div, Modal, Icon, Text } from "atomize";

import NewsletterForm from '../components/NewsletterForm';
import logo from '../images/logo.png'

class PopUpModal extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isSubmitting: false
    };

    this.onClickSubmit = this.onClickSubmit.bind(this);
    
  }

  onClickSubmit() {
    const { onClose } = this.props;

    this.setState({ isSubmitting: true });

    setTimeout(() => {
      this.setState({ isSubmitting: false });
      onClose();
    }, 600);
  }



  render() {
    const { isOpen, onClose } = this.props;

    return (
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        m={{ y: "4rem", x: { xs: "1rem", lg: "auto" } }}
        rounded="md"
        align="center"
      >
        <Icon
          name="Cross"
          pos="absolute"
          top="1rem"
          right="1rem"
          size="16px"
          onClick={onClose}
          cursor="pointer"
        />
        <Div d="flex" flexDir="row" justify="center" align="center">
          <img src={logo} alt="JVC Parry logo" textalign='center' style={{ maxHeight: '80px' }} />
        </Div>
        <Text
          p={{ l: "0.5rem", t: "0.25rem" }}
          textSize="title"
          m={{ b: "1rem" }}
          textAlign='center'
        >
          Sign up for my newsletter to receive four free 5e adventures!
        </Text>
        <NewsletterForm location='modal'/>
      </Modal>
    );
  }
}

class SubmittingStateModal extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showModal: false
    };

    this.showModalTimeout = this.showModalTimeout.bind(this);
  }

  showModalTimeout() {
    setTimeout(() => {
      let now = new Date();
      let tomorrow = now.setHours(now.getHours() + 24);
      localStorage.setItem('modalShownUntil', new Date(tomorrow));
      this.setState({ showModal: true });
    }, 2000);
  };

  componentDidMount() {
    let modalShownUntil = localStorage.getItem('modalShownUntil');
    if (new Date(modalShownUntil) < new Date()) {
        this.showModalTimeout();
    }
  }

  render() {
    const { showModal } = this.state;

    return (
      <>
        <PopUpModal
          isOpen={showModal}
          onClose={() => this.setState({ showModal: false })}
        />
      </>
    );
  }
}

export default SubmittingStateModal;