import React from "react";
import { Scrollbars } from 'react-custom-scrollbars';

const renderThumb = ({ style, ...props }) => {
    const thumbStyle = {
        borderRadius: 6,
        backgroundColor: 'rgba(35, 49, 86, 0.5)'
    };
    return <div style={{ ...style, ...thumbStyle }} {...props} />;
};

const CustomScrollbars = props => (
    <Scrollbars
        renderThumbHorizontal={renderThumb}
        {...props}
    />
);

export const ScrollBar: React.FC = (props) => {

    return (
        <CustomScrollbars autoHide autoHideTimeout={500} autoHideDuration={200}>
            {props.children}
        </CustomScrollbars>
    )

}
