import React, { useState } from "react";
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Box,
  VStack,
  Select,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableCaption,
  Text,
  useBreakpointValue,
  IconButton,
  Tooltip,
  useMediaQuery,
} from "@chakra-ui/react";
import { DeleteIcon } from "@chakra-ui/icons";

function AddExpense({ friendsList, expenses, setExpenses }) {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [payer, setPayer] = useState("");
  const [isLargerThanMD] = useMediaQuery("(min-width: 48em)");

  const handleAddExpense = () => {
    if (title && parseFloat(amount) > 0 && payer) {
      const newExpense = {
        title,
        amount: parseFloat(amount),
        payer,
      };
      const updatedExpenses = [...expenses, newExpense];
      setExpenses(updatedExpenses);
      setTitle("");
      setAmount("");
      setPayer("");
    } else {
      alert("Please fill in all fields correctly.");
    }
  };

  const handleDeleteExpense = (index) => {
    const updatedExpenses = expenses.filter((_, idx) => idx !== index);
    setExpenses(updatedExpenses);
  };

  return (
    <Box mb={6} p={{ base: 3, md: 5 }} borderWidth={1} borderRadius="lg" boxShadow="md">
      <Text fontSize={{ base: "lg", md: "xl" }} fontWeight="bold" mb={4}>
        Add Expense
      </Text>
      <VStack spacing={4}>
        <FormControl mb={4}>
          <FormLabel>Expense Title</FormLabel>
          <Input
            placeholder="Enter Expense Title (e.g., Hotel)"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </FormControl>
        <FormControl mb={4}>
          <FormLabel>Amount</FormLabel>
          <Input
            type="number"
            placeholder="Enter Amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            min="0.01"
          />
        </FormControl>
        <FormControl mb={4}>
          <FormLabel>Select Payer</FormLabel>
          <Select
            placeholder="Select Payer"
            value={payer}
            onChange={(e) => setPayer(e.target.value)}
          >
            {friendsList.map((friend, index) => (
              <option key={index} value={friend}>
                {friend}
              </option>
            ))}
          </Select>
        </FormControl>
        <Button colorScheme="teal" onClick={handleAddExpense} width="full">
          Add Expense
        </Button>
      </VStack>

      <Box mt={6} p={{ base: 3, md: 5 }} borderWidth={1} borderRadius="lg" boxShadow="md" overflowX="auto">
  <Table
    variant="striped"
    colorScheme="teal"
    size="sm"
    minWidth="max-content" // Ensures that the table's width adjusts based on its content
  >
    <TableCaption>Expense List</TableCaption>
    <Thead>
      <Tr>
        <Th>Expense Title</Th>
        <Th isNumeric>Amount</Th>
        <Th>Payer</Th>
        <Th>Actions</Th>
      </Tr>
    </Thead>
    <Tbody>
      {expenses.map((expense, index) => (
        <Tr key={index}>
          <Td>{expense.title}</Td>
          <Td isNumeric>₹{expense.amount.toFixed(2)}</Td>
          <Td>{expense.payer}</Td>
          <Td>
            <Tooltip label="Delete Expense" aria-label="Delete Expense">
              <IconButton
                icon={<DeleteIcon />}
                colorScheme="red"
                onClick={() => handleDeleteExpense(index)}
                size="sm"
                aria-label="Delete Expense"
              />
            </Tooltip>
          </Td>
        </Tr>
      ))}
    </Tbody>
  </Table>
</Box>


    </Box>
  );
}

export default AddExpense;