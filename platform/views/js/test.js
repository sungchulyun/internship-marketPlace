/* eslint-disable prettier/prettier */
class ValueTransfer extends Component {
    constructor(props) {
      super(props)
      this.state = {
        from: props.from,
        to: '',         //받는 사람 계좌 주소
        value: '',        //보내는 토큰 양
        gas: 3000000,           //상한선
        txHash: null,         //거래내역 볼 때 클레이튼 스코프에서 활용  
        receipt: null,
        error: null,
        rawTransaction: null,
      }
                                                                                                                                                                                              }
  
    static getDerivedStateFromProps = (nextProps, prevState) => {
      if (nextProps.from !== prevState.from) {
        return { from: nextProps.from }
      }
      return null
    }
  
    handleChange = (e) => {
      this.setState({
        [e.target.name]: e.target.value,
      })
    }
  
    signTransaction = () => {
      const { from, to, value, gas } = this.state
  
      caver.klay.sendTransaction({
        type: 'VALUE_TRANSFER',
        from,
        to,
        value: caver.utils.toPeb(value.toString(), 'KLAY'),
        gas,  
      })
        .once('transactionHash', (transactionHash) => {
          console.log('txHash', transactionHash)
          this.setState({ txHash: transactionHash })
        })
        .once('receipt', (receipt) => {
          console.log('receipt', receipt)
          this.setState({ receipt: JSON.stringify(receipt) })
        })
        .once('error', (error) => {
          console.log('error', error)
          this.setState({ error: error.message })
        })
    }
    
    render() {
      const { from, to, value, gas, txHash, receipt, error } = this.state
  
      return ( <div class="VALUE_TRANSFER">
          <Input name="from" label="From" value={from} onChange={this.handleChange} placeholder="From Address"/>
          <Input name="to" label="To" value={to} onChange={this.handleChange} placeholder="To Address"/>
          <Input name="value" label="Value" value={value} onChange={this.handleChange} placeholder="Value (KLAY)"/>
          <Input name="gas" label="Gas" value={gas} onChange={this.handleChange} placeholder="Gas (Peb)" />
          <Button title="Sign Transaction" onClick={this.signTransaction} />
          <TxResult txHash={txHash} receipt={receipt} error={error}/>
        </div>

      )
    }
  }