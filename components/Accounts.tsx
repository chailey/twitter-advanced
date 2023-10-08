import { AccountOperators, FormData } from "@/types/types";
import {
  Button,
  CloseButton,
  Flex,
  Group,
  Paper,
  ScrollArea,
  Select,
  Stack,
  TextInput,
} from "@mantine/core";
import { UseFormReturnType } from "@mantine/form";
import { IconCirclePlus } from "@tabler/icons-react";
import { motion } from "framer-motion";

const Accounts = ({ form }: { form: UseFormReturnType<FormData> }) => {
  const addAccount = () => {
    form.insertListItem("accounts", {
      accountValue: "",
      operator: AccountOperators.From,
    });
  };

  const handleRemove = (order: number) => {
    form.removeListItem("accounts", order);
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
        <ScrollArea h={500} w={"15vw"} bg={"gray"}>
          <Stack align="center" justify="center" mt={10}>
            {form.values.accounts.map((_, index) => (
              <motion.div
                variants={itemMovement}
                whileHover={{ scale: 1.1 }}
                style={{ position: "relative" }}
                key={index}
              >
                <Paper shadow="xs" radius="md" p="sm" w="250px" withBorder>
                  <Group justify="space-between" mb={4}>
                    <Select
                      data={[
                        AccountOperators.From,
                        AccountOperators.To,
                        AccountOperators.Mention,
                      ]}
                      w="100px"
                      defaultValue={AccountOperators.From}
                      {...form.getInputProps(`accounts.${index}.operator`)}
                    />
                    {index > 0 && (
                      <CloseButton onClick={() => handleRemove(index)} />
                    )}
                  </Group>

                  <TextInput
                    variant="filled"
                    radius="md"
                    placeholder="account (@)"
                    {...form.getInputProps(`accounts.${index}.accountValue`)}
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
          onClick={addAccount}
          radius={"xl"}
        >
          Add Account
        </Button>
      </Flex>
    </div>
  );
};
export default Accounts;
