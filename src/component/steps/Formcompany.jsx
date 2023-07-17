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
import { Zone } from "../zone";
import { v4 as uuidv4 } from "uuid";

export function NewFormCompany({formCompany}) {



  return(
      <Box
        component="form"
        maw={400}
        mx="auto"
        //   onSubmit={form.onSubmit(async (e) => {
        //     try {
        //       const res = await fetch("http://localhosfst:4000/company", {
        //         method: "POST",
        //         body: JSON.stringify(e),
        //         headers: {
        //           "Content-Type": "application/json",
        //         },
        //       });

        //       const responseData = await res.json();

        //       if (res.status === 200) {
        //         form.reset()
        //         console.log('success!', responseData)
        //       } else {
        //         console.error('server responded with error', responseData)
        //       }
        //     } catch ({message}) {
        //       console.log('This is what went wrong:', message)
        //     }
        //   })}
      >
        <TextInput
          label="Name company label "
          placeholder="Name company"
        
          {...formCompany.getInputProps("company_name")}
        />

        <TextInput
          label="company_cell"
          placeholder="cel"
          withAsterisk
          mt="md"
          {...formCompany.getInputProps("company_cell")}
        />

        <TextInput
          label="Your email"
          placeholder="Your email"
          withAsterisk
          mt="md"
          {...formCompany.getInputProps("company_mail")}
        />

        <Zone {...formCompany.getInputProps("work_zone")} />

     

        {/* <Group position="center">
      <Chip color="cyan" variant="filled" size="md" radius="md">shomer_shabat</Chip>
     
      <Chip defaultChecked color="cyan" variant="filled" size="md" radius="md">work multiple days </Chip>
      </Group>
      */}
        {/* 
      <Group position="right" mt="md">
        <Button type="submit">Submit</Button>
      </Group> */}
      </Box>
    )
  }

