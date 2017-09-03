import React from 'react';
import Container from './Container.jsx';

import './LenderBorrowerInformation.css';

const LenderBorrowerInformation = ({ section, sectionLevel, alias, name, title, hkid, address }) => {
    return (
        <div className="lender-borrower-info">
            {React.createElement(sectionLevel, {
                style: {
                    borderBottom: '1px #ccc solid',
                }
            }, `${section}（「${alias}」）`)}
            <table>
                <tbody>
                    <tr>
                        <th>姓名</th>
                        <td>{name}{title}</td>
                    </tr>
                    <tr>
                        <th>香港身分證號碼</th>
                        <td>{hkid}</td>
                    </tr>
                    <tr>
                        <th>住宅地址</th>
                        <td>{address}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
};

LenderBorrowerInformation.Container = Container;

LenderBorrowerInformation.defaultProps = {
    section: '身份',
    sectionLevel: 'h2',
    alias: '謂',
    name: '姓名',
    hkid: '香港身分證號碼',
    address: '住宅地址'
};

export default LenderBorrowerInformation;