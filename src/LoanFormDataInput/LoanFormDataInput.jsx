import React from 'react';
import { Form, Button, Icon, Input, TextArea, Segment, Grid } from 'semantic-ui-react';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';
import './LoanFormDataInput.css'

class LoanFormDataInput extends React.Component {
    constructor(prop) {
        super(prop);
        this.state = {
            lender_name: '',
            lender_title: '',
            lender_hkid: '',
            lender_address: '',
            lender_bank: '',
            lender_account: '',
            borrower_name: '',
            borrower_title: '',
            borrower_hkid: '',
            borrower_address: '',
            signDate: null,
            amount: 0,
            interestRate: 0.0,
            penaltyRate: 0.0,
            startPayDate: null,
            monthlyPayAmount: 0.0,
            monthlyPayDate: 1,
            durationMonths: 1,
        };
    }

    outputFatherStateObject() {
        return {
            lender: {
                name: this.state.lender_name,
                title: this.state.lender_title,
                hkid: this.state.lender_hkid,
                address: this.state.lender_address,
                bank: this.state.lender_bank,
                account: this.state.lender_account,
            },
            borrower: {
                name: this.state.borrower_name,
                title: this.state.borrower_title,
                hkid: this.state.borrower_hkid,
                address: this.state.borrower_address,
            },
            signDate: (this.state.signDate || moment()).toDate(),
            amount: this.state.amount,
            interestRate: this.state.interestRate,
            penaltyRate: this.state.penaltyRate,
            startPayDate: (this.state.startPayDate || moment()).toDate(),
            monthlyPayAmount: this.state.monthlyPayAmount,
            monthlyPayDate: this.state.monthlyPayDate,
            durationMonths: this.state.durationMonths,
        };
    }

    handleChange(field, e) {
        this.setState({ [field]: e.target.value });
    }

    handleDateChange(field, date) {
        this.setState({
            [field]: date
        });
    }

    pushNewDataToFather() {
        this.props.onNewState && this.props.onNewState(this.outputFatherStateObject());
    }

