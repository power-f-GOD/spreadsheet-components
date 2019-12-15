// import _ from 'lodash';
import React from 'react';
import ReactDataSheet from '../../node_modules/react-datasheet';
import axios from 'axios';
import '../datasheet-styles-fix/index.css';

import users from '../users-data.json';
import populateSheetWithDataFrom from '../utils/populateWithDataFrom';

export interface GridElement extends ReactDataSheet.Cell<GridElement, number> {
  value: number | string | null;
  isHeader?: boolean;
}

interface DataState {
  grid: GridElement[][];
}

let cellRenderer: ReactDataSheet.CellRenderer<GridElement, number> = props => {
  const backgroundStyle =
    props.cell.value && props.cell.value < 0 ? { color: 'red' } : undefined;
  const classList = [];

  classList.push(props.cell.readOnly ? 'cell read-only' : 'cell default-width');
  classList.push(Number(props.cell.value) && !props.cell.readOnly ? 'align-right' : '');
  classList.push(props.selected && !props.cell.readOnly ? 'selected' : '');
  classList.push(props.cell.isHeader ? 'data-header' : '');

  return (
    <td
      style={backgroundStyle}
      onMouseDown={props.onMouseDown}
      onMouseOver={props.onMouseOver}
      onDoubleClick={props.onDoubleClick}
      className={classList.join(' ')}
      title={String(props.cell.value)}>
      {props.children}
    </td>
  );
};

class DataSheet extends React.Component {
  state: DataState = {
    grid: []
  };

  componentDidMount = () => {
    axios
      .get('https://jsonplaceholder.typicode.com/users')
      .then(response => {
        this.setState(populateSheetWithDataFrom(response, 'forDataSheet'));
      })
      .catch(_ =>
        this.setState(populateSheetWithDataFrom(users, 'forDataSheet'))
      );
  };

  render() {
    return (
      <div className='sheet-container'>
        <ReactDataSheet
          data={this.state.grid}
          valueRenderer={cell => cell.value}
          onContextMenu={(e, cell, i, j) =>
            cell.readOnly ? e.preventDefault() : null
          }
          onCellsChanged={changes => {
            const grid = this.state.grid.map(row => [...row]);
            changes.forEach(({ cell, row, col, value }) => {
              grid[row][col] = { ...grid[row][col], value };
            });
            this.setState({ grid });
          }}
          cellRenderer={cellRenderer}
        />
      </div>
    );
  }
}

export default DataSheet;

// import React from 'react';
// import ReactDataSheet from 'react-datasheet';
// import 'react-datasheet/lib/react-datasheet.css';

// export interface GridElement extends ReactDataSheet.Cell<GridElement, number> {
//   value: number | null;
// }

// interface DataState {
//   grid: GridElement[][];
// }

// //You can also strongly type all the Components or SFCs that you pass into ReactDataSheet.
// let cellRenderer: ReactDataSheet.CellRenderer<GridElement, number> = props => {
//   const backgroundStyle =
//     props.cell.value && props.cell.value < 0 ? { color: 'red' } : undefined;
//   return (
//     <td
//       style={backgroundStyle}
//       onMouseDown={props.onMouseDown}
//       onMouseOver={props.onMouseOver}
//       onDoubleClick={props.onDoubleClick}
//       className='cell'>
//       {props.children}
//     </td>
//   );
// };

// class DataSheet extends React.Component {
//   state: DataState = {
//     grid: [
//       [{ value: 1 }, { value: -3 }],
//       [{ value: -2 }, { value: 4 }]
//     ]
//   };

//   render() {
//     return (
//       <ReactDataSheet
//         data={this.state.grid}
//         valueRenderer={cell => cell.value}
//         onCellsChanged={changes => {
//           const grid = this.state.grid.map(row => [...row]);
//           changes.forEach(({ cell, row, col, value }) => {
//             grid[row][col] = { ...grid[row][col], value };
//           });
//           this.setState({ grid });
//         }}
//         cellRenderer={cellRenderer}
//       />
//     );
//   }
// }

// export default DataSheet;
