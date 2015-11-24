import Nori from '../../nori/Nori.js';
import NoriActions from '../../nori/action/ActionCreator';
import AppView from './AppView';
import AppStore from '../store/AppStore';
import ForOwn from '../../nudoru/util/ForOwn.js';
import ObjectUtils from '../../nudoru/core/ObjectUtils.js';
/**
 * Module for a dynamic application view for a route or a persistent view
 */

export default Nori.createComponent({

  mixins: [],

  getDefaultProps() {
    return {
      source       : null,
      sortHeader   : '',
      sortDirection: 1
    };
  },

  // TODO check for empty object
  _hasTableData() {
    return this.props.source || !ObjectUtils.isNull(this.props.source);
  },

  shouldDelegateEvents() {
    return this._hasTableData();
  },

  getDOMEvents() {
    return {
      'click thead': this._onTableHeaderPress.bind(this)
    }
  },

  _onTableHeaderPress(evt) {
    let tgt = evt.target;
    // Click on header (span) or icon (i), need to go to parent
    if(tgt.nodeName.toLowerCase() !== 'th') {
      tgt = tgt.parentNode;
    }
    this._changeSortProps(tgt.querySelector('span').innerHTML);
  },

  _changeSortProps(header) {
    let newHeader    = this.props.sortHeader,
        newDirection = 1,
        sourceCopy   = this.props.source;
    if (this.props.sortHeader === header) {
      newDirection = this.props.sortDirection ? 0 : 1;
    } else {
      newHeader = header;
    }
    sourceCopy.data = this._sortSource(sourceCopy.data, newHeader, newDirection);
    this.setProps({
      source       : sourceCopy,
      sortHeader   : newHeader,
      sortDirection: newDirection
    });
  },

  _sortSource(data, key, direction) {
    return data.sort((a, b) => {
      let aKey = a[key],
          bKey = b[key];

      if(!isNaN(parseFloat(aKey)) && !isNaN(parseFloat(bKey))) {
        // Keep numbers from being compared as strings
        aKey = parseFloat(aKey);
        bKey = parseFloat(bKey);
      } else if(!isNaN(Date.parse(aKey) && !isNaN(Date.parse(bKey)))) {
        // Treat dates as dates
        aKey = Date.parse(aKey);
        bKey = Date.parse(bKey);
      }

      if (direction) {
        if (aKey < bKey) return -1;
        if (aKey > bKey) return 1;
      } else {
        if (aKey < bKey) return 1;
        if (aKey > bKey) return -1;
      }
      return 0;
    });
  },

  // Return HTML
  render() {
    let tableSource = this.props.source,
        html;

    if (!this._hasTableData()) {
      return '<div></div>';
    }

    tableSource = this.props.source.data;

    html = `<div><table class="table table-rows-zebra table-cols-zebra">`;

    if (this.props.source.caption) {
      html += '<caption>' + this.props.source.caption + '</caption>';
    }

    html += `<thead class="th-sortable"><tr>`;

    ForOwn(tableSource[0], (val, key) => {
      if (this.props.sortHeader === key) {
        let icn = '<i class="fa ' + (this.props.sortDirection ? 'fa-chevron-down' : 'fa-chevron-up') + '"></i>';
        html += '<th class="th-sortable th-selected"><span>' + key + '</span>' + icn + '</th>';
      } else {
        html += '<th class="th-sortable"><span>' + key + '</span><i class="fa fa-circle-thin"></i></th>';
      }

    });

    html += `</tr></thead><tbody>`;

    tableSource.forEach(row => {
      html += '<tr>';

      ForOwn(row, function (val) {
        html += '<td>' + val + '</td>';
      });

      html += '</tr>';
    });

    html += `</tbody></table></div>`;

    return html;
  },

  //componentDidMount() {
  //  let el = this.dom();
  //},

  //componentWillUnmount() {
  //},

  //componentWillDispose() {
  //},

});

//_template() {
//  return null;
//
//  /*
//   Code below SHOULD be working but gives an error. Render pieces together HTML str
//   */
//
//  //return this.tmpl(`
//  //<p>{{ JSON.stringify(data[0]) }}</p>
//  //{{ _.forOwn(data, function(val,k  }}
//  //<p>{{JSON.stringify(val)}}</p>
//  //{{ }) }}
//  //`);
//  //return this.tmpl(`
//  //  <div>
//  //    <table class="table table-rows-zebra table-cols-zebra">
//  //      <thead>
//  //        <tr> {{ _.forEach(data[0], function(val, key) { }}<th scope="col">{{ key }}</th>{{ }); }} </tr>
//  //      </thead>
//  //      <tbody>
//  //        {{_.forEach(data, function(row) { }}
//  //        <tr>
//  //        {{ _.forEach(row, function(val, key) { }}
//  //        <td>{{ val }}</td>
//  //        {{ }); }}
//  //        </tr>
//  //        {{ }); }}
//  //      </tbody>
//  //    </table>
//  //  </div>
//  //`);
//},