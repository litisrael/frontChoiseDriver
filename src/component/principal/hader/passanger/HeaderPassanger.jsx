import { useState } from "react";
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import {
  createStyles,
  Container,
  Group,
  Text,
  rem,
  ScrollArea,
} from "@mantine/core";
import { UserMenu } from "../UserMenu";
// import { HeaderDriver } from "./HeaderDriver";
import { User } from "../../../../context/user/User";
import { FormOneWay } from "../../../passanger/FormOneWay";
import { PricesOfPassenger } from "../../../passanger/PricesOfPassenger";
import { useAuth0 } from "@auth0/auth0-react";
import { TabsPassenger } from "./TabsPassenger";
import { HamburgerPassenger } from "./HamburgerPassenger";

import { Pages } from "../../../../pages/Pages";


const useStyles = createStyles((theme) => ({
  header: {
    paddingTop: theme.spacing.sm,
    backgroundColor:
      theme.colorScheme === "dark"
        ? theme.colors.dark[6]
        : theme.colors.gray[0],
    borderBottom: `${rem(1)} solid ${
      theme.colorScheme === "dark" ? "transparent" : theme.colors.gray[2]
    }`,
    marginBottom: rem(20),
  },

  mainSection: {
    paddingBottom: theme.spacing.sm,
  },

  user: {
    color: theme.colorScheme === "dark" ? theme.colors.dark[0] : theme.black,
    padding: `${theme.spacing.xs} ${theme.spacing.sm}`,
    borderRadius: theme.radius.sm,
    transition: "background-color 100ms ease",

    "&:hover": {
      backgroundColor:
        theme.colorScheme === "dark" ? theme.colors.dark[8] : theme.white,
    },

    // [theme.fn.smallerThan("xs")]: {
    //   display: "none",
    // },
  },

  burger: {
    [theme.fn.largerThan("xs")]: {
      display: "none",
    },
  },

  userActive: {
    backgroundColor:
      theme.colorScheme === "dark" ? theme.colors.dark[8] : theme.white,
  },

  tabs: {
    [theme.fn.smallerThan("xs")]: {
      display: "none",
    },
  },

  tabsList: {
    borderBottom: "0 !important",
  },

  tab: {
    fontWeight: 500,
    height: rem(38),
    backgroundColor: "transparent",

    "&:hover": {
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[5]
          : theme.colors.gray[1],
    },

    "&[data-active]": {
      backgroundColor:
        theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
      borderColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[7]
          : theme.colors.gray[2],
    },
  },
}));

export function HeaderPassenger() {
  const { classes, theme, cx } = useStyles();

  const { user, isAuthenticated } = useAuth0();
  if (!isAuthenticated) {
    return (
      <Text>
        Please log in to access the form. <User />{" "}
      </Text>
    );
  }

  return (
    <div className={classes.header}>
    
        <Container className={classes.mainSection}>
          <Group position="apart">
            <HamburgerPassenger classes={classes} />
            <UserMenu user={user} classes={classes} cx={cx} />
          </Group>
        </Container>
        <Container>
          <TabsPassenger  classes={classes} />
        </Container>
        {/* <PassengerPages /> */}
    </div>
  );
}
