import React, { useState, useEffect } from 'react';
import { Input, Button, Text } from 'atomize';
import { useForm } from 'react-hook-form';
import jsonp from 'jsonp';
import toQueryString from 'to-querystring';
import PropTypes from 'prop-types';

const NewsletterForm = (props) => {
  const {
    register, handleSubmit, reset, errors, formState: { isSubmitSuccessful },
  } = useForm();
  const [mailchimpMessage, setMailchimpMessage] = useState(null);
  const [error, setError] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [submittedData, setSubmittedData] = useState({});
  const [successSub, setSuccessSub] = useState(null);

  const { location } = props;

  const onSubmit = (resp) => {
    const emailObj = {
      EMAIL: resp.email_address,
    };
    const params = toQueryString(emailObj);

    jsonp(`${process.env.REACT_APP_MAILCHIMP_URL}&${params}`, { param: 'c' }, (err, data) => {
      if (err) {
        setErrorMessage(err.message);
        setError(true);
        console.log(errorMessage);
      } else {
        console.log(mailchimpMessage);
        setMailchimpMessage(data.msg);
        setSubmittedData(data);
      }
    });
  };

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset({ ...submittedData });
      setSuccessSub(true);
    }
  }, [isSubmitSuccessful, submittedData, reset]);

  return (
    <>
      {location === 'footer' && (
      <Text tag="p" textSize="body" textAlign={{ xs: 'center', md: 'left' }} align={{ xs: 'center' }} justify={{ xs: 'center' }} p={{ y: '5px', l: { xs: '20px', md: '0' }, r: { xs: '20px', md: '0' } }} m={{ xs: '15px auto', md: 'auto' }} textColor="white" data-testid="footer-title">
        Subscribe to my newsletter:
      </Text>
      )}
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input
          name="email_address"
          ref={register({ required: true })}
          type="email"
          placeholder="Email"
          m={{ b: '10px' }}
          suffix={(
            <Button
              pos="absolute"
              hoverBg="hsla(217, 14%, 43%)"
              bg="hsla(217, 14%, 50%)"
              top="0"
              right="0"
              rounded={{ r: 'md' }}
              type="submit"
            >
              Subscribe
            </Button>
          )}
        />
        {successSub && <Text tag="p" textSize="body" textColor={location === 'footer' ? 'white' : 'black'} p={{ t: '10px' }} textAlign={location === 'footer' ? '' : 'center'}>Subscribed!</Text>}
        {errors.emailAddress && <Text tag="p" textSize="body" textColor={location === 'footer' ? 'white' : 'black'} p={{ t: '10px' }} textAlign={location === 'footer' ? '' : 'center'}>This field is required</Text>}
        {error && <Text tag="p" textSize="body" textColor={location === 'footer' ? 'white' : 'black'} p={{ t: '10px' }} textAlign={location === 'footer' ? '' : 'center'}>Sorry, an error occurred. Please try again later.</Text>}
      </form>
    </>
  );
};

NewsletterForm.propTypes = {
  location: PropTypes.string.isRequired,
};

export default NewsletterForm;
