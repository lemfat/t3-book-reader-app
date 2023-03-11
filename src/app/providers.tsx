"use client";

import React, { type ReactNode } from "react";
import { MantineProvider } from "@mantine/core";

interface IProviders {
  children: ReactNode;
}

const Providers = ({ children }: IProviders) => {
  return (
    <MantineProvider withGlobalStyles withNormalizeCSS theme={{
      colorScheme: 'dark'
    }}>
      {children}
    </MantineProvider>
  );
};

export default Providers;