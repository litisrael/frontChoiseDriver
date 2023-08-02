import { useState, useRef } from 'react';
import { NumberInput, Group, ActionIcon, rem } from '@mantine/core';

export function Bottones({setRadius ,value}) {
//   const [value, setValue] = useState(3000);
  const handlers = useRef();

  return (
    <Group spacing={5}>
      <ActionIcon size={42} variant="default" onClick={() => handlers.current.decrement()}>
        –
      </ActionIcon>

      <NumberInput
        hideControls
        value={value}
        onChange={(val) => setRadius(val)}
        handlersRef={handlers}
        max={80000}
        min={0}
        step={2000}
        styles={{ input: { width: rem(100), textAlign: 'center' } }}
      />

      <ActionIcon size={42} variant="default" onClick={() => handlers.current.increment()}>
        +
      </ActionIcon>
    </Group>
  );
}