"use client";
import Accounts from "@/components/Accounts";
import Keywords from "@/components/Keywords";
import MoreFilters from "@/components/MoreFilters";
import {
  AccountData,
  AccountOperators,
  FilterData,
  FilterTypes,
  KeywordData,
  KeywordOperators,
} from "@/types/types";
import { parseAccountsKeywords } from "@/utils/parseAccountsKeywords.server";
import {
  AppShell,
  Button,
  Flex,
  Group,
  Input,
  Modal,
  Stack,
  Text,
  Tooltip,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useDisclosure, useMediaQuery } from "@mantine/hooks";
import Link from "next/link";
import { useState } from "react";

function App() {
  const [opened, { toggle }] = useDisclosure();
  const [modalOpened, { open, close }] = useDisclosure(false);
  const matches = useMediaQuery("(min-width: 40em)");
  const [result, setResult] = useState("");
  const form = useForm({
    initialValues: {
      accounts: [{ accountValue: "", operator: AccountOperators.From }],
      keywords: [
        { keywordValue: "", operator: KeywordOperators.AND, isNot: false },
      ],
      filters: {
        replies: FilterTypes.Default,
        retweets: FilterTypes.Default,
        links: FilterTypes.Default,
        media: FilterTypes.Default,
        images: FilterTypes.Default,
        videos: FilterTypes.Default,
      },
    },
    validate: {
      keywords: {
        keywordValue: (value) => {
          if (value === undefined) return null;
          return value.length < 1 ? "Keyword cannot be blank" : null;
        },
      },
    },
  });

  const readForm = (
    accounts: AccountData[],
    keywords: KeywordData[],
    filters: FilterData
  ) => {
    const finalString = parseAccountsKeywords(accounts, keywords, filters);
    setResult(finalString);
  };

  return (
    <AppShell header={{ height: 60 }} padding="md">
      <AppShell.Header>
        <Text size="lg">Twitter Advanced Search Tool</Text>
      </AppShell.Header>

      <AppShell.Main>
        {!matches && (
          <>
            <Text size="md">
              {" "}
              Not available on Mobile yet. Reach out to{" "}
              <Link href="https://twitter.com/realChrisHailey">
                @realChrisHailey on X{" "}
              </Link>
              for more info{" "}
            </Text>
          </>
        )}
        {matches && (
          <Stack>
            <form
              onSubmit={form.onSubmit((values) =>
                readForm(values.accounts, values.keywords, values.filters)
              )}
            >
              <Group justify="center" wrap="nowrap">
                <Keywords form={form} />
                <Accounts form={form} />
              </Group>
              <Modal
                opened={modalOpened}
                onClose={close}
                title="More Filters"
                size="lg"
                centered
              >
                <MoreFilters form={form} />
              </Modal>
              <Flex justify={"center"} mt={20} mb={10}>
                <Button color="dark" onClick={open}>
                  More Filters
                </Button>
              </Flex>
              <Flex justify={"center"} mt={20} mb={10}>
                <Button justify="center" size="xl" radius="lg" type="submit">
                  Generate
                </Button>
              </Flex>
            </form>

            <Group justify="center">
              <Input
                placeholder="Result"
                variant="filled"
                size="lg"
                value={result}
                w={"75vw"}
              />
              <Tooltip label="Make sure you are logged in to your X account">
                <Button
                  onClick={() => console.log("Generate")}
                  color="black"
                  component="a"
                  href={"https://twitter.com/search?q=" + result}
                  target="_blank"
                  disabled={!result || result == ""}
                >
                  Open in X
                </Button>
              </Tooltip>
            </Group>
          </Stack>
        )}
      </AppShell.Main>
    </AppShell>
  );
}
export default App;
