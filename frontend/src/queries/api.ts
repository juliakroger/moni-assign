import { useState, useEffect } from "react";
import axios from "axios";
import type { Address } from "viem";

axios.defaults.baseURL = "http://localhost:4000";

export const createTransaction = async (
  amount: string,
  walletAddress?: string
) => {
  try {
    const response = await axios.post("/transactions", {
      amount,
      token: "BNB",
      receiverWallet: walletAddress,
      date: new Date(),
    });
    return response.data;
  } catch (error) {
    console.error("Failed to create transaction", error);
    return null;
  }
};

export const updateTransaction = async (
  id: string,
  transactionHash: string,
  status: "PENDING" | "FAILED" | "APPROVED",
  senderWallet: Address
) => {
  try {
    const response = await axios.put(`/transaction/${id}`, {
      transactionHash,
      status,
      senderWallet,
    });

    return response.data;
  } catch (error) {
    console.error("Failed to update transaction", error);
    return null;
  }
};

export const useFetch = (endpoint: string) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<unknown>();
  const [data, setData] = useState<any>(null);

  const fetch = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(endpoint);
      setData(response.data);
    } catch (err) {
      setError(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetch();
  }, [endpoint]);

  return {
    data,
    isLoading,
    error,
    refetch: fetch,
  };
};
