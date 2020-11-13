import React, { Component } from 'react';
import { connect} from 'react-redux';
import { setLog } from '../actions/comm';
import { LOG_DISPLAY, REGULAR_LOG, DATA_FILES, 
	     MOVIE_FILE, OIL_FORM, OIL_RUNS } from '../actions/types';
import { VERSION_PROD } from '../config/comm';
// import OilForm from './OilForm';
// import TableForecast from './TableForecast'
import Images from './Images';

class Log extends Component {

	displayLog(logs) {
		const lines  = logs.split("\n");
		console.log('lines :', lines);
		if (lines.length) {
			console.log('logs :', logs);
			return logs.split("\n").map( x => {
				return (
					{x}
				)
			})
		}
	}

	renderLog() {
		// const voffset = ((this.props.dimensions.width<SCREEN_WIDE_ENOUGH) ? 100 : 130);
		// const rows = (this.props.dimensions.height-voffset);

		const { target, from_date, attempt } = this.props.row;
		const { tableHeight } = this.props.dimensions;

		switch (this.props.log_type) {
		case REGULAR_LOG:
		case DATA_FILES:
			// console.log('log', this.props.log)
			var log_filtered = this.props.log;
			if (this.props.version === VERSION_PROD && this.props.log_path.indexOf("status.log")>-1) {
				let logs_lines = log_filtered.split("\n").filter( x => x.indexOf(": UI ")===-1);
				log_filtered = logs_lines.join("\n");
			}
			
			const output = ( log_filtered.indexOf("loading")===0 ||
				             log_filtered.indexOf("No content yet...")===0
				           ) ? log_filtered :
				"==== BEGIN OF FILE ========\n" +
				log_filtered
				+ "\n====== END OF FILE ========";

				// setTimeout(() => { this.refs.textarea.focus(); this.refs.textarea.value +=''  }, 250)
			return (
				<>
				  <textarea id={LOG_DISPLAY} readOnly autoFocus
							style={{width:"100%", height:"92vh"}}
 							value={output} 
							wrap="off"
							ref="textarea">
				  </textarea>
				</>
			);

		case MOVIE_FILE:
			return (
				<div style={{width:"100%", height:tableHeight+"px"  }} >
				  <Images/>
    			</div>
			);
		default:
			return <div>Unknown log type {this.props.log_type} to show</div>
		}
	}

    render() {

		if (!this.props.log || !this.props.log_type) {
			return (
				<div>
			      <br/>
				  <br/>
				  <i className="ui icon hand point left outline"></i> choose an item to display
				</div>
			)
		}

		
		//console.log('computing log view');
		return (
			<div style={{padding:"2px"}}>
			  { this.renderLog() }
			</div>
		);
    }
}

const mapStateToProps = ({comm, oil, ui, table}) => ({
	// log         : comm.log , 
	// log_type    : comm.log_type,
	// version     : comm.version,
	// log_path       : comm.log_path,
	// oilRunStatus: oil.oilRunStatus,
	// dimensions  : ui.dimensions,
	// row         : ui.row,
})

const mapDispatchToProps = {
	setLog
}

export default connect(mapStateToProps, mapDispatchToProps)(Log)
