import React, { useState } from "react";
import { Box, Flex, Grid, GridItem, Button, Text, useToast, chakra, VStack, Heading } from "@chakra-ui/react";
import { FaTimes, FaRegCircle } from "react-icons/fa";

const Index = () => {
  const toast = useToast();
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const winner = calculateWinner(board);

  const handleClick = (index) => {
    if (board[index] || winner) {
      return;
    }
    const boardCopy = [...board];
    boardCopy[index] = isXNext ? "X" : "O";
    setBoard(boardCopy);
    setIsXNext(!isXNext);
  };

  const handleReset = () => {
    setBoard(Array(9).fill(null));
    setIsXNext(true);
  };

  const renderSquare = (index) => {
    return (
      <GridItem w="100%" h="100%">
        <Button h="100%" w="100%" fontSize="5xl" variant="outline" onClick={() => handleClick(index)}>
          {board[index] === "X" && <FaTimes />}
          {board[index] === "O" && <FaRegCircle />}
        </Button>
      </GridItem>
    );
  };

  return (
    <VStack spacing={8} p={5}>
      <Heading as="h1" size="xl" textAlign="center">
        Tic-Tac-Toe
      </Heading>
      <Grid templateRows="repeat(3, 1fr)" templateColumns="repeat(3, 1fr)" gap={2} w="300px" h="300px">
        {Array(9)
          .fill(null)
          .map((_, index) => renderSquare(index))}
      </Grid>
      {winner &&
        toast({
          title: `Player ${winner} won!`,
          status: "success",
          duration: 3000,
          isClosable: true,
        })}
      <Button colorScheme="blue" onClick={handleReset}>
        New Game
      </Button>
    </VStack>
  );
};

const calculateWinner = (squares) => {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
};

export default Index;
