import { useState } from "react";
import {
  Stepper,
  Button,
  Group,
  TextInput,
  PasswordInput,
  Code,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { newFormCompany } from "./NewFormCompany";

export function StepForm() {
  const [active, setActive] = useState(0);
  const { formCompany, render } = newFormCompany();
//   formCompany.validate


  const form2 = useForm({
    initialValues: {
      name: "",
      email: "",
    },
  });
  const form3 = useForm({
    initialValues: {
      website: "",
      github: "",
    },
  });

  const forms = [formCompany, form2, form3];

  const nextStep = () =>
    setActive((current) => {
      if (forms[current].validate().hasErrors) {
        return current;
      }
      return current < 3 ? current + 1 : current;
    });

  

  const prevStep = () =>
    setActive((current) => (current > 0 ? current - 1 : current));

  return (
    <>
      <Stepper active={active} breakpoint="sm">
        <Stepper.Step label="First step" description="Profile settings">
          {render}

          {/* <TextInput label="Username" placeholder="Username" {...form1.getInputProps('username')} />
          <PasswordInput
            mt="md"
            label="Password"
            placeholder="Password"
            {...form1.getInputProps('password')}
          /> */}
        </Stepper.Step>

        <Stepper.Step label="Second step" description="Personal information">
          <TextInput
            label="Name"
            placeholder="Name"
            {...form2.getInputProps("name")}
          />
          <TextInput
            mt="md"
            label="Email"
            placeholder="Email"
            {...form2.getInputProps("email")}
          />
        </Stepper.Step>

        <Stepper.Step label="Final step" description="Social media">
          <TextInput
            label="Website"
            placeholder="Website"
            {...form3.getInputProps("website")}
          />
          <TextInput
            mt="md"
            label="GitHub"
            placeholder="GitHub"
            {...form3.getInputProps("github")}
          />
        </Stepper.Step>
        <Stepper.Completed>
          Completed! Form values:
          <Code block mt="xl">
            {JSON.stringify(
              {
                formCompany: formCompany.values,
                form2: form2.values,
                form3: form3.values,
              },
              null,
              2
            )}
          </Code>
        </Stepper.Completed>
      </Stepper>

      <Group position="right" mt="xl">
        {active !== 0 && (
          <Button variant="default" onClick={prevStep}>
            Back
          </Button>
        )}
        {active !== 3 && <Button onClick={nextStep}>Next step</Button>}
        {active == 3 && <Button onClick={postsAllForms}>upload</Button>}
      </Group>
    </>
  );
}
