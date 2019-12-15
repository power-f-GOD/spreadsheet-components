import React from 'react';
import ReactDataGrid from 'react-data-grid';
// import { Editors, Formatters } from 'react-data-grid-addons';
import { ProgressBar } from 'react-bootstrap';
import axios from 'axios';

import users from '../users-data.json';
import populateSheetWithDataFrom from '../utils/populateWithDataFrom';

export interface Column {
  key: string;
  name: string;
  editable?: boolean;
  formatter?: React.FC;
  editor?: any;
}

// const { DropDownEditor } = Editors;
// const { DropDownFormatter } = Formatters;
const ProgressBarFormatter: React.FC = (props: any) => {
  let value = props.value;
  return <ProgressBar variant='success' now={value} label={`${value}%`} />;
};

class DataGrid extends React.Component<{}, {}> {
  state = {
    rows: [],
    columns: [],
    columnNames: []
  };

  onGridRowsUpdated = ({ fromRow, toRow, updated }: any) => {
    this.setState((state: any) => {
      const rows = state.rows.slice();

      for (let i = fromRow; i <= toRow; i++)
        rows[i] = { ...rows[i], ...updated };

      return { rows };
    });
  };

  componentDidMount = () => {
    axios
      .get('https://jsonplaceholder.typicode.com/users')
      .then(response => {
        this.setState(populateSheetWithDataFrom(response, 'forDataGrid'));
      })
      .catch(_ =>
        this.setState(populateSheetWithDataFrom(users, 'forDataGrid'))
      );
  };

  render() {
    const sufficientWidth = this.state.columns.length * 80;

    return (
      <ReactDataGrid
        columns={this.state.columns}
        rowGetter={i => this.state.rows[i]}
        rowsCount={this.state.rows.length}
        onGridRowsUpdated={this.onGridRowsUpdated}
        enableCellSelect={true}
        minWidth={
          window.innerWidth > 600 ? window.innerWidth - 60 : sufficientWidth
        }
      />
    );
  }
}

export default DataGrid;
