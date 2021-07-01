import React from 'react'
import "../styles/_tools-title.scss"

export default function ToolsTitle({title}) {
    return (
        <div id="tools-title">
            <h2 style={{letterSpacing: "5px"}}>{title}</h2>
        </div>
    )
}
