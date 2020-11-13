import React, { Component } from 'react'
import { connect} from 'react-redux';
import { setServices } from '../actions/services';
import { listServices } from '../graphql/queries';

import { onCreateService, onDeleteService, onUpdateService } from '../graphql/subscriptions'
import {Auth} from 'aws-amplify'
import { API, graphqlOperation } from 'aws-amplify'
import AllFeaturesTable from './Table';

class DisplayServices extends Component {

    state = {
        ownerId:"",
        ownerUsername:"",
        errorMessage: "",
        serviceLikedBy: [],
        isHovering: false,
        services: []
    }

    componentDidMount = async () => {
        this.getServices()

        await Auth.currentUserInfo()
            .then(user => {
                this.setState(
                    {
                        ownerId: user.attributes.sub,
                        ownerUsername: user.username,
                    }
                )
            })


        this.createServiceListener = API.graphql(graphqlOperation(onCreateService))
             .subscribe({
                 next: serviceData => {
                     const newService = serviceData.value.data.onCreateService
		     console.log("new serviceData",serviceData);
		     console.log("new entry created",newService);

                      const prevServices = this.state.services.filter( service => service.id !== newService.id)

                      const updatedServices = [newService, ...prevServices]

                      this.setState({ services: updatedServices})
                 }
             })

        this.deleteServiceListener = API.graphql(graphqlOperation(onDeleteService))
                .subscribe({
                     next: serviceData => {
                           
                        const deletedService = serviceData.value.data.onDeleteService
                        const updatedServices = this.state.services.filter(service => service.id !== deletedService.id)
                        this.setState({services: updatedServices})
                     }
                })

        this.updateServiceListener = API.graphql(graphqlOperation(onUpdateService))
                .subscribe({
                     next: serviceData => {
                          const { services } = this.state
                          const updateService = serviceData.value.data.onUpdateService
                          const index = services.findIndex(service => service.id === updateService.id) //had forgotten to say updateService.id!
                          const updateServices = [
                              ...services.slice(0, index),
                             updateService,
                             ...services.slice(index + 1)
                            ]

                            this.setState({ services: updateServices})

                     }
                })

    }


    componentWillUnmount() {
        this.createServiceListener.unsubscribe()
        this.deleteServiceListener.unsubscribe()
        this.updateServiceListener.unsubscribe()
    }
 
    getServices = async () => {
         const result = await API.graphql(graphqlOperation(listServices))

         this.setState({ services: result.data.listServices.items})
         // console.log("All Services: ", JSON.stringify(result.data.listServices.items))
         // console.log("All Services: ", result.data.listServices.items)
    }


    renderAll() {
        const { services } = this.state;
         
        // let loggedInUser = this.state.ownerId

        this.props.setServices(services);

        const myServices = services.filter( service => service.user === this.state.ownerUsername)

        return (
            <div>
                <React.Fragment>
                    <AllFeaturesTable services={myServices} />
                </React.Fragment>
            </div>
        )
    }
    
    render() {
	return (
		<div>
		List of Current services for user {this.state.ownerUsername} .
		<br/>
     	<br/>
		{ this.renderAll()}
		</div>
	)
    }
}


const mapStateToProps = ({service}) => ({
 })
 
 const mapDispatchToProps = {
     setServices
 }
 
 export default connect(mapStateToProps, mapDispatchToProps)(DisplayServices);
 