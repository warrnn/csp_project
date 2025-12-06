import Swal from "sweetalert2";

const backgroundColor = "#0a0a14";
const textColor = "#fff";

export function SuccessResponse({ title, message }: { title: string, message: string }) {
    return (
        Swal.fire({
            title: title,
            text: message,
            icon: "success",
            background: backgroundColor,
            color: textColor
        })
    )
}

export function ErrorResponse({ message }: { message: string }) {
    return (
        Swal.fire({
            title: "Something went wrong",
            text: message,
            icon: "error",
            background: backgroundColor,
            color: textColor
        })
    )
}   