import React, { Component } from 'react';
import _ from 'lodash';
import { TableBody, TableRow, TableCell } from '@material-ui/core';

class TableBodyLayout extends Component {
  renderCell = (item, column) => {
    if (column.content) return column.content(item);

    return _.get(item, column.path);
  };

  createKey = (item, column) => {
    return item._id + (column.path || column.key);
  };

  render() {
    const { data, columns } = this.props;

    return (
      <TableBody>
        {data.map((item) => (
          <TableRow key={item._id}>
            {columns.map((column) => (
              <TableCell key={this.createKey(item, column)}>
                {this.renderCell(item, column)}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    );
  }
}

export default TableBodyLayout;
