import React, { ReactElement, useContext, useState } from 'react';
import '../styles.scss';
import { RootContext } from '../../RootContext';
import { lineSelectKeys } from '../Buttons';
import { useInteractionEvent } from '../../../Common/hooks';

export enum lineSides {
    left = 'line-left',
    right = 'line-right',
    center = 'line-center'
}

export enum lineSizes {
    small = 's-text',
    regular = '',
}

export enum lineColors {
    white = 'white',
    inop = 'inop',
    cyan = 'cyan',
    yellow = 'yellow',
    green = 'green',
    amber = 'amber',
    red = 'red',
    magenta = 'magenta'
}

type LineProps = {
    value?: ReactElement,
    leftSide?: ReactElement,
    rightSide?: ReactElement,
    lsk?: lineSelectKeys,
}

/**
 * A Line component that can handle split fields and single value fields. This is a composite component with which to
 * insert <span /> components into.
 * @param value Used for single value fields, ReactElement should return a <span />.
 * @param leftSide Used for the left side of a split field, should return a <span />
 * @param rightSide Used for the right side of a split field, should return a <span />
 * @param lsk Line select key, used for split fields
 * @constructor
 */
export const Line: React.FC<LineProps> = ({ lsk, value, leftSide, rightSide }) => {
    const [scratchpad, , , ] = useContext(RootContext); // eslint-disable-line array-bracket-spacing
    const [leftValue, setLeftValue] = useState(undefined);
    const [rightValue, setRightValue] = useState(undefined);

    function splitScratchpadValue() {
        let [leftValue, rightValue] = scratchpad.split('/');

        if (leftValue.length <= 0) {
            leftValue = undefined;
        }
        if (rightValue) {
            if (rightValue.length <= 0) {
                rightValue = undefined;
            }
        }

        return [leftValue, rightValue];
    }
    if (lsk) {
        useInteractionEvent(lsk, () => {
            const [lVal, rVal] = splitScratchpadValue();
            setLeftValue(lVal);
            setRightValue(rVal);
        });
    }

    function handleSplitLine() {
        let returnVal = value;
        if (leftSide && rightSide) {
            returnVal = (
                <>
                    {React.cloneElement(leftSide, { value: leftValue })}
                    /
                    {React.cloneElement(rightSide, { value: rightValue })}
                </>
            );
        }
        return returnVal;
    }
    return (
        <>
            <p className="line">
                {handleSplitLine()}
            </p>
        </>
    );
};
