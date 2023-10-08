import { FormData, KeywordOperators } from "@/types/types";
import {
  Button,
  CloseButton,
  Flex,
  Group,
  Input,
  Paper,
  ScrollArea,
  Select,
  Stack,
  Switch,
  rem,
} from "@mantine/core";
import { UseFormReturnType } from "@mantine/form";
import { IconCirclePlus, IconExclamationMark } from "@tabler/icons-react";
import { motion } from "framer-motion";

const Keywords = ({ form }: { form: UseFormReturnType<FormData> }) => {
  const addKeyword = () => {
    form.insertListItem("keywords", {
      keywordValue: "",
      operator: KeywordOperators.AND,
      isNot: false,
    });
  };

  const handleRemove = (order: number) => {
    form.removeListItem("keywords", order);
  };

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        delayChildren: 0.5,
        staggerDirection: 1,
        staggerChildren: 0.25,
      },
    },
  };

  const itemMovement = {
    show: { opacity: 1, y: 0, stiffness: 1 },
  };

  return (
    <div>
      <motion.div variants={container} initial="hidden" animate="show">
        <ScrollArea h={500} w={"20vw"} bg={"gray"}>
          <Stack align="center" justify="center" mt={10}>
            {form.values.keywords.map((keyword, index) => (
              <motion.div
                variants={itemMovement}
                whileHover={{ scale: 1.1 }}
                style={{ position: "relative" }}
                key={index}
              >
                <Paper shadow="xs" radius="md" p="sm" w="300px" withBorder>
                  <Group justify="space-between">
                    <Flex justify="flex-start" align="center" gap="md" mb={4}>
                      {index > 0 && (
                        <Select
                          data={[KeywordOperators.AND, KeywordOperators.OR]}
                          w="80px"
                          defaultValue={KeywordOperators.AND}
                          {...form.getInputProps(`keywords.${index}.operator`)}
                        />
                      )}

                      <Switch
                        color="red"
                        size="md"
                        {...form.getInputProps(`keywords.${index}.isNot`)}
                        thumbIcon={
                          <IconExclamationMark
                            style={{ width: rem(12), height: rem(12) }}
                            color={"black"}
                            stroke={3}
                          />
                        }
                      />
                    </Flex>
                    {index > 0 && (
                      <CloseButton onClick={() => handleRemove(index)} />
                    )}
                  </Group>

                  <Input
                    variant="filled"
                    radius="md"
                    placeholder="keyword"
                    {...form.getInputProps(`keywords.${index}.keywordValue`)}
                  />
                </Paper>
              </motion.div>
            ))}
          </Stack>
        </ScrollArea>
      </motion.div>
      <Flex mt={10}>
        <Button
          leftSection={<IconCirclePlus size={14} />}
          variant="default"
          onClick={addKeyword}
          radius={"xl"}
        >
          Add Keyword
        </Button>
      </Flex>
    </div>
  );
};
export default Keywords;
