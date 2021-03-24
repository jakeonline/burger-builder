import React, { Component } from "react";
import Auxiliary from '../Auxiliary/Auxiliary';
import Modal from '../../components/UI/Modal/Modal';

const withErrorHandler = (WrappedComponent, axios) => {
    return class extends Component {

        state = {
            error: null
        }

        // constructor(props) {
        //     super(props);
            // console.log('[withErrorHandler.js] constructor');
        // }

        componentWillMount() {
        // componentDidMount() {
        // UNSAFE_componentWillMount() {
            // console.log('[withErrorHandler.js] UNSAFE_componentWillUpdate');
        // }

        // getSnapshotBeforeUpdate(prevProps, prevState) {
            // console.log('[withErrorHandler.js] getSnapshotBeforeUpdate');
               
            this.reqInterceptor = axios.interceptors.request.use(
                request => {
                    this.setState({ error: null });
                    return request;
                },
                requestError => {
                    // console.log(requestError);
                    this.setState({ error: requestError });
                    return Promise.reject(requestError);
                }
            );
            this.respInterceptor = axios.interceptors.response.use(
                response => response,
                responseError => {
                    // console.log(responseError);
                    this.setState({ error: responseError });
                    return Promise.reject(responseError);
                }
            );
            return true;
        }

        componentDidUpdate(prevProps,prevState,param) {
            // console.log(`[withErrorHandler] componentDidUpdate param: ${param}`);
        }

        componentWillUnmount() {
            // console.log('[withErrorHandler.js] componentWillUnmount');
            axios.interceptors.request.eject(this.reqInterceptor);
            axios.interceptors.response.eject(this.respInterceptor);
        }

        errorAcknowledged = () => {
            this.setState({ error: null });
        }

        render() {
            return (
                <Auxiliary>
                    <Modal show={this.state.error} modalClosed={this.errorAcknowledged}>
                        {this.state.error ? this.state.error.message : null}
                    </Modal>
                    <WrappedComponent {...this.props} />
                </Auxiliary>
            );
        }
    }

}

export default withErrorHandler;