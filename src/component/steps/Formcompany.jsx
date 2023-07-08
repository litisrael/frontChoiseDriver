// import {
//     useForm,
//     isNotEmpty,
//     isEmail,
//     isInRange,
//     hasLength,
//     matches,
//   } from "@mantine/form";
//   import {
//     Button,
//     Group,
//     TextInput,
//     NumberInput,
//     Box,
//     Select,
//     Chip,
//     Switch,
//   } from "@mantine/core";
//   import { Zone } from "../zone";
  
  
//   export function NewFormJsx({func}) {
      
//       const formCompany = useForm({
//           initialValues: {
//               company_name: "",
//               company_cell: "",
//               company_mail: "",
              
//               work_zone: [],
//             },
            
//         });
        
        
//         return (
            
            
//             <Box
//             component="form"
//             maw={400}
//             mx="auto"
            
            
//             >
      
//         <TextInput
//           label="Name company label "
//           placeholder="Name company"
//           withAsterisk
//           {...formCompany.getInputProps("company_name")}
          
//           />
  
//         <TextInput
//           label="company_cell"
//           placeholder="cel"
//           withAsterisk
//           mt="md"
//           {...formCompany.getInputProps("company_cell")}
//           />
  
//         <TextInput
//           label="Your email"
//           placeholder="Your email"
//           withAsterisk
//           mt="md"
//           {...formCompany.getInputProps("company_mail")}
//           />
  
//         <Zone {...formCompany.getInputProps("work_zone")} />
  
//         <Switch
//           label="I work multiplay day"
//           description="work with tourist"
//           size="md"
//           radius="md"
//           color="indigo"
//           {...formCompany.getInputProps("is_work_available_multiple_days")}
//           />
//         <Switch
//           label="shomer shabat?"
//           description="bla "
//           size="md"
//           radius="md"
//           color="indigo"
//           {...formCompany.getInputProps("shomer_shabat")}
//           />
  
//         {/* <Group position="center">
//         <Chip color="cyan" variant="filled" size="md" radius="md">shomer_shabat</Chip>
        
//         <Chip defaultChecked color="cyan" variant="filled" size="md" radius="md">work multiple days </Chip>
//         </Group>
//     */}
//   {/* 
//         <Group position="right" mt="md">
//         <Button type="submit">Submit</Button>
//     </Group> */}
  
//   {func(formCompany)}
//       </Box>
//     )
//   }
   