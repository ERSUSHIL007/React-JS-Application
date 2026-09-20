"use client";

type ClientComponentProps = {
    children: React.ReactNode;
};

export default function ClientComponent({ children }: ClientComponentProps) {
    console.log("From ClientComponent!")
    return <>{children}</>;
}