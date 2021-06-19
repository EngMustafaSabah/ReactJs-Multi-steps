import React, { useState } from "react";
import { Card, CardContent, TextField, Button } from "@material-ui/core";
import { Field, Formik, Form } from "formik";
import * as Yup from "yup";

function App() {
  return (
    <div className="App">
      <Card>
        <CardContent>
          <Formik
            initialValues={{ name: "", age: 18, description: "" }}
            validationSchema={Yup.object().shape({
              name: Yup.string().required("The name is Required"),
              age: Yup.number()
                .required("The age is Required")
                .min(18, "Only +18"),
              description: Yup.string("The description Must be String").min(
                10,
                "Only +10"
              ),
            })}
            onSubmit={(values, { setSubmitting }) => {
              setTimeout(() => {
                alert(JSON.stringify(values, null, 2));
                setSubmitting(false);
              }, 1000);
            }}
          >
            {({
              values,
              errors,
              touched,
              handleChange,
              handleBlur,
              handleSubmit,
              isSubmitting,
              validateField,
            }) => (
              <Form onSubmit={handleSubmit}>
                <FormSteps
                  isSubmitting={isSubmitting}
                  errors={errors}
                  touched={touched}
                  validateField={validateField}
                >
                  <Field
                    type="text"
                    name="name"
                    id="name"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.name}
                    placeholder="Enter Name"
                    component={TextField}
                    error={errors.name ? true : false}
                    helperText={errors.name && errors.name}
                  />
                  <Field
                    type="number"
                    name="age"
                    id="age"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.age}
                    placeholder="Enter Age"
                    component={TextField}
                    error={errors.age ? true : false}
                    helperText={errors.age && errors.age}
                  />
                  <Field
                    type="text"
                    name="description"
                    id="description"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.description}
                    placeholder="Enter Description"
                    component={TextField}
                    error={errors.description ? true : false}
                    helperText={errors.description && errors.description}
                  />
                </FormSteps>
              </Form>
            )}
          </Formik>
        </CardContent>
      </Card>
    </div>
  );
}
const FormSteps = (props) => {
  const arrOfChildren = React.Children.toArray(props.children);
  const [step, setSteps] = useState(0);
  const lengthOfarrOfChildren = arrOfChildren.length - 1;
  const name = arrOfChildren[step].props.name;
  const isError = props.errors[name] ? true : false;
  const isTouched = props.touched[name] ? true : false;
  const isEmpty = arrOfChildren[step].props.value ? false : true;

  const back = () => {
    step > 0 && setSteps(step - 1);
  };
  const next = () => {
    if (isTouched && !isError) {
      setSteps(step + 1);
    } else if (!isEmpty && !isError) {
      setSteps(step + 1);
    }
    props.validateField(name);
  };
  return (
    <>
      {arrOfChildren[step]}
      <br />
      <br />
      {step > 0 && (
        <Button
          variant="contained"
          disabled={props.isSubmitting}
          color="secondary"
          onClick={back}
        >
          Back
        </Button>
      )}{" "}
      {step < lengthOfarrOfChildren && (
        <Button
          variant="contained"
          disabled={props.isSubmitting}
          onClick={next}
        >
          Next
        </Button>
      )}{" "}
      {step === lengthOfarrOfChildren && (
        <Button
          type="submit"
          disabled={props.isSubmitting}
          variant="contained"
          color="primary"
        >
          Submit
        </Button>
      )}
    </>
  );
};
export default App;
