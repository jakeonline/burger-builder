import React, { Component } from 'react';
import Auxiliary from '../../../hoc/Auxiliary/Auxiliary';
import styles from './Modal.module.css'
import Backdrop from '../Backdrop/Backdrop'

class Modal extends Component {
    // UNSAFE_componentWillUpdate() {
        // console.log('[Modal.js] UNSAFE_componentWillUpdate');
    // }

    getSnapshotBeforeUpdate(prevProps, prevState) {
        // console.log('[Modal.js] getSnapshotBeforeUpdate');
        return null;
    }

    componentDidUpdate(prevProps,prevState,param) {
        // console.log(`[Modal.js] param: ${param}`);
    }

    shouldComponentUpdate(nextProps, nextState) {
        const shouldComponentUpdate = nextProps.show !== this.props.show || nextProps.children !== this.props.children;
        // console.log(`[Modal.js] shouldComponentUpdate: ${shouldComponentUpdate}`);
        return shouldComponentUpdate;

    }

    render() {

        return (
            <Auxiliary>
                <Backdrop show={this.props.show} clicked={this.props.modalClosed} />
                <div
                    className={styles.Modal}
                    style={{
                        transform: this.props.show ? 'translateY(0)' : 'translateY(-100vh)',
                        opacity: this.props.show ? '1' : '0'
                    }}
                >
                    {this.props.children}
                </div>
            </Auxiliary>
        );
    }
}

export default Modal;