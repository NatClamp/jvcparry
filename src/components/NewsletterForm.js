import React from "react";
import { Input, Button } from 'atomize'


const NewsletterForm = () => {
  return (
    <Input
      placeholder="Email"
      suffix={
        <Button
          pos="absolute"
          onClick={() => console.log("clicked")}
          bg="info700"
          hoverBg="info800"
          top="0"
          right="0"
          rounded={{ r: "md" }}
        >
          Subscribe
        </Button>
      }
    />
  );
}


export default NewsletterForm;