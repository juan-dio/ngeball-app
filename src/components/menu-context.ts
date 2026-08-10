"use client";

import { createContext, useContext } from "react";

export type MenuId = "drawer" | "account";

export type MenuContextValue = {
  openMenu: MenuId | null;
  toggleMenu: (menu: MenuId) => void;
  close: () => void;
};

export const MenuContext = createContext<MenuContextValue | null>(null);

export function useMenu() {
  const context = useContext(MenuContext);
  if (!context) {
    throw new Error("useMenu must be used within a Navbar");
  }
  return context;
}
