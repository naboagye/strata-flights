import React, { useState, useReducer, useEffect } from "react";
import axios from "axios";
import tw from "twin.macro";
import styled from "styled-components";
import { css } from "styled-components/macro"; //eslint-disable-line
import { getYYYYMMDD } from "helpers/DurationConverter";
import {
  SectionHeading,
  Subheading as SubheadingBase,
} from "components/misc/Headings.js";
import { PrimaryButton as PrimaryButtonBase } from "components/misc/Buttons.js";
import UpdateMan from "images/update-man.svg";
//import LookupInput2 from "components/forms/LookupInput2.js";
import { Card } from "react-rainbow-components";
import Hidden from "@material-ui/core/Hidden";

const Container = tw.div`relative px-5`;
const TwoColumn = tw.div`flex flex-col justify-between max-w-screen-xl mx-auto py-20`;
const Column = tw.div`w-full max-w-md mx-auto`;
const ImageColumn = tw(Column)`flex-shrink-0 h-80 `;
const TextColumn = styled(Column)((props) => [
  tw` mt-16`,
  props.textOnLeft ? tw`` : tw``,
]);

const Image = styled.div((props) => [
  `background-image: url("${props.imageSrc}");`,
  tw`rounded bg-contain bg-no-repeat bg-center h-full`,
]);
const TextContent = tw.div` text-center `;

const Subheading = tw(SubheadingBase)`text-center `;
const Heading = tw(
  SectionHeading
)`mt-4 font-black text-left text-3xl sm:text-4xl lg:text-5xl text-center  leading-tight`;
const Description = tw.p`mt-4 text-center text-sm md:text-base lg:text-lg font-medium leading-relaxed text-secondary-100`;

const Form = tw.form`mt-8 text-sm flex flex-col`;
const Input = tw.input`border-2 px-5 py-3 rounded focus:outline-none font-medium transition duration-300 hocus:border-primary-500`;
const SubmitButton = tw(PrimaryButtonBase)`inline-block mt-3`;

const formReducer = (state, event) => {
  return {
    ...state,
    [event.name]: event.value,
  };
};

export default (
  props,
  {
    subheading = "Updates",
    heading = (
      <>
        Busy? <span tw="text-primary-500">Sign up</span>
        <wbr /> for updates and relax.
      </>
    ),
    submitButtonText = "Sign up now",
    textOnLeft = true,
  }
) => {
  // The textOnLeft boolean prop can be used to display either the text on left or right side of the image.
  const code = props.code;
  const date = getYYYYMMDD(new Date());
  const [formData, setFormData] = useReducer(formReducer, {});
  const [submitting, setSubmitting] = useState(false);
  const [country, setCountry] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitting(true);
    axios
      .post("https://deqkp20ozb.execute-api.eu-west-2.amazonaws.com/dev", {
        to: formData.email,
        destination: country,
        code: code,
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

  useEffect(() => {
    const fetchData = async () => {
      await axios
        .get(
          `https://3tmuo3iuhk.execute-api.eu-west-2.amazonaws.com/dev?code=${code}&date=${date}`
        )
        .then((response) => {
          setCountry(response.data.body.Item.country);
        });
    };
    fetchData();
  }, [code, date]);

  // setTimeout(() => {
  //   setSubmitting(false);
  // }, 15000);

  const handleChange = (event) => {
    setFormData({
      name: event.target.name,
      value: event.target.value,
    });
  };

  // const handleChangeLookup = (val, code, name) => {
  //   //console.log(val, code, name);
  //   setFormData({
  //     name: "airport",
  //     value: val,
  //   });
  //   setFormData({
  //     name: "city",
  //     value: name,
  //   });
  //   setFormData({
  //     name: "country",
  //     value: code,
  //   });
  // };

  return (
    <Card>
      <Container>
        <TwoColumn>
          <Hidden xsDown>
            <ImageColumn>
              <Image imageSrc={UpdateMan} />
            </ImageColumn>
          </Hidden>
          <TextColumn textOnLeft={textOnLeft}>
            <TextContent>
              {subheading && <Subheading>{subheading}</Subheading>}
              <Heading>{heading}</Heading>
              <Description>
                Get the latest COVID-19 travel advice and price updates for{" "}
                {country}
              </Description>
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
                  <SubmitButton type="submit">{submitButtonText}</SubmitButton>
                </Form>
              )}
            </TextContent>
          </TextColumn>
        </TwoColumn>
      </Container>
    </Card>
  );
};
