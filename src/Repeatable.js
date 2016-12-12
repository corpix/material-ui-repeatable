import React, { Component } from 'react';

import { map, filter } from 'lodash';

import FlatButton from 'material-ui/FlatButton';
import FontIcon from 'material-ui/FontIcon';

import awesome from 'font-awesome/css/font-awesome.css';
import styles from './Repeatable.css';

const plus = <FontIcon className={`${awesome.fa} ${awesome['fa-plus']}`}/>;
const minus = <FontIcon className={`${awesome.fa} ${awesome['fa-minus']}`}/>;


export default class Repeatable extends Component {

    static defaultProps = {
        initialCopies: 1,
        requiredCopies: 1,
        childrenRenderer: (index) => [],
        onAdd: (index) => undefined,
        onRemove: (index) => undefined,
        style: {}
    }

    constructor() {
        super();
        this.counter = 0;
        this.state = {
            items: {}
        };
    }

    componentDidMount() {
        this.createItems(this.props.initialCopies);
    }

    renderItems() {
        return map(
            this.state.items,
            (_, index) => (
                <div key={`repeatable-item-${index}`} className={styles.Row}>
                  <div className={styles.Item}>
                    {this.props.childrenRenderer(index)}
                  </div>
                  <div
                    className={styles.ItemControls}
                    style={{display: index < this.props.requiredCopies ? 'none' : ''}}>
                    <FlatButton icon={minus} onClick={this.removeItem(index)}/>
                  </div>
                </div>
            )
        );
    }

    removeItem = (index) => () => {
        let items = { ...this.state.items };
        delete items[index];
        this.setState({ items });
        this.props.onRemove(index);
    }

    createItems = (num = 1) => {
        let items = { ...this.state.items };
        for (let index = 0; index < num; index++) {
            let key = this.counter++;
            items[key] = true;
        }
        this.setState({ items });
        return this.counter;
    }

    addItem = () => this.props.onAdd(this.createItems(1))

    render() {
        return (
            <div style={this.props.style}>
              {this.renderItems()}
              <div className={styles.Controls}>
                <FlatButton icon={plus} onClick={this.addItem}/>
              </div>
            </div>
        );
    }

}
