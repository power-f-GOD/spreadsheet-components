import { Column } from '../components/DataGrid';
import { GridElement } from '../components/DataSheet';

export default function populateSheetWithDataFrom(
  data: any,
  forSheetName: string
) {
  const columnNames: string[] = Object.keys(data[0]);

  switch (forSheetName) {
    case 'forDataGrid': {
      const columns: Column[] = [];
      const rows: any[] = [];

      columnNames.forEach(name => {
        const node: string = name.replace(/\W+/g, '').toLowerCase();
        const column: Column = {
          key: node,
          name,
          editable: true
        };

        // if (node === 'complete') {
        //   column.formatter = ProgressBarFormatter;
        //   // column.editable = false;
        // } else {
        //   column.editor = (
        //     <DropDownEditor options={['1', '2', '3', '4', '5', '6', '7']} />
        //   );
        // }

        columns.push(column);
      });

      data.slice().forEach((datum: any) => {
        const rowData: any = {};

        for (const key in datum) {
          if (typeof datum[key] == 'object')
            rowData[key] = JSON.stringify(datum[key]);
          else rowData[key] = datum[key];
        }

        rows.push(rowData);
      });

      return { columnNames, columns, rows };
    }

    case 'forDataSheet': {
      const colLetters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
      const grid: GridElement[][] = [];
      //   [
      //     { readOnly: true, value: '' },
      //     { value: 'A', readOnly: true },
      //     { value: 'B', readOnly: true },
      //     { value: 'C', readOnly: true },
      //     { value: 'D', readOnly: true }
      //   ],
      //   [
      //     { readOnly: true, value: 1 },
      //     { value: 1 },
      //     { value: 3 },
      //     { value: 3 },
      //     { value: 3 }
      //   ],
      //   [
      //     { readOnly: true, value: 2 },
      //     { value: 2 },
      //     { value: 4 },
      //     { value: 4 },
      //     { value: 4 }
      //   ],
      //   [
      //     { readOnly: true, value: 3 },
      //     { value: 1 },
      //     { value: 3 },
      //     { value: 3 },
      //     { value: 3 }
      //   ],
      //   [
      //     { readOnly: true, value: 4 },
      //     { value: 2 },
      //     { value: 4 },
      //     { value: 4 },
      //     { value: 4 }
      //   ]
      // ];

      const colLim = columnNames.length;
      const rowLim = data.length + 1;

      //fill column with letter identifiers
      for (let i = 0; i <= rowLim; i++) {
        grid.push([]);

        if (i == 0) grid[0].push({ value: '', readOnly: true });
        else grid[0].push({ value: colLetters[i - 1], readOnly: true });
      }
console.log('grid: ',grid);
      // fill row with number identifiers
      for (let i = 1; i <= rowLim; i++) {
        grid[i].push({ value: i, readOnly: true });

        if (i == 1)
          for (let key in data[i - 1]) grid[i].push({ value: key, isHeader: true });
        else
          for (let key in data[i - 2]) {
            let datum = data[i - 2][key];
            grid[i].push({ value: typeof datum == 'object' ? JSON.stringify(datum) : datum });
          }
            
      }

      return { grid };
    }
  }

  return {};
}