    render() {
        const refresh = this.pushNewDataToFather.bind(this);

        return (
            <Segment className="data-input" color='orange'>
                <Form className="form">
                    <Segment.Group>
                        <Segment inverted color='yellow'>
                            <h4>借款資料</h4>
                        </Segment>
                        <Segment.Group horizontal>
                            <Segment>
                                <Input fluid icon='money' iconPosition='left' placeholder='金額（港幣）' onChange={(e) => this.handleChange('amount', e)} />
                            </Segment>
                            <Segment>
                                <Input fluid icon='percent' iconPosition='left' placeholder='利息（年利率）' onChange={(e) => this.handleChange('interestRate', e)} />
                            </Segment>
                            <Segment>
                                <Input fluid icon='exclamation circle' iconPosition='left' placeholder='罰息（年利率）' onChange={(e) => this.handleChange('penaltyRate', e)} />
                            </Segment>
                        </Segment.Group>
                        <Segment.Group horizontal>
                            <Segment>
								<Grid>
									<Grid.Column width={2}>
			                            <Icon.Group fitted>
											<Icon name='money' fitted circular inverted color='teal' />
											<Icon corner name='add' color='teal' />
										</Icon.Group>
									</Grid.Column>
									<Grid.Column width={14}>
		                                <DatePicker
		                                    placeholderText="簽約日期"
		                                    todayButton={"今日"}
		                                    dateFormat="YYYY 年 MM 月 DD 日"
		                                    selected={this.state.signDate}
		                                    minDate={moment().startOf('date')}
		                                    maxDate={moment(this.state.startPayDate).startOf('date').subtract(1, 'days')}
		                                    onChange={(e) => this.handleDateChange('signDate', e)}
		                                />
									</Grid.Column>
								</Grid>
                            </Segment>
                            <Segment>
								<Grid>
									<Grid.Column width={2}>
										<Icon.Group fitted>
											<Icon name='money' fitted circular inverted color='pink' />
											<Icon corner name='minus' color='pink' />
										</Icon.Group>
									</Grid.Column>
									<Grid.Column width={14}>
		                                <DatePicker
		                                    placeholderText="開始還款日期"
		                                    todayButton={"今日"}
		                                    dateFormat="YYYY 年 MM 月 DD 日"
		                                    selected={this.state.startPayDate}
		                                    minDate={moment(this.state.signDate).startOf('date').add(1, 'days')}
		                                    onChange={(e) => this.handleDateChange('startPayDate', e)}
		                                />
									</Grid.Column>
								</Grid>
                            </Segment>
                        </Segment.Group>
                        <Segment.Group horizontal>
                            <Segment>
                                <Input fluid icon='pointing right' iconPosition='left' placeholder='每月還款金額' onChange={(e) => this.handleChange('monthlyPayAmount', e)} />
                            </Segment>
                            <Segment>
                                <Input fluid icon='repeat' iconPosition='left' placeholder='每月還款日' onChange={(e) => this.handleChange('monthlyPayDate', e)} />
                            </Segment>
                            <Segment>
                                <Input fluid icon='resize horizontal' iconPosition='left' placeholder='還款期數' onChange={(e) => this.handleChange('durationMonths', e)} />
                            </Segment>
                        </Segment.Group>
                    </Segment.Group>
                    <Segment.Group>
                        <Segment inverted color='blue'>
                            <h4>貸款人</h4>
                        </Segment>
                        <Segment.Group horizontal>
                            <Segment>
                                <Input fluid icon='user' iconPosition='left' placeholder='姓名' onChange={(e) => this.handleChange('lender_name', e)} />
                            </Segment>
                            <Segment>
                                <Input fluid icon='black tie' iconPosition='left' placeholder='稱謂' onChange={(e) => this.handleChange('lender_title', e)} />
                            </Segment>
                            <Segment>
                                <Input fluid icon='id card' iconPosition='left' placeholder='香港身分證號碼' onChange={(e) => this.handleChange('lender_hkid', e)} />
                            </Segment>
                        </Segment.Group>
                        <Segment>
                            <TextArea placeholder='地址' onChange={(e) => this.handleChange('lender_address', e)} />
                        </Segment>
                        <Segment.Group horizontal>
                            <Segment>
                                <Input fluid icon='building outline' iconPosition='left' placeholder='入數銀行' onChange={(e) => this.handleChange('lender_bank', e)} />
                            </Segment>
                            <Segment>
                                <Input fluid icon='hashtag' iconPosition='left' placeholder='戶口號碼' onChange={(e) => this.handleChange('lender_account', e)} />
                            </Segment>
                        </Segment.Group>
                    </Segment.Group>
                    <Segment.Group>
                        <Segment inverted color='red'>
                            <h4>借款人</h4>
                        </Segment>
                        <Segment.Group horizontal>
                            <Segment>
                                <Input fluid icon='user' iconPosition='left' placeholder='姓名' onChange={(e) => this.handleChange('borrower_name', e)} />
                            </Segment>
                            <Segment>
                                <Input fluid icon='black tie' iconPosition='left' placeholder='稱謂' onChange={(e) => this.handleChange('borrower_title', e)} />
                            </Segment>
                            <Segment>
                                <Input fluid icon='id card' iconPosition='left' placeholder='香港身分證號碼' onChange={(e) => this.handleChange('borrower_hkid', e)} />
                            </Segment>
                        </Segment.Group>
                        <Segment>
                            <TextArea placeholder='地址' onChange={(e) => this.handleChange('borrower_address', e)} />
                        </Segment>
                    </Segment.Group>
                    <Button animated='fade' fluid color="green" onClick={refresh}>
                        <Button.Content visible>
                            <Icon name="refresh" />
                        </Button.Content>
                        <Button.Content hidden>
                            更新資料
                        </Button.Content>
                    </Button>
                </Form>
            </Segment>
        )
    }
}

LoanFormDataInput.defaultProps = {
    onNewState: null
};

export default LoanFormDataInput;