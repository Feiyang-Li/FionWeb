// intentded to create a decorative shortline

import React from "react";

type ShortLineProps = {
    length: string;
    color?: string;
    type?: "solid" | "dashed" | "dotted";
    thickness?: string;
    className?: string;
};

export default function ShortLine({
    length,
    color = "black",
    type = "solid",
    thickness = "2px",
    className = ""
}: ShortLineProps) {
    // ShortLine function create a short decorative Line.
    // Input parameters:
    // length: string -> length of the line (e.g., "50px", "30%")
    // color: string -> color of the line
    // type: "solid" | "dashed" | "dotted" -> type of the line
    // thickness: string -> thickness of the line
    return (
        <div className={className}
            style={{
                width: length,
                borderTop: `${thickness} ${type} ${color}`,
            }}
        />
    );


}
