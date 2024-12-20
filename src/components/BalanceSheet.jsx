import React, { useState, useEffect } from "react";
import { Box, Heading, Text, List, ListItem, Flex, Spacer, Tag, Button } from "@chakra-ui/react";

const BalanceSheet = ({ friendsList, expenses }) => {
  const [settlements, setSettlements] = useState([]);

  // Calculate total expenses and per person share
  const totalExpenses = expenses.reduce((sum, expense) => sum + expense.amount, 0);
  const perPersonShare = totalExpenses / friendsList.length;

  // Calculate total amount paid by each friend
  const totalPaid = friendsList.reduce((acc, friend) => {
    acc[friend] = expenses
      .filter(expense => expense.payer === friend)
      .reduce((sum, expense) => sum + expense.amount, 0);
    return acc;
  }, {});

  // Calculate balance for each friend
  const balances = friendsList.reduce((acc, friend) => {
    acc[friend] = totalPaid[friend] - perPersonShare; // Initialize balance for each friend
    return acc;
  }, {});

  expenses.forEach((expense) => {
    const { payer, amount, sharedBy } = expense;

    if (!payer || !amount || !Array.isArray(sharedBy) || sharedBy.length === 0) {
      console.warn(`Expense has invalid data: ${JSON.stringify(expense)}`);
      return;
    }

    if (!friendsList.includes(payer)) {
      console.warn(`Expense payer is not in friends list: ${payer}`);
      return;
    }

    const splitAmount = amount / sharedBy.length;

    sharedBy.forEach((friend) => {
      if (!friendsList.includes(friend)) {
        console.warn(`Expense participant is not in friends list: ${friend}`);
        return;
      }
      balances[friend] -= splitAmount;
    });

    balances[payer] += amount; // Add the full amount to the payer's balance
  });

  // Determine who owes money to whom
  const getSettlements = () => {
    const creditors = Object.entries(balances)
      .filter(([_, balance]) => balance > 0)
      .sort((a, b) => b[1] - a[1]); // Sort creditors by balance descending
    const debtors = Object.entries(balances)
      .filter(([_, balance]) => balance < 0)
      .sort((a, b) => a[1] - b[1]); // Sort debtors by balance ascending

    const newSettlements = [];

    while (creditors.length && debtors.length) {
      const [creditor, creditAmount] = creditors.pop();
      const [debtor, debitAmount] = debtors.pop();

      const settlementAmount = Math.min(creditAmount, -debitAmount);

      newSettlements.push({
        from: debtor,
        to: creditor,
        amount: settlementAmount.toFixed(2),
      });

      if (creditAmount > settlementAmount) {
        creditors.push([creditor, creditAmount - settlementAmount]);
        creditors.sort((a, b) => b[1] - a[1]); // Re-sort creditors
      }

      if (-debitAmount > settlementAmount) {
        debtors.push([debtor, debitAmount + settlementAmount]);
        debtors.sort((a, b) => a[1] - b[1]); // Re-sort debtors
      }
    }

    setSettlements(newSettlements);
  };

  // Clear a specific settlement
  const clearSettlement = (index) => {
    const newSettlements = settlements.filter((_, i) => i !== index);
    setSettlements(newSettlements);
  };

  // Initial calculation of settlements when the component mounts
  useEffect(() => {
    getSettlements();
  }, [expenses]);

  return (
    <Box p={5} maxW="600px" mx="auto" boxShadow="lg" borderRadius="md" bg="gray.50">
      <Heading as="h2" size="lg" textAlign="center" mb={4}>
        Balance Sheet
      </Heading>

      <Text fontSize="lg" fontWeight="bold">
        Total Expenses: <Tag colorScheme="blue">₹{totalExpenses.toFixed(2)}</Tag>
      </Text>
      <Text fontSize="lg" fontWeight="bold" mb={4}>
        Per Person Share: <Tag colorScheme="blue">₹{perPersonShare.toFixed(2)}</Tag>
      </Text>

      <Heading as="h4" size="md" mt={4} mb={2}>
        Balances:
      </Heading>
      <List spacing={2}>
        {Object.entries(balances).map(([friend, balance]) => (
          <ListItem key={friend}>
            <Flex>
              <Text fontWeight="bold">{friend}:</Text>
              <Spacer />
              <Text color={balance < 0 ? "red.500" : "green.500"}>
                {balance >= 0 ? `+${balance.toFixed(2)}` : balance.toFixed(2)}
              </Text>
            </Flex>
          </ListItem>
        ))}
      </List>

      <Heading as="h4" size="md" mt={4} mb={2}>
        Settlements:
      </Heading>
      <List spacing={2}>
        {settlements.length > 0 ? (
          settlements.map((settlement, index) => (
            <ListItem key={index}>
              <Flex>
                <Text fontWeight="bold">{settlement.from}</Text>
                <Text ml={2}>owes</Text>
                <Text fontWeight="bold" ml={2}>{settlement.to}</Text>
                <Spacer />
                <Tag colorScheme="purple" mr={2}>₹{settlement.amount}</Tag>
                <Button size="sm" colorScheme="red" onClick={() => clearSettlement(index)}>
                  Clear
                </Button>
              </Flex>
            </ListItem>
          ))
        ) : (
          <ListItem>
            <Text>All expenses are settled.</Text>
          </ListItem>
        )}
      </List>
    </Box>
  );
};

export default BalanceSheet;


