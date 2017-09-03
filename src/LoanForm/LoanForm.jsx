import React from 'react';
import StringUtils from '../utils/StringUtils.js';
import InfoBox from '../LenderBorrowerInformation/';
import Signing from '../Signing/';
import './LoanForm.css';

const LoanForm = ({
    lender,
    borrower,
    signDate,
    amount,
    interestRate,
    penaltyRate,
    startPayDate,
    monthlyPayAmount,
    monthlyPayDate,
    durationMonths,
}) => {
    const tillDate = new Date(startPayDate);
    tillDate.setMonth(tillDate.getMonth() + durationMonths);

    return (
        <div className='paper'>
            <div className="loan-form">
                <h1 className="title">借款協議／合約</h1>

                <InfoBox.Container>
                    <InfoBox section="借款人" alias="甲方" {...lender} />
                    <InfoBox section="貸款人" alias="乙方" {...borrower} />
                </InfoBox.Container>

                <p>以上兩人為簽立協議／合約的雙方，現雙方同意如下:</p>

                <ol>
                    <li>乙方現將{StringUtils.HongKongDollarsPreventLineBreak(amount)}貸予甲方，並即時將全數金額現金{StringUtils.HongKongDollarsPreventLineBreak(amount)}交予甲方；</li>
                    <li>甲方承諾支付貸款的利息，而該利息以年利率 {interestRate}% （每月平息）的方式來計算；</li>
                    <li>甲方承諾於{StringUtils.ChineseDateString(startPayDate)}起，每月 {monthlyPayDate} 日（「還款日」）將每月還款金額{StringUtils.HongKongDollarsPreventLineBreak(monthlyPayAmount)}
                        存入乙方之<em>{lender.bank}</em>帳戶號碼：<code>{lender.account}</code>，為期 {durationMonths} 個月，直至{StringUtils.ChineseDateString(tillDate)}為止；</li>
                    <li>甲方如於還款日未能準時還款，乙方有權以年利率 {penaltyRate}% 於逾期未還之金額之上額外計算「附加利息」，甲方承諾同意承擔及支付因逾期還款而引致的「附加利息」；及</li>
                    <li>雙方同意本協議／合約於香港境內簽立，亦同意一切因本協議／合約之糾紛均以香港之法律來解決。</li>
                </ol>

                <h2>立協議／合約人簽署：</h2>
                <p>本人完全明白及同意遵守以上條款，並確認現已從{lender.name}{lender.title}收訖現金{StringUtils.HongKongDollarsPreventLineBreak(amount)}：</p>

                <Signing>{borrower.name}{borrower.title}（「甲方」）</Signing>

                <p>本人完全明白及同意遵守以上條款：</p>

                <Signing>{lender.name}{lender.title}（「乙方」）</Signing>

                <p>簽立日期：{StringUtils.ChineseDateString(signDate)}</p>
            </div>
        </div>
    );
};

export default LoanForm;