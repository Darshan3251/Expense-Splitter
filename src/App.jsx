import React, { useState, useEffect } from "react";
import {
  Box,
  Heading,
  Input,
  Button,
  VStack,
  FormControl,
  FormLabel,
  Text,
  HStack,
  IconButton,
} from "@chakra-ui/react";
import { DeleteIcon } from "@chakra-ui/icons";
import AddExpense from "./components/AddExpence";
import BalanceSheet from "./components/BalanceSheet";

function App() {
  const [tripname, setTripname] = useState("");
  const [friendsName, setFriendsName] = useState("");
  const [friendsList, setFriendsList] = useState([]);
  const [expenses, setExpenses] = useState([]);

  // Retrieve data from local storage on component mount
  useEffect(() => {
    const storedTripName = localStorage.getItem("tripname");
    const storedFriendsList = localStorage.getItem("friendsList");
    const storedExpenses = localStorage.getItem("expenses");

    if (storedTripName) setTripname(storedTripName);
    if (storedFriendsList) setFriendsList(JSON.parse(storedFriendsList));
    if (storedExpenses) setExpenses(JSON.parse(storedExpenses));
  }, []);

  // Update tripname and persist to local storage
  const handleTripNameChange = (e) => {
    const value = e.target.value;
    setTripname(value);
    localStorage.setItem("tripname", value);
  };

  // Add a new friend and persist to local storage
  const handleAddFriend = () => {
    if (friendsName && !friendsList.includes(friendsName)) {
      const updatedFriendsList = [...friendsList, friendsName];
      setFriendsList(updatedFriendsList);
      setFriendsName("");
      localStorage.setItem("friendsList", JSON.stringify(updatedFriendsList));
    }
  };

  // Delete a friend and update local storage
  const handleDeleteFriend = (index) => {
    const updatedFriendsList = friendsList.filter((_, i) => i !== index);
    setFriendsList(updatedFriendsList);
    localStorage.setItem("friendsList", JSON.stringify(updatedFriendsList));
  };

  // Update expenses and persist to local storage
  const handleSetExpenses = (newExpenses) => {
    setExpenses(newExpenses);
    localStorage.setItem("expenses", JSON.stringify(newExpenses));
  };

  return (
    <Box
      p={6}
      maxW="800px"
      mx="auto"
      textAlign="center"
      borderWidth={1}
      borderRadius="lg"
      boxShadow="md"
    >
      <Heading mb={4} color="teal.500">
        Expense Splitter
      </Heading>

      <FormControl mb={6}>
        <FormLabel htmlFor="tripname" fontSize="lg">
          Trip Name
        </FormLabel>
        <Input
          id="tripname"
          placeholder="Enter Trip Name"
          value={tripname}
          onChange={handleTripNameChange}
          borderColor="teal.300"
        />
      </FormControl>

      <VStack align="stretch" spacing={4} mb={6}>
        <FormControl>
          <FormLabel htmlFor="friendsname" fontSize="lg">
            Add Friends
          </FormLabel>
          <Input
            id="friendsname"
            placeholder="Enter Friend's Name"
            value={friendsName}
            onChange={(e) => setFriendsName(e.target.value)}
            borderColor="teal.300"
          />
        </FormControl>
        <Button colorScheme="teal" onClick={handleAddFriend} width="full">
          Add Friend
        </Button>
      </VStack>

      <Box mb={6}>
        <Heading size="md" mb={2} color="teal.600">
          Friends List for {tripname}
        </Heading>
        {friendsList.length > 0 ? (
          <ul style={{ listStyleType: "none", padding: 0, margin: 0 }}>
            {friendsList.map((friend, index) => (
              <HStack
                key={index}
                justify="space-between"
                align="center"
                mb={2}
                borderBottom="1px solid"
                borderColor="gray.200"
                pb={2}
              >
                <Text fontSize="lg" fontWeight="medium">
                  {friend}
                </Text>
                <IconButton
                  icon={<DeleteIcon />}
                  colorScheme="red"
                  size="sm"
                  onClick={() => handleDeleteFriend(index)}
                  aria-label="Delete Friend"
                />
              </HStack>
            ))}
          </ul>
        ) : (
          <Text>No Friends Added</Text>
        )}
      </Box>

      <AddExpense friendsList={friendsList} expenses={expenses} setExpenses={handleSetExpenses} />
      <BalanceSheet friendsList={friendsList} expenses={expenses} />
    </Box>
  );
}

export default App;







