import React from 'react';
import { deltaDateFormated } from './dateManagement.js';

const  required = ['service', 'instance', 'status', 'step','endpoint','updatedAt'];
const all_columns = [ 'id','description','service','instance','user','machine','status',
'step','host','endpoint','jobid','createdAt','updatedAt','timestamp'];

const isRequired = (c) => required.some( x => x===c);

const colorizeCell = (value, other ) =>  {
  // console.log("other", other)
  var {property, rowData } = other;
  const { status } = rowData;
  // console.log('rowData,  :', rowData);
  var backgroundColor = (status === "WORKFLOW_COMPLETE" || status === "RUNNING"
                                       || status === "MITGCM_MAIN_DONE") ? "ui inverted green xxx segment" :
    ( (status.indexOf("FAILED")>0 || status.indexOf("STOPPED")>1) ? "ui inverted red xxx segment" : "ui inverted yellow xxx segment");
    

  if (property === "endpoint") {
    return ({
      children: (
        <div className={backgroundColor}>
          <a href={value} target='blank'>
          <button className="ui button large orange">connect</button>
          </a> 
        </div>
      )
    })    
  }
  else if (property === "updatedAt") {
    const delta  = deltaDateFormated(null, value) + " ago" ;
    return ({
      children: <div className={backgroundColor}>{ delta }</div>
    })
  }
  else if (property === "createdAt") {
    const delta  = deltaDateFormated(null, value) + " ago" ;
    return ({
      children: <div className={backgroundColor}>{ delta }</div>
    })
  }
  else {
    return ({
      children: <div className={backgroundColor}>{value }</div>
    })
  }
}

const defineColumns = (resize, sortableHeader) => {
    var column_definition = [];

    var nc=0;
    for (var c of all_columns ) {
      column_definition[nc] = {
        property: c,
        header: {
          label: c,
          formatters: [
            (name, extraParameters) => resize(
              <div style={{ display: 'inline' }}>
                <input
                  type="checkbox"
                  onClick={() => console.log('clicked')}
                  style={{ width: '20px' }}
                />
                {sortableHeader(name, extraParameters)}
              </div>,
              extraParameters
            )
          ],
          props: {
            style: {
              width: 200
            }
          },
        },
        visible: isRequired(c),
        cell: { transforms :[colorizeCell]}
      }


      nc = nc +1;
    }

    // console.log('col def:',column_definition);
    return column_definition;
}

export default defineColumns;