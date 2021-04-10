import React, { useState, useReducer } from "react";
import axios from "axios";
import tw from "twin.macro";
import styled from "styled-components";
import { css } from "styled-components/macro"; //eslint-disable-line
import {
  SectionHeading,
  Subheading as SubheadingBase,
} from "components/misc/Headings.js";
import { PrimaryButton as PrimaryButtonBase } from "components/misc/Buttons.js";
import UpdateMan from "images/update-man.svg";
import LookupInput2 from "components/forms/LookupInput2.js";

const Container = tw.div`relative`;
const TwoColumn = tw.div`flex flex-col md:flex-row justify-between max-w-screen-xl mx-auto py-20 md:py-24`;
const Column = tw.div`w-full max-w-md mx-auto md:max-w-none md:mx-0`;
const ImageColumn = tw(Column)`md:w-5/12 flex-shrink-0 h-80 md:h-auto`;
const TextColumn = styled(Column)((props) => [
  tw`md:w-7/12 mt-16 md:mt-0`,
  props.textOnLeft
    ? tw`md:mr-12 lg:mr-16 md:order-first`
    : tw`md:ml-12 lg:ml-16 md:order-last`,
]);

const Image = styled.div((props) => [
  `background-image: url("${props.imageSrc}");`,
  tw`rounded bg-contain bg-no-repeat bg-center h-full`,
]);
const TextContent = tw.div`lg:py-8 text-center md:text-left`;

const Subheading = tw(SubheadingBase)`text-center md:text-left`;
const Heading = tw(
  SectionHeading
)`mt-4 font-black text-left text-3xl sm:text-4xl lg:text-5xl text-center md:text-left leading-tight`;
const Description = tw.p`mt-4 text-center md:text-left text-sm md:text-base lg:text-lg font-medium leading-relaxed text-secondary-100`;

const Form = tw.form`mt-8 md:mt-10 text-sm flex flex-col lg:flex-row`;
const Input = tw.input`border-2 px-5 py-3 rounded focus:outline-none font-medium transition duration-300 hocus:border-primary-500`;
const SubmitButton = tw(PrimaryButtonBase)`inline-block lg:ml-6 mt-6 lg:mt-0`;

const formReducer = (state, event) => {
  return {
    ...state,
    [event.name]: event.value,
  };
};

export default ({
  subheading = "Updates",
  heading = (
    <>
      Busy? <span tw="text-primary-500">Sign up</span>
      <wbr /> for updates and relax.
    </>
  ),
  description = "Get the latest COVID-19 travel advice and price updates for the destination you want to travel to.",
  submitButtonText = "Sign up now",
  formAction = "#",
  formMethod = "get",
  textOnLeft = true,
}) => {
  // The textOnLeft boolean prop can be used to display either the text on left or right side of the image.
  const [formData, setFormData] = useReducer(formReducer, {});
  const [submitting, setSubmitting] = useState(false);
  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitting(true);
    axios
      .post("https://deqkp20ozb.execute-api.eu-west-2.amazonaws.com/dev", {
        to: formData.email,
        destination: formData.city,
        code: formData.country,
      })
      .then(
        (response) => {
          console.log(response);
        },
        (error) => {
          console.log(error);
        }
      );
  };

  // setTimeout(() => {
  //   setSubmitting(false);
  // }, 15000);

  const handleChange = (event) => {
    setFormData({
      name: event.target.name,
      value: event.target.value,
    });
  };

  const handleChangeLookup = (val, code, name) => {
    //console.log(val, code, name);
    setFormData({
      name: "airport",
      value: val,
    });
    setFormData({
      name: "city",
      value: name,
    });
    setFormData({
      name: "country",
      value: code,
    });
  };

  return (
    <Container>
      <TwoColumn>
        <ImageColumn>
          <Image imageSrc={UpdateMan} />
        </ImageColumn>
        <TextColumn textOnLeft={textOnLeft}>
          <TextContent>
            {subheading && <Subheading>{subheading}</Subheading>}
            <Heading>{heading}</Heading>
            <Description>{description}</Description>
            {submitting ? (
              <div>
                You have submitted the following:
                <ul>
                  {Object.entries(formData).map(([name, value]) => (
                    <li key={name}>
                      <strong>{name}</strong>:{value.toString()}
                    </li>
                  ))}
                </ul>
              </div>
            ) : (
              <Form onSubmit={handleSubmit}>
                <Input
                  type="email"
                  name="email"
                  placeholder="Your Email Address"
                  onChange={handleChange}
                />
                <LookupInput2 search={handleChangeLookup} />
                <SubmitButton type="submit">{submitButtonText}</SubmitButton>
              </Form>
            )}
          </TextContent>
        </TextColumn>
      </TwoColumn>
    </Container>
  );
};
