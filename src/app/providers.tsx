"use client";

import React, { type ReactNode } from "react";
import { MantineProvider } from "@mantine/core";
import { ModalsProvider } from '@mantine/modals';

interface IProviders {
  children: ReactNode;
}

const Providers = ({ children }: IProviders) => {
  return (
    <MantineProvider withGlobalStyles withNormalizeCSS theme={{
      colorScheme: 'dark'
    }}>
      <ModalsProvider>
        {children}
      </ModalsProvider>
    </MantineProvider>
  );
};

export default Providers;