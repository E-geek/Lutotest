import * as React from "react";
import { requestData, ResponseItem } from '../lib/server'

export interface IProps {
  compiler: string;
  framework: string;
}

export interface IState {
  param1?: Array<number>;
  param2?: Array<number>;
  param3?: Array<number>;
}

export class Home extends React.Component<IProps, IState> {
  state: IState = {
    param1: undefined,
    param2: undefined,
    param3: undefined,
  }
  componentDidMount() {
    requestData({ id: 1, param: "any" }).then((result) => this.setState({ param1: result }))
    requestData({ id: 4, param: "string" }).then((result) => this.setState({ param2: result }))
    requestData({ id: 4, param: 404 }).then((result) => this.setState({ param3: result }))
  }

  renderItem(header: string, param: Array<number>) {
    return (
      <div>
        <b>{header}</b>: <span style={{ color: "red" }}>{ param ? param.join(', ') : 'no data' }</span>
      </div>
    )
  }

  render() {
    const { compiler, framework } = this.props
    const { param1, param2, param3 } = this.state
    return (
      <div>
        <div>Home from {compiler} and {framework}!</div>
        {this.renderItem('id: 1, param: "any"', param1)}
        {this.renderItem('id: 4, param: "string', param2)}
        {this.renderItem('id: 4, param: 404', param3)}
      </div>
    )
  }
}
