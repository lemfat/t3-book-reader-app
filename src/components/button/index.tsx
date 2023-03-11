"use client"

import {Button} from '@mantine/core';
import {
    IconBarcode,
    IconBarcodeOff,
} from '@tabler/icons-react';

export function BarcodeButton({on, onClick}: {on: boolean, onClick: () => void}) {

return (
    <Button 
     variant="outline" 
     color={on ? "red" : "blue" }
     leftIcon={on ? <IconBarcodeOff size="0.9rem" /> : <IconBarcode size="0.9rem" />}
     onClick={onClick}
    >
        {on ? "停止": "起動"}
    </Button>
    );
}