import React, { Component } from 'react';
import { TableHead, TableRow, TableCell } from '@material-ui/core';

class TableHeader extends Component {
  render() {
    return (
      <TableHead>
        <TableRow>
          {this.props.columns.map((column) => (
            <TableCell key={column.path || column.key}>
              {column.label}
            </TableCell>
          ))}
        </TableRow>
      </TableHead>
    );
  }
}

export default TableHeader;
