import { useForm } from "@mantine/form";
import {
  TextInput,
  Switch,
  Group,
  ActionIcon,
  Box,
  Text,
  Button,
  Code,
} from "@mantine/core";
import { randomId } from "@mantine/hooks";
import { IconTrash } from "@tabler/icons-react";
import { allDays } from "./alldays";
import { v4 as uuidv4 } from "uuid";
export function vehicule() {
  const { formDays, renderFormDays } = allDays();
  const formVehicle = useForm({
    initialValues: {
      vehicle: [
        {
          number_of_seats: "",
          mispar_rishuy: "",
          build_date: "",
          overtime_price: "",
          company_id: "",
        },
      ],
    },
  });

  const fields = formVehicle.values.vehicle.map((item, index) => (
    <Group key={item.key} mt="xs">
      <TextInput
        placeholder="seats passenger in vehicle"
        withAsterisk
        sx={{ flex: 1 }}
        {...formVehicle.getInputProps(`vehicle.${index}.number_of_seats`)}
      />
      <TextInput
        placeholder="mispar_rishuy"
        withAsterisk
        sx={{ flex: 1 }}
        {...formVehicle.getInputProps(`vehicle.${index}.mispar_rishuy`)}
      />
      <TextInput
        placeholder="build_date"
        withAsterisk
        sx={{ flex: 1 }}
        {...formVehicle.getInputProps(`vehicle.${index}.build_date`)}
      />
      <TextInput
        placeholder="overtime_price"
        withAsterisk
        sx={{ flex: 1 }}
        {...formVehicle.getInputProps(`vehicle.${index}.overtime_price`)}
      />
      <Switch
        label="Active"
        {...formVehicle.getInputProps(`vehicle.${index}.active`, {
          type: "checkbox",
        })}
      />
      <ActionIcon
        color="red"
        onClick={() => formVehicle.removeListItem("vehicle", index)}
      >
        <IconTrash size="1rem" />
      </ActionIcon>

      {renderFormDays}
    </Group>
  ));

  return {
    formDays,
    formVehicle,
    renderFormVehicle: (
      <Box maw={1000} mx="auto">
        {fields.length > 0 ? (
          <Group mb="xs">
            <Text weight={500} size="sm" sx={{ flex: 1 }}>
              number_of_seats
            </Text>
            <Text weight={500} size="sm" sx={{ flex: 1 }}>
              mispar_rishuy
            </Text>
            <Text weight={500} size="sm" sx={{ flex: 1 }}>
              build_date
            </Text>
            <Text weight={500} size="sm" sx={{ flex: 1 }}>
              overtime_price
            </Text>
            <Text weight={500} size="sm" pr={90}>
              Status
            </Text>
          </Group>
        ) : (
          <Text color="dimmed" align="center">
            No one here...
          </Text>
        )}

        {fields}

        <Group position="center" mt="md">
          <Button
            onClick={() =>
              formVehicle.insertListItem("vehicle", {
                number_of_seats: "",
                mispar_rishuy: "",
                build_date: "",
                overtime_price: "",
                company_id: "company_id",
              })
            }
          >
            Add vehicle
          </Button>
        </Group>
        <Code block>{JSON.stringify(formVehicle.values, null, 2)}</Code>
      </Box>
    ),
  };
}
