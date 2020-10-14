import React, { useState, useEffect } from "react";
import { Input, Button, Text } from 'atomize'
import { useForm } from "react-hook-form";
import jsonp from "jsonp";
import toQueryString from "to-querystring";


const NewsletterForm = () => {
  const { register, handleSubmit, reset, errors, formState: { isSubmitSuccessful } } = useForm();
  const [mailchimpMessage, setMailchimpMessage] = useState(null);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [submittedData, setSubmittedData] = useState({});
  const [successSub, setSuccessSub] = useState(null)

  const onSubmit = data => {
    const emailObj = {
      EMAIL: data.email_address
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
      setSuccessSub(true)
    }
  }, [isSubmitSuccessful, submittedData, reset]);

  return (
    <>
      <Text tag='p' textSize='body' textAlign={{ xs: 'center', md: 'left' }} align={{ xs: 'center' }} justify={{ xs: 'center' }} p={{ y: '5px', l: { xs: '20px', md: '0' }, r: { xs: '20px', md: '0' } }} m={{ xs: '15px auto', md: 'auto' }} textColor='white'>
        Subscribe to my newsletter:
      </Text>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input
          name='email_address'
          ref={register({ required: true })}
          type='email'
          placeholder="Email"
          m={{ b: '10px' }}
          suffix={
            <Button
              pos="absolute"
              bg="black300"
              hoverBg="black400"
              top="0"
              right="0"
              rounded={{ r: "md" }}
              type='submit'
            >
              Subscribe
        </Button>
          }
        />
        {successSub && <Text tag='p' textSize='body' textColor='white' p={{ t: '10px' }}>Subscribed!</Text>}
        {errors.emailAddress && <Text tag='p' textSize='body' textColor='white' p={{ t: '10px' }}>This field is required</Text>}
        {error && <Text tag='p' textSize='body' textColor='white' p={{ t: '10px' }}>Sorry, an error occurred. Please try again later.</Text>}
      </form>
    </>
  );
}


export default NewsletterForm;