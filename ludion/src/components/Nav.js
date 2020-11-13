
import React from 'react';
// import { Tab, Icon } from "semantic-ui-react";

import { connect} from 'react-redux';
import { askLog, askFileList, setLog } from '../actions/comm';
import { setRow } from '../actions/ui';
import { setQuery } from '../actions/table';
import { setOilForm, setOilRuns } from '../actions/oil';
import { VERSION_PROD } from '../config/comm'; 
import  Log  from './Log';

import history from '../lib/history';

import './Nav.css'

const all    = (x) => ( true);
const logs    = (x) => (x.type==="LOG");
const files   = (x) => (x.type==="FILES" && x.file_type!=="image" && x.file_type!=="movie" );
const images  = (x) => (x.file_type==="image");
const movie  = (x) => (x.file_type==="movie");

const possible_uis = [ movie, images, files, logs, all];

const textButtonLength = 25
;

class Nav extends React.Component {

    constructor(props) {
        super(props);
        this.state = { uis: null} ;
        this.first_target_url = null;
    }

    renderLog(uis = this.state.uis, ui_chosen_name) {
        // console.log("TCL: Nav -> renderLog -> ui_chosen_name", ui_chosen_name)
        // console.log("TCL: Nav -> renderLog -> uis", uis)
        this.first_target_url = null;

        var buttonColor;

        const format = (x) => ((x.length>textButtonLength && (x+" ").indexOf(' ')>(textButtonLength-1)) ? x.slice(0,textButtonLength)+"\n"+format(x.slice(textButtonLength,200)) : x );

        const filter_ui = (elements, element_filter,col) => {
            return elements.map( (x,i) => {
                const target_url = `/job/${target}/${from_date}/${attempt}/${x.name}`;
                if (element_filter(x)) {
                    if (!this.first_target_url) { this.first_target_url = target_url }

                    buttonColor = x.name===ui_chosen_name ? "yellow" : "grey";
                    
                    if (x.file_nb && !(this.props.version === VERSION_PROD)) {
                        return (
							<div className="child">
                                    <button key={col + x.name} className={classButton + " " + buttonColor}
                                    onClick={() => { 
                                        // console.log("TCL: Nav -> filter_ui -> target_url", target_url);
                                        history.push(target_url)
                                      } }>{format(x.name)}<br/>({x.file_nb})</button>
							</div>
									
                                )
                            } else {
                                return (
									<div className="child" key={col + x.name} >
                                      <button  key={col + x.name} className={classButton + " " + buttonColor}
											   onClick={() => { 
                                        // console.log("TCL: Nav -> filter_ui -> target_url", target_url);
                                        history.push(target_url)}
										}>{format(x.name)}</button>
									</div>
                                )
                            }
                }
                return <React.Fragment key={col + x.name} ></React.Fragment>;
            })
	}


    const {row, requestOngoing} = this.props;

    const classButton = (requestOngoing) ? "ui disabled button wb " : "ui button wb"; 
    const {target, from_date, attempt} = this.props.match.params;

	
	return (
        <>
		  <div className="choicecategories">
    		    <button className="navButton"  title="Movies" 
               		    onClick={() => this.setState({uis: movie})} >
                        <i className="film icon"/> 
                </button>
    		    <button className="navButton"  title="Images" 
               		    onClick={() => this.setState({uis: images})} >
                        <i className="image icon"/> 
                </button>
    		    <button className="navButton"  title="Produced files"
		            onClick={() => this.setState({uis:files})} >
                        <i className="file icon"/> 
                </button>
    		    <button className="navButton"  title="Log files" 
			    onClick={() => this.setState({uis: logs})} >
                        <i className="alternate file icon"/> 
                </button>
    		    <button className="navButton"  title="All files" 
			        onClick={() => this.setState({uis: all})} >
                    All
                </button>
			</div>
          <div className="choices"> 
		      { filter_ui(row.ui_elements, uis) }
		    </div>			   
		</>
        );
        
        
    }

