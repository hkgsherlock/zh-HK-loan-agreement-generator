import React from 'react';
import LoanForm from './LoanForm/';
import DataInput from './LoanFormDataInput';
import LoanFormDataInput from './LoanFormDataInput';

import './App.css';

class App extends React.Component {
    constructor(prop) {
        super(prop);
        this.state = {
            data: {
                lender: {
                    name: '',
                    title: '',
                    hkid: '',
                    address: '',
                    bank: '',
                    account: '',
                },
                borrower: {
                    name: '',
                    title: '',
                    hkid: '',
                    address: '',
                },
                signDate: new Date(),
                amount: 0,
                interestRate: 0.0,
                startPayDate: new Date(),
                monthlyPayAmount: 0,
                monthlyPayDate: 1,
                durationMonths: 1,
            }
        }
    }

    render() {
        const { data } = this.state;

        return (
            <div className="container">
                <DataInput onNewState={(s) => this.setState({data: s})}/>
                <LoanForm {...data} />
            </div>
        );
    }
}

export default App;
