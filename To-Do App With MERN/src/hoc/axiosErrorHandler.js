import React, {Component} from 'react'
import Aux from './Aux'

const axiosErrorHandler = (WrappedComponent, axios) => {
    return class extends Component{
        state = {
            error: null
        }
        componentDidMount() {
            axios.interceptors.request.use(req => {
                this.setState({error : null})
            })
            axios.interceptors.response.use(null, error => {
                this.setState({error:error})
            })
        }

        render () { 
            let errorComp
            if(this.state.error){
                errorComp = <div>Something went wrong! Error : {this.state.error.message}</div>
            }
            
            return (
                <Aux>
                    {errorComp}
                    <WrappedComponent {...this.props} />
                </Aux>
            )
        }
    }
}

export default axiosErrorHandler