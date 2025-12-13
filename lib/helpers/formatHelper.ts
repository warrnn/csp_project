export const formatRupiah = (value: number) => {
    return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        minimumFractionDigits: 0,
    }).format(value);
};

export const formatDateTimeEnUS = (value?: string) => {
    if (!value) return "-";

    const date = new Date(value);

    if (isNaN(date.getTime())) return "-";

    return new Intl.DateTimeFormat("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
        timeZone: "UTC",
        // timeZoneName: "short",
    }).format(date);
};

export const formatShortDateTimeEnUS = (value?: string) => {
    if (!value) return "-";

    const date = new Date(value);

    if (isNaN(date.getTime())) return "-";

    return new Intl.DateTimeFormat("en-US", {
        weekday: "short",
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
        timeZone: "UTC",
        // timeZoneName: "short",
    }).format(date);
};