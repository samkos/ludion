import React, { Component } from 'react';
import { connect} from 'react-redux';
// import { Player, BigPlayButton,
// ControlBar, ReplayControl, ForwardControl } from '../lib_ext/my-video-react/';

// import './video-react.css';

import { HOST, FILE_SERVER_PORT_FROM_CLIENT } from '../config/ports';
import { VERSION_PROD } from '../config/comm';

class Images extends Component {
	
	renderLink = (url_movie) => {
		if (this.props.version === VERSION_PROD) {
			return <></>
		}
		else {
			return (
				<React.Fragment>
				<br/>
				<a href={url_movie}> Link</a>
				</React.Fragment>
				)
			}
		}
		
		renderImages = () => {
			// console.log("TCL: Images -> renderImages -> this.props", this.props)
			console.log("TCL: Images -> RenderImages -> this.props.log", this.props.log)
			const { from_date } = this.props.row;
			var movie_original_path = this.props.log[0]
			if (movie_original_path) {
				var  movie_path;
                if (movie_original_path.indexOf("/project/")>-1
                         || movie_original_path.indexOf("/scratch/")>-1) {
                    movie_path = "ROOT" + movie_original_path.replace("/lustre/","/");
                }
                else if (movie_original_path.indexOf("/datawaha/")>-1) {
                    movie_path = "DATA" + movie_original_path.replace("/datawaha/","/");
                }
                
                var url_movie;
                if (FILE_SERVER_PORT_FROM_CLIENT) {
				    url_movie = `http://${HOST}:${FILE_SERVER_PORT_FROM_CLIENT}/${movie_path}`
                } else {
                    url_movie = `http://${HOST}/${movie_path}`
                }
				// console.log("TCL: Images -> renderImages -> url_movie", url_movie)
				// const scalew = (movie_original_path.indexOf("OIL/")>-1) ? "100%" : "65%";
				// const scaleh = (movie_original_path.indexOf("OIL/")>-1) ? "60%" : "65%";
				const scalew = "100%", scaleh = "100%"
				return (
                    <React.Fragment>
					  {/* <div style={{ width:scalew, height:scaleh, backgroundColor:"white"}}>
					    <Player
					      fluid={true}
					      aspectRatio="2:1"
					      autoPlay={true}
					      src={url_movie}
					      origin_date={from_date}
					      >
					      <BigPlayButton position="center" />
					      <ControlBar autoHide={true} origin_date={from_date}>
					        <ReplayControl seconds={5} order={3.1} />
					        <ForwardControl seconds={5} order={3.1} />
					      </ControlBar>
					    </Player>
					    { this.renderLink(url_movie) }
					  </div> */}
                    </React.Fragment>
					)
			}
			else {
                 // <div>
                      //   Movie &gt;&gt;{ movie_original_path }&lt;&lt; available at: /{ url_movie }/
                      // </div>
     				return <div>Movie &gt;&gt;{ movie_original_path }&lt;&lt; not available yet! <br/> was: /{ url_movie }/ </div>
			}
        }
		
		render() { 
			return (
				<div >
				{this.renderImages()}
				</div>
				);
		}
}

const mapStateToProps = ({comm, ui}) => ({
	log: comm.log , 
	version: comm.version,
	dimensions: ui.dimensions,
	row: ui.row
})

const mapDispatchToProps = {
}

export default connect(mapStateToProps, mapDispatchToProps)(Images)
