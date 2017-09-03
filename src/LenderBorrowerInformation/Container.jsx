import React from 'react';

const Container = ({ children }) => {
    return (
        <div className="lender-borrower-info-container">
            {children}
        </div>
    );
};

export default Container;