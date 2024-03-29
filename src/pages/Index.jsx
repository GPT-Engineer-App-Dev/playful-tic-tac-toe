import React, { useState } from "react";
import { Box, Flex, Grid, GridItem, Button, Text, useToast, chakra, VStack, Heading } from "@chakra-ui/react";
import { FaTimes, FaRegCircle } from "react-icons/fa";

import { Switch, FormLabel } from "@chakra-ui/react";

const Index = () => {
  const toast = useToast();
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);

  const winner = calculateWinner(board);

  const minimax = (board, depth, isMaximizingPlayer) => {
    const winner = calculateWinner(board);

    if (winner === "X") return -1;
    if (winner === "O") return 1 - depth / 10;
    if (isBoardFull(board)) return 0;

    if (isMaximizingPlayer) {
      let bestScore = -Infinity;
      for (let i = 0; i < board.length; i++) {
        if (board[i] === null) {
          board[i] = "O";
          let score = minimax(board, depth + 1, false);
          board[i] = null;
          bestScore = Math.max(score, bestScore);
        }
      }
      return bestScore;
    } else {
      let bestScore = Infinity;
      for (let i = 0; i < board.length; i++) {
        if (board[i] === null) {
          board[i] = "X";
          let score = minimax(board, depth + 1, true);
          board[i] = null;
          bestScore = Math.min(score, bestScore);
        }
      }
      return bestScore;
    }
  };

  const makeAIMove = () => {
    let bestScore = -Infinity;
    let move;
    for (let i = 0; i < board.length; i++) {
      if (board[i] === null) {
        board[i] = "O";
        let score = minimax(board, 0, false);
        board[i] = null;
        if (score > bestScore) {
          bestScore = score;
          move = i;
        }
      }
    }
    if (move !== undefined) handleClick(move, true);
  };

  const isBoardFull = (board) => {
    return board.every((value) => value !== null);
  };

  const handleClick = (index, isAI = false) => {
    if (board[index] || winner || (!isAI && !isXNext)) {
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
        <Button h="100%" w="100%" fontSize="5xl" color={board[index] === "X" ? "red.500" : "blue.500"} variant="solid" onClick={() => handleClick(index)}>
          {board[index] === "X" && <FaTimes />}
          {board[index] === "O" && <FaRegCircle />}
        </Button>
      </GridItem>
    );
  };

  return (
    <VStack spacing={8} p={5}>
      <Heading as="h1" size="xl" textAlign="center">
        Play Tic-Tac-Toe against the AI
      </Heading>
      <Grid templateRows="repeat(3, 1fr)" templateColumns="repeat(3, 1fr)" gap={2} w="300px" h="300px">
        {Array(9)
          .fill(null)
          .map((_, index) => renderSquare(index))}
      </Grid>
      {winner
        ? toast({
            title: `Player ${winner} won!`,
            status: "success",
            duration: 3000,
            isClosable: true,
          })
        : isBoardFull(board) &&
          !winner &&
          toast({
            title: `It's a tie!`,
            status: "info",
            duration: 3000,
            isClosable: true,
          })}

      <Button colorScheme="green" onClick={handleReset}>
        New Game
      </Button>
      {isXNext === false && makeAIMove()}
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
