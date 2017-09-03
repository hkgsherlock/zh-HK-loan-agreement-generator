import React from 'react';
import { Grid } from 'semantic-ui-react';

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
            <Grid>
                <Grid.Row>
                    <Grid.Column width={6}>
                        <DataInput onNewState={(s) => this.setState({data: s})}/>
                    </Grid.Column>
                    <Grid.Column width={10}>
                        <LoanForm {...data} />
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        );
    }
}

export default App;
