import React, { useState, useEffect } from "react";
import { Div, Input, Button, Text, Icon } from 'atomize'
import { useForm } from "react-hook-form";
import axios from 'axios';

const HireMeForm = () => {
  const { register, handleSubmit, reset, errors, formState: { isSubmitSuccessful } } = useForm();
  const [error, setError] = useState(false);
  const [submittedData, setSubmittedData] = useState({});
  const [thanksMessage, setThanksMessage] = useState(false)

  const onSubmit = data => {
    axios.post(`${process.env.REACT_APP_JVCPARRY_API}/send`, data)
      .then(data => {
        setSubmittedData(data)
        setThanksMessage(true);
        console.log()
      }

      )
      .catch(err => {
        console.log('Message not sent due to error')
        console.log(err)
        setError(err)
      })
  };

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset({ ...submittedData });
    }
  }, [isSubmitSuccessful, submittedData, reset]);

  return (
    <>
      <Div d='flex' flexDir='column' w={{ xs: '100%', lg: '100%' }} p={{ x: '2rem' }}>
        <Text tag="h5" textSize="title" p={{ b: '1rem' }}>Get in touch</Text>
        <form onSubmit={handleSubmit(onSubmit)} w='100%'>
          <Text tag='label' htmlFor='name'>Name</Text>
          <Input
            name='name'
            ref={register({ required: true })}
            type='text'
            m={{ y: '1rem' }}
          />
          <Text tag='label' htmlFor='email'>Email</Text>
          <Input
            name='email'
            ref={register({ required: true })}
            type='email'
            m={{ y: '1rem' }}
          />
          <Text tag='label' htmlFor='message'>Your Message</Text>
          <Input
            tag="textarea"
            name='message'
            ref={register()}
            m={{ y: '1rem' }}
            h={{ xs: '3rem', sm: '5rem' }}
            type='text'
          />

          <Button
            suffix={
              <Icon
                name="LongRight"
                size="16px"
                color="white"
                m={{ l: "1rem" }}
              />
            }
            shadow="3"
            hoverBg="hsla(217, 14%, 43%)"
            bg="hsla(217, 14%, 50%)"
            hoverShadow="4"
            type='submit'
            m={{ r: "1rem" }}
          >Contact Us</Button>
          {error && <Text tag='p' textSize='body' textColor='danger800' p={{ t: '10px' }}>Sorry, an error occurred. Please try again later.</Text>}
          {thanksMessage && <Text tag='p' textSize='body' textColor='black300' p={{ t: '10px' }}>Thanks for your mail! I'll be in touch shortly.</Text>}
        </form>
      </Div>
    </>
  );
}


export default HireMeForm;

