import React from "react";
import { useSelector } from "react-redux";


export const ControlPanel = () => {
    const information = useSelector(state => state.information.value);

    const { message, isEnemy } = information;

    return <div id="control-panel">
        <div id="control-panel-left">{message}</div>
        <div id="control-panel-right">
            {isEnemy && <button>Start Battle</button>}
        </div>
    </div>
};