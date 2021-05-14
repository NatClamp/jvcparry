import React, { useState, useEffect } from 'react';
import {
  Div, Input, Button, Text, Icon, Anchor,
} from 'atomize';
import { useForm } from 'react-hook-form';
import axios from 'axios';

const HireMeForm = () => {
  const {
    register, handleSubmit, reset, formState: { isSubmitSuccessful },
  } = useForm();
  const [error, setError] = useState(false);
  const [submittedData, setSubmittedData] = useState({});
  const [thanksMessage, setThanksMessage] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);

  const onSubmit = (data) => {
    axios.post(`${process.env.REACT_APP_JVCPARRY_API}/send`, data)
      .then((result) => {
        setSubmittedData(result);
        setSubmitLoading(false);
        setThanksMessage(true);
      })
      .catch((err) => {
        setSubmitLoading(false);
        console.log('Message not sent due to error');
        console.log(err);
        setError(err);
      });
  };

  useEffect(() => {
    if (isSubmitSuccessful) {
      setSubmitLoading(true);
      reset({ ...submittedData });
    }
  }, [isSubmitSuccessful, submittedData, reset]);

  return (
    <>
      <Div d="flex" flexDir="column" w={{ xs: '100%', lg: '100%' }} justify="center" className="HireMeFormContainer">
        <form onSubmit={handleSubmit(onSubmit)} w="100%">
          <Text tag="label" htmlFor="name" textSize="subheader">Name</Text>
          <Input
            {...register('name', { required: true })}
            type="text"
            m={{ y: '1rem' }}
          />
          <Text tag="label" htmlFor="email" textSize="subheader">Email</Text>
          <Input
            {...register('email', { required: true })}
            type="email"
            m={{ y: '1rem' }}
          />
          <Text tag="label" htmlFor="message" textSize="subheader">Your Message</Text>
          <Input
            tag="textarea"
            {...register('message')}
            m={{ y: '1rem' }}
            h={{ xs: '3rem', sm: '5rem' }}
            type="text"
          />

          <Div d="flex">
            <Button
              suffix={(
                <Icon
                  name="LongRight"
                  size="16px"
                  color="white"
                  m={{ l: '1rem' }}
                />
              )}
              shadow="3"
              hoverBg="hsla(217, 14%, 43%)"
              bg="hsla(217, 14%, 50%)"
              hoverShadow="4"
              type="submit"
              m={{ r: '1rem' }}
            >
              Contact Us
            </Button>
            {error && (
            <Text tag="p" textSize="body" textColor="danger800" p={{ t: '10px' }}>
              Sorry, an error occurred. Please contact me directly on
              {' '}
              <Anchor textColor="danger800" hoverTextColor="danger900" textWeight="600" href="mailto:jvcparry@hotmail.com">jvcparry@hotmail.com</Anchor>
            </Text>
            )}
            {submitLoading && <Text tag="p" textSize="body" textColor="black300" p={{ t: '10px' }}>Sending...</Text>}
            {thanksMessage && <Text tag="p" textSize="body" textColor="black300" p={{ t: '10px' }}>Thanks for your mail! I'll be in touch shortly.</Text>}
          </Div>
        </form>
      </Div>
    </>
  );
};

export default HireMeForm;
