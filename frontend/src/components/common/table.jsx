import React from 'react';
import TableHeader from './tableHeader';
import TableBody from './tableBody';
import { TableContainer, Table } from '@material-ui/core';

const TableCommon = ({ columns, data }) => {
  return (
    <TableContainer>
      <Table>
        <TableHeader columns={columns} />
        <TableBody columns={columns} data={data} />
      </Table>
    </TableContainer>
  );
};

export default TableCommon;