    render = () => {


        if (!this.props.json) {
            return (
            <div> loading jobs... </div>
            );
        }

        const { target, from_date, attempt, ui_component } = this.props.match.params;
		// console.log("TCL: Nav -> render -> target, from_date, attempt, ui_component", target, from_date, attempt, ui_component)



        if (! this.props.row) {
            
            // console.log("TCL: Nav -> render -> this.props.json", this.props.json)
            const matching_row = this.props.json.filter( 
                r => ( (r.target    === target) && 
                ( !from_date || (from_date === "latest") || (r.from_date === from_date)) && 
                ( !attempt   || (attempt === "latest") || (r.attempt   === attempt))
                )
            );
            
            if (from_date && attempt && matching_row.length !== 1 ) {
                console.log('non matching to one job found', this.props.row);
                console.log('matching_row', matching_row);
                return (
                    <div> { matching_row.length>1 ? matching_row.length + " jobs found???? --> More than one Job qualfies!" : "Job does not exist anymore" } </div>
                )
            } else {
                console.log("taking first job available in ", matching_row)
            }

            this.props.setRow(matching_row[matching_row.length - 1]);

            return(
				<div> loading job... </div>
                )
                
        }
        
      // console.log("TCL: Nav -> render -> this.props.row", this.props.row)
		var uis = this.state.uis;
        var ui_chosen_name =  "xxxx"

        if (ui_component) {

            if (ui_component==="spill_new") {
                this.props.setOilForm();
            }
            else if (ui_component==="spill_runs") {
                this.props.setOilRuns();
            }
            else { // trying to match candidate 
                const candidate_ui_component = 
                    this.props.row.ui_elements.filter( (x) => (x.name === ui_component) );
                
                if (candidate_ui_component.length !== 1 ) {
                    console.log('ui_component has disappeared!!!')
                }

                const matching_ui_component = candidate_ui_component[0];
                // console.log('matching_ui_component', matching_ui_component)
                ui_chosen_name = matching_ui_component.name

                if (matching_ui_component.type === "FILES") {
                    const {file_mask,file_type} = matching_ui_component;
                    if (this.props.previousAskFileList !== file_mask) {
                        this.props.askFileList({file_mask,file_type});
                    }
                } else if (matching_ui_component.type === "LOG") {
                    const {log_file} = matching_ui_component;
                    if (this.props.previousAskLog !== log_file) {
                        this.props.askLog(log_file);
                        // console.log(`will ask askLog ${log_file} \n\tprevious_one is ${this.props.previousAskLog}`)
						// uis = logs;
                    }
                }
                else {
                    console.log("unknown action")
                } 

                uis = (!uis) ? possible_uis.filter( x => x(matching_ui_component))[0] : uis;

            }
        } 
        
        uis = uis ? uis : movie;

        const ui_choices = this.renderLog(uis? uis : all , ui_chosen_name)

        if (!ui_component)  { // no component chosen, go to first one
		  // console.log("TCL: Nav -> render -> this.first_ui_target_url", this.first_target_url)
          // console.log("TCL: Nav -> render -> row", this.props.row)

            const default_target = this.first_target_url ? this.first_target_url : 
                 ( this.props.row.ui_elements.length ? `/job/${target}/${from_date}/${attempt}/${this.props.row.ui_elements[0].name}` : null );
            if ( default_target) { history.push(default_target);}
            // this.props.setLog();
        }
        


        return (
            <div className='bigcontainer'>
              <div className='choicescontainer'>
                    { ui_choices }
                </div> 
              <div className='logcontainer'>
                { this.props.isLoading ? (
                    <div style={{display:"flex", width:"100vw", height:"70vh", flexDirection:"row", justifyContent:"space-between"}}>
                      <div class="ui segment"  >
                        <div class="ui active inverted dimmer" style={{display:"flex", width:"100vw", height:"70vh"}} >
                          <div class="ui large text loader">Loading</div>
                        </div>
                      </div>
                    </div>
                ) : <Log/> }
              </div> 
            </div>
        )
    }
}
 

const mapStateToProps = ({comm, ui}) => ({
    // dimensions         : ui.dimensions,
    // row                : ui.row,
    // json               : comm.json,
    // previousAskFileList: comm.previousAskFileList,
    // previousAskLog     : comm.previousAskLog,
    // requestOngoing     : comm.requestOngoing,
    // version            : comm.version,
    // isLoading          : comm.isLoading,
})
  
const mapDispatchToProps = {
    askLog, askFileList, setRow, setLog, setOilForm, setOilRuns, setQuery
//   setModal
}
  
export default connect(mapStateToProps, mapDispatchToProps)(Nav)
//!!!! WARNING  DON'T FORGET TO REMOVE exports in front of class Test!!! 
