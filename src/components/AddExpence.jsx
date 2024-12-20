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
} from "@chakra-ui/react";
import { DeleteIcon } from "@chakra-ui/icons";

function AddExpense({ friendsList, expenses, setExpenses }) {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [payer, setPayer] = useState("");

  const handleAddExpense = () => {
    if (title && parseFloat(amount) > 0 && payer) {
      const newExpense = {
        title,
        amount: parseFloat(amount),
        payer, // Include the payer field
      };
      const updatedExpenses = [...expenses, newExpense];
      setExpenses(updatedExpenses);
      setTitle("");
      setAmount("");
      setPayer(""); // Reset the payer field
    } else {
      alert("Please fill in all fields correctly.");
    }
  };

  const handleDeleteExpense = (index) => {
    const updatedExpenses = expenses.filter((_, idx) => idx !== index);
    setExpenses(updatedExpenses);
  };

  return (
    <Box mb={6} p={5} borderWidth={1} borderRadius="lg" boxShadow="md">
      <Text fontSize="xl" fontWeight="bold" mb={4}>
        Add Expense
      </Text>
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

      <Box mt={6} p={5} borderWidth={1} borderRadius="lg" boxShadow="md">
        <Table variant="striped" colorScheme="teal" size={useBreakpointValue({ base: "sm", md: "md" })}>
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

