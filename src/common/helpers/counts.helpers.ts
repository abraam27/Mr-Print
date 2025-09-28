export const counts = (logs: any[], field: string) => logs.reduce(
    (acc, log) => {
        acc[log[field]] = (acc[log[field]] || 0) + 1;
        return acc;
    },
    {} as Record<string, number>
);