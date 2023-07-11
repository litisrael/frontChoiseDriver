import { useForm } from "@mantine/form";
import {
  TextInput,
  Switch,
  Group,
  Flex,
  ActionIcon,
  Box,
  Text,
  Button,
  Code,
} from "@mantine/core";
import { randomId } from "@mantine/hooks";
import { IconTrash } from "@tabler/icons-react";
import { InputTime } from "../InputTime";
const days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const allDaysData = days.map((day) => {
  return {
    day,
    data: [
      {
        unavailable_starting: "00:00",
        unavailable_until: "00:01",
        vehicle_id: "",
      },
    ],
  };
});

export function allDays() {
  const formDays = useForm({
    initialValues: {
      days: [...allDaysData],
    },
  });

  const fields = formDays.values.days.map((item, index) => (
    <Flex key={index}>
      <Box bg="rgba(0, 0, 0, .3)" m="xs" p="xs">
        <Text align="center">{item.day}</Text>
        <Button
                onClick={() =>
                  formDays.insertListItem( `days.${index}.data` , {
                    unavailable_starting: "00:00",
                    unavailable_until: "00:00",
                  })
                }
              >
                Add disable
              </Button>
        {item.data.map((dataItem, dataIndex) => (
          <Flex key={dataIndex} m="xs" direction="column">
            <Group position="center" mt="md">
          
              <ActionIcon
                color="red"
                onClick={() => formDays.removeListItem(`days.${index}.data`, dataIndex)}
              >
                <IconTrash size="1rem" />
              </ActionIcon>
              
            </Group>
            <InputTime
              label="not available from time"
              {...formDays.getInputProps(
                `days.${index}.data.${dataIndex}.unavailable_starting`
              )}
            />
            <InputTime
              label="not available until time"
              {...formDays.getInputProps(
                `days.${index}.data.${dataIndex}.unavailable_until`
              )}
            />
          </Flex>
        ))}
      </Box>
    </Flex>
  ));

  return {
    formDays,
    renderFormDays: (
      <Box maw={1000} mx="auto">
        <Flex wrap="wrap"> {fields}</Flex>

        {/* <Group position="center" mt="md">
        <Button
          onClick={() =>
            formDays.insertListItem("formDays", {
              name: "",
              active: false,
            //   key: randomId(),
            })
          }
        >
          Add employee
        </Button>
      </Group> */}

        <Text size="sm" weight={500} mt="md">
          Form values:
        </Text>
        {/* <Code block>{JSON.stringify(formDays.values, null, 2)}</Code> */}
      </Box>
    ),
  };
}
