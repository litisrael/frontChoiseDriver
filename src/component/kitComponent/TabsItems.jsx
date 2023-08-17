
import { Tabs } from '@mantine/core';

export const TabItems = ({ tabs }) => {
    const items = tabs.map((tab) => (
      <Tabs.Tab value={tab} key={tab}>
        {tab}
      </Tabs.Tab>
    ));
  
    return <Tabs.List>{items}</Tabs.List>;
  };
  
