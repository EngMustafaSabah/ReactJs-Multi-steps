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
            }) => (
              <Form onSubmit={handleSubmit}>
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
                />{" "}
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  variant="contained"
                  color="primary"
                >
                  Submit
                </Button>
              </Form>
            )}
          </Formik>
        </CardContent>
      </Card>
    </div>
  );
}

export default App;
