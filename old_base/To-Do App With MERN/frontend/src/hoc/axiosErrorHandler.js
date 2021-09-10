import React, {Component} from 'react'
import Aux from './Aux'

const axiosErrorHandler = (WrappedComponent, axios) => {
    return class extends Component{
        state = {
            error: null
        }
        componentDidMount() {
            this.reqInt = axios.interceptors.request.use(req => {
                this.setState({error : null})
                return req
            })
            this.resInt =axios.interceptors.response.use(null, error => {
                this.setState({error:error})   
            })
            console.log("axiosErrorHandler")
        }

        // componentWillUnmount() {
        //     axios.interceptors.request.eject(this.reqInt)
        //     axios.interceptors.reponse.eject(this.resInt)
        // }

        render () { 
            let errorComp= null
            if(this.state.error){
                errorComp = <div>Something went wrong while connecting to the backend server! We're working on it. <h6>Error : {this.state.error.message}</h6></div>
            }
            
            return (
                <Aux>
                    <WrappedComponent {...this.props} err={errorComp}/>
                </Aux>
            )
        }
    }
}

export default axiosErrorHandler