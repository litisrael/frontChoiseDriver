import { User } from "../../context/user/User";
import {Button, createStyles, Card, Image, Text, Group, RingProgress, rem,Badge } from '@mantine/core';
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";




export function CardOneWay() {



  return (
      <Card shadow="sm" padding="lg" radius="md" withBorder>
      
    <Card.Section component="a" href="/oneway">
      <Image
        src="https://images.unsplash.com/photo-1527004013197-933c4bb611b3?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=720&q=80"
        height={160}
        alt="Norway"
      />
    </Card.Section>

    <Group position="center" mt="md" mb="xs">
      <Text weight={500}>Find Your Ideal One-Way Trip</Text>
    
    </Group>

    <Text size="sm" color="dimmed">
    If you're looking for a one-way trip, simply press here, enter your details, 
    and we'll send them to all drivers so you can choose the most convenient one.
    </Text>

    <Button variant="light" color="blue" fullWidth mt="md" radius="md"
      component={Link} 
    href="/oneway"
    >
    press to Find Your Ideal Driver

    </Button>
  </Card>
);

}