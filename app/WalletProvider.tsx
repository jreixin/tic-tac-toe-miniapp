"use client";
import React, { createContext, useContext, useEffect, useState, ReactNode } from "react";

// EIP-6963 event types
type EIP6963Provider = {
  request: (args: { method: string; params?: unknown[] }) => Promise<unknown>;
  on?: (event: string, handler: (...args: unknown[]) => void) => void;
  removeListener?: (event: string, handler: (...args: unknown[]) => void) => void;
};
type EIP6963Info = {
  uuid: string;
  name: string;
  icon: string;
  rdns: string;
};
declare global {
  interface Window {
    ethereum?: EIP6963Provider;
    addEventListener(
      event: "eip6963:announceProvider",
      handler: (event: CustomEvent<{ provider: EIP6963Provider; info: EIP6963Info }>) => void
    ): void;
    removeEventListener(
      event: "eip6963:announceProvider",
      handler: (event: CustomEvent<{ provider: EIP6963Provider; info: EIP6963Info }>) => void
    ): void;
    dispatchEvent(event: CustomEvent): boolean;
  }
}

interface WalletInfo {
  provider: EIP6963Provider;
  info: EIP6963Info;
}

interface WalletContextType {
  wallets: WalletInfo[];
  selectedWallet: WalletInfo | null;
  isReady: boolean;
  connect: (wallet: WalletInfo) => void;
  disconnect: () => void;
}

const WalletContext = createContext<WalletContextType | undefined>(undefined);

export function WalletProvider({ children }: { children: ReactNode }) {
  const [wallets, setWallets] = useState<WalletInfo[]>([]);
  const [selectedWallet, setSelectedWallet] = useState<WalletInfo | null>(null);
  const [isReady, setIsReady] = useState(false);

  // Discover EIP-6963 wallets
  useEffect(() => {
    const discovered: Record<string, WalletInfo> = {};
    function onAnnounceProvider(event: CustomEvent<{ provider: EIP6963Provider; info: EIP6963Info }>) {
      const { provider, info } = event.detail;
      if (!discovered[info.uuid]) {
        discovered[info.uuid] = { provider, info };
        setWallets((prev) => [...prev, { provider, info }]);
      }
    }
    window.addEventListener("eip6963:announceProvider", onAnnounceProvider);
    // Request providers to announce themselves
    window.dispatchEvent(new CustomEvent("eip6963:requestProvider"));
    return () => {
      window.removeEventListener("eip6963:announceProvider", onAnnounceProvider);
    };
  }, []);

  // Connect to a wallet
  const connect = async (wallet: WalletInfo) => {
    setSelectedWallet(wallet);
    try {
      // Request accounts (triggers wallet connect UI)
      await wallet.provider.request({ method: "eth_requestAccounts" });
      setIsReady(true);
    } catch {
      setIsReady(false);
      setSelectedWallet(null);
    }
  };

  // Disconnect
  const disconnect = () => {
    setSelectedWallet(null);
    setIsReady(false);
  };

  // Listen for provider events
  useEffect(() => {
    if (!selectedWallet) return;
    const provider = selectedWallet.provider;
    const handleAccountsChanged = (...args: unknown[]) => {
      const accounts = Array.isArray(args[0]) ? args[0] as string[] : [];
      if (!accounts.length) disconnect();
    };
    const handleChainChanged = () => {
      setIsReady(false);
      setTimeout(() => setIsReady(true), 100); // re-ready after chain change
    };
    provider.on?.("accountsChanged", handleAccountsChanged);
    provider.on?.("chainChanged", handleChainChanged);
    return () => {
      provider.removeListener?.("accountsChanged", handleAccountsChanged);
      provider.removeListener?.("chainChanged", handleChainChanged);
    };
  }, [selectedWallet]);

  return (
    <WalletContext.Provider value={{ wallets, selectedWallet, isReady, connect, disconnect }}>
      {children}
    </WalletContext.Provider>
  );
}

export function useWallet() {
  const ctx = useContext(WalletContext);
  if (!ctx) throw new Error("useWallet must be used within WalletProvider");
  return ctx;
}
