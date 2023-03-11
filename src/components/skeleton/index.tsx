"use client"

import { Skeleton as MantineSkeleton } from "@mantine/core"

const Skeleton = () => {
    return (
        <>
        <MantineSkeleton height={50} circle mb="xl" />
        <MantineSkeleton height={8} radius="xl" />
        <MantineSkeleton height={8} mt={6} radius="xl" />
        <MantineSkeleton height={8} mt={6} width="70%" radius="xl" />
      </>
    )
}

export default Skeleton