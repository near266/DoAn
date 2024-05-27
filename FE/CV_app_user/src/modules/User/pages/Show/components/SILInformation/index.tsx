import { Component } from 'react';

import { httpClient } from '@/core';
import './styles.scss';

export class SILInformation extends Component<any, any> {
  constructor(props) {
    super(props);
    this.state = {
      status: {
        show: false,
      },
      isLoading: true,
    };
  }

  componentDidMount() {
    this.getUserData();
  }

  async getUserData() {
    const response = await httpClient.get('sil/get-status');
    const res = response.data;
    if (res?.code === 'SUCCESS') {
      // set state
      this.setState({
        status: res.payload,
        roundTwo: res.payload.round_two_obj,
        isLoading: false,
      });
    }
  }

  render() {
    return (
      !this.state.isLoading &&
      this.state.status.show && (
        <div className="rc-sil-information">
          <div className="area-status">
            <span className="title">Vòng thi SiL</span>
            <span>Trạng thái</span>
          </div>
          <div className="area">
            <span className="title">Test online:</span>
            {this.state.status.start_test_online ? (
              <a href="/sil/start">Bắt đầu</a>
            ) : (
              <span>Hoàn thành</span>
            )}
          </div>
          <div className="area">
            <span className="title">Video:</span>
            {this.state.status.start_video ? (
              <a href="/sil/round-two" target="_blank">
                Bắt đầu
              </a>
            ) : (
              <span>Đóng</span>
            )}
          </div>
        </div>
      )
    );
  }
}

export default SILInformation;
