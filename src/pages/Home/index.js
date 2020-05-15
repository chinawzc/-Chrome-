import React from 'react';

import {translateWord, clipboard} from '../../../services/trans';

import {Input} from 'antd';

const placeHolder = 'please input xxxx';

class Home extends React.Component {
    state = {

    }

    onTrans = (value) => {
        translateWord(value || placeHolder).then(res => {
            this.setState({
                transResult: res.data.trans_result
            });
            const value = res.data.trans_result && res.data.trans_result[0] && res.data.trans_result[0].dst;
            value && clipboard(value);
        });
    }

    render() {
        const {transResult = []} = this.state;
        return (
            <div style={{width: '420px', minHeight: '260px', padding: '20px'}}>
                <h1>Hi! Welcome to SmartTrans!</h1>
                <br />
                <Input.Search
                    placeholder={placeHolder}
                    enterButton="Trans"
                    size="large"
                    onSearch={value => this.onTrans(value)}
                />
                <br />
                <br />
                {
                    transResult.map(item => {
                        return <div key={item}>{item.dst}</div>
                    })
                }
            </div>
        );
    }
}

export default Home;
