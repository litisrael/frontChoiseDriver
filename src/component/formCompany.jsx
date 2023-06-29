import {
  useForm,
  isNotEmpty,
  isEmail,
  isInRange,
  hasLength,
  matches,
} from "@mantine/form";
import {
  Button,
  Group,
  TextInput,
  NumberInput,
  Box,
  Select,
  Chip,
  Switch,
} from "@mantine/core";
import { Zone } from "./zone";
// "company_name": "Empresa L",
//     "company_mail": "l@example.com",
//     "company_cell": "22222223",
//     "is_work_available_multiple_days": true,
//     "shomer_shabat": true,
//     "work_zone": [
//       "גולן",
//       "השרון"
//     ]

export function FormCompany() {


  const form = useForm({
    initialValues: {
      company_name: "",
      company_cell: "",
      company_mail: "",

      work_zone: [],
    },
  });
  // validate: {
  //   name: hasLength({ min: 2, max: 10 }, 'Name must be 2-10 characters long'),
  //   job: isNotEmpty('Enter your current job'),
  //   email: isEmail('Invalid email'),
  //   favoriteColor: matches(/^#([0-9a-f]{3}){1,2}$/, 'Enter a valid hex color'),
  //   age: isInRange({ min: 18, max: 99 }, 'You must be 18-99 years old to register'),
  // },
  // console.log(initialValues, "initialValues")
  // console.log(...form.getInputProps())
  return (
    
    <Box
      component="form"
      maw={400}
      mx="auto"
      onSubmit={form.onSubmit(async (e) => {
        try {
          const res = await fetch("http://localhosfst:4000/company", {
            method: "POST",
            body: JSON.stringify(e),
            headers: {
              "Content-Type": "application/json",
            },
          });

          const responseData = await res.json();

          if (res.status === 200) {
            form.reset()
            console.log('success!', responseData)
          } else {
            console.error('server responded with error', responseData)
          }
        } catch ({message}) {
          console.log('This is what went wrong:', message)
        }
      })}
      
    >
    
      <TextInput
        label="Name company label "
        placeholder="Name company"
        withAsterisk
        {...form.getInputProps("company_name")}
        
      />

      <TextInput
        label="company_cell"
        placeholder="cel"
        withAsterisk
        mt="md"
        {...form.getInputProps("company_cell")}
      />

      <TextInput
        label="Your email"
        placeholder="Your email"
        withAsterisk
        mt="md"
        {...form.getInputProps("company_mail")}
      />

      <Zone {...form.getInputProps("work_zone")} />

      <Switch
        label="I work multiplay day"
        description="work with tourist"
        size="md"
        radius="md"
        color="indigo"
        {...form.getInputProps("is_work_available_multiple_days")}
      />
      <Switch
        label="shomer shabat?"
        description="bla "
        size="md"
        radius="md"
        color="indigo"
        {...form.getInputProps("shomer_shabat")}
      />

      {/* <Group position="center">
      <Chip color="cyan" variant="filled" size="md" radius="md">shomer_shabat</Chip>
     
      <Chip defaultChecked color="cyan" variant="filled" size="md" radius="md">work multiple days </Chip>
      </Group>
      */}

      <Group position="right" mt="md">
        <Button type="submit">Submit</Button>
      </Group>
    </Box>
  );
}
