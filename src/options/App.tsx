import { useElasticStore } from "./store/elastic";
import { useDisclosure } from "@mantine/hooks";
import {
  AppShell,
  Burger,
  Button,
  Code,
  Flex,
  Loader,
  Table,
  TextInput,
} from "@mantine/core";
import _get from "lodash.get";

function App() {
  const [opened, { toggle }] = useDisclosure();
  const baseUrl = useElasticStore((state) => state.baseUrl);
  const indexPattern = useElasticStore((state) => state.indexPattern);
  const result = useElasticStore((state) => state.result);
  const currentFields = useElasticStore((state) => state.currentFields);
  const setBaseUrl = useElasticStore((state) => state.setBaseUrl);
  const setIndexPattern = useElasticStore((state) => state.setIndexPattern);
  const getStats = useElasticStore((state) => state.getStats);
  const getMapping = useElasticStore((state) => state.getMapping);
  const search = useElasticStore((state) => state.search);
  const clear = useElasticStore((state) => state.clear);

  const isHits = result?.hits;

  const rows = result?.hits?.hits?.map((hit) => (
    <Table.Tr key={hit._id}>
      {currentFields
        // .filter((field) => typeof _get(hit, `_source.${field}`) !== "object")
        .map((field) => (
          <Table.Td key={field}>
            {JSON.stringify(_get(hit, `_source.${field}`))}
          </Table.Td>
        ))}
    </Table.Tr>
  ));

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{ width: 300, breakpoint: "sm", collapsed: { mobile: !opened } }}
      padding="md"
    >
      <AppShell.Header>
        <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
        <div>Logo</div>
      </AppShell.Header>

      <AppShell.Navbar p="md">Navbar</AppShell.Navbar>

      <AppShell.Main>
        <section>
          <Flex gap="md" align="flex-end" mb="md">
            <TextInput
              label="Base Url"
              placeholder="Base Url"
              value={baseUrl}
              onChange={(event) => setBaseUrl(event.currentTarget.value)}
            />
            <TextInput
              label="Index Pattern"
              placeholder="Index Pattern"
              value={indexPattern}
              onChange={(event) => setIndexPattern(event.currentTarget.value)}
            />
            <Button variant="filled" color="teal" onClick={getStats}>
              Run
            </Button>
            <Button variant="filled" onClick={getMapping}>
              Mapping
            </Button>
            <Button variant="filled" onClick={search}>
              Search
            </Button>
            <Button variant="filled" color="red" onClick={clear}>
              Clear
            </Button>
          </Flex>
        </section>
        {/* <Loader color="blue" size="sm" mb="md" /> */}
        <section>
          <Table>
            <Table.Thead>
              <Table.Tr>
                {currentFields
                  // .filter((field) => !field.includes("."))
                  .map((field) => (
                    <Table.Th key={field}>{field}</Table.Th>
                  ))}
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>{rows}</Table.Tbody>
          </Table>
          <Flex gap="md">
            <Code block>{JSON.stringify(result, null, 6)}</Code>
            <Code block>{JSON.stringify(currentFields, null, 6)}</Code>
          </Flex>
        </section>
      </AppShell.Main>
    </AppShell>
  );
}

export default App;
