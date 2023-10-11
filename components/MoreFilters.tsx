import { FilterTypes, Filters, FormData } from "@/types/types";
import { Paper, SimpleGrid, Stack, Tabs, Text } from "@mantine/core";
import { UseFormReturnType } from "@mantine/form";

const MoreFilters = ({ form }: { form: UseFormReturnType<FormData> }) => {
  const filterVals = Object.values(Filters);

  return (
    <Paper shadow="xs" p={"sm"} withBorder radius="xl">
      <Stack align="center" justify="center" mt={10}>
        <SimpleGrid cols={2} spacing="sm">
          {filterVals.map((filterVal) => {
            return (
              <>
                <Text>{filterVal}</Text>

                <Tabs
                  variant="pills"
                  bg="white"
                  color="black"
                  radius="xl"
                  defaultValue={FilterTypes.Default}
                  {...form.getInputProps(`filters.${filterVal}`)}
                >
                  <Tabs.List grow>
                    <Tabs.Tab
                      value={FilterTypes.None}
                      disabled={
                        (filterVal == "images" || filterVal == "videos") &&
                        form.getInputProps(`filters.media`).value ===
                          FilterTypes.None
                      }
                    >
                      {FilterTypes.None}
                    </Tabs.Tab>
                    <Tabs.Tab
                      value={FilterTypes.Default}
                      disabled={
                        (filterVal == "images" || filterVal == "videos") &&
                        form.getInputProps(`filters.media`).value ===
                          FilterTypes.None
                      }
                    >
                      {FilterTypes.Default}
                    </Tabs.Tab>
                    <Tabs.Tab
                      value={FilterTypes.Only}
                      disabled={
                        (filterVal == "images" || filterVal == "videos") &&
                        form.getInputProps(`filters.media`).value ===
                          FilterTypes.None
                      }
                    >
                      {FilterTypes.Only}
                    </Tabs.Tab>
                  </Tabs.List>
                </Tabs>
              </>
            );
          })}
        </SimpleGrid>
      </Stack>
    </Paper>
  );
};
export default MoreFilters;
