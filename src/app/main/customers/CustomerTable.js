import * as React from 'react';
import PropTypes from 'prop-types';
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import DeleteIcon from '@mui/icons-material/Delete';
import FilterListIcon from '@mui/icons-material/FilterList';
import { visuallyHidden } from '@mui/utils';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import { Avatar } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import {
  bulkDeleteCustomers,
  deleteCustomer,
  getCustomers,
  openEditCustomerDialog,
  selectCustomers,
  selectEditCustomerDialogData,
  setEditCustomerDialog,
} from 'app/store/customerSlice';
import EditCustomer from './EditCustomer';

const headCells = [
  {
    id: 'name',
    numeric: false,
    disablePadding: false,
    label: 'Name',
  },
  {
    id: 'username',
    disablePadding: false,
    label: 'Username',
  },
  {
    id: 'email',
    numeric: false,
    disablePadding: false,
    label: 'Email',
  },
  {
    id: 'active',
    numeric: false,
    disablePadding: false,
    label: 'Last Active ',
  },
  {
    id: 'registered',
    numeric: false,
    disablePadding: false,
    label: 'Date Registered',
  },
  {
    id: 'orders',
    numeric: false,
    disablePadding: false,
    label: 'Orders',
  },
  {
    id: 'Spent',
    numeric: false,
    disablePadding: false,
    label: 'Spent',
  },
  {
    id: 'AOV',
    numeric: false,
    disablePadding: false,
    label: 'AOV',
  },
  {
    id: 'Region',
    numeric: false,
    disablePadding: false,
    label: 'Region',
  },
  {
    id: 'actions',
    numeric: false,
    disablePadding: false,
    label: 'Actions',
  },
];

export default function CustomerTable() {
  const dispatch = useDispatch();
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('image');
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const customers = useSelector(selectCustomers);
  const rows = customers?.results;
  const dataObject = useSelector(selectEditCustomerDialogData);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = rows.map((n) => n);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, row) => {
    const selectedIndex = selected.indexOf(row);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, row);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeDense = (event) => {
    setDense(event.target.checked);
  };

  const isSelected = (name) => selected.indexOf(name) !== -1;

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  function CustomerTableHead(props) {
    const {
      onSelectAllClick,
      order,
      orderBy,
      numSelected,
      rowCount,
      onRequestSort,
    } = props;
    const createSortHandler = (property) => (event) => {
      onRequestSort(event, property);
    };

    return (
      <TableHead>
        <TableRow>
          <TableCell padding='checkbox'>
            <Checkbox
              color='primary'
              indeterminate={numSelected > 0 && numSelected < rowCount}
              checked={rowCount > 0 && numSelected === rowCount}
              onChange={onSelectAllClick}
              inputProps={{
                'aria-label': 'select all desserts',
              }}
            />
          </TableCell>
          {headCells.map((headCell) => (
            <TableCell
              key={headCell.id}
              align={headCell.numeric ? 'right' : 'left'}
              padding={headCell.disablePadding ? 'none' : 'normal'}
              sortDirection={orderBy === headCell.id ? order : false}
              onClick={() =>
                selected.length > 1 && headCell.label === 'Actions'
                  ? dispatch(bulkDeleteCustomers(selected)).then(() =>
                      dispatch(getCustomers()).then(() => setSelected([]))
                    )
                  : undefined
              }
              sx={
                selected.length > 1 && headCell.label === 'Actions'
                  ? {
                      color: 'red',
                      cursor: 'pointer',
                      textDecoration: 'underline',
                      fontSize: '2rem',
                    }
                  : { color: 'black' }
              }
            >
              {selected.length > 1 && headCell.label === 'Actions'
                ? 'Remove Selected'
                : headCell.label}
            </TableCell>
          ))}
        </TableRow>
      </TableHead>
    );
  }

  CustomerTableHead.propTypes = {
    numSelected: PropTypes.number.isRequired,
    onRequestSort: PropTypes.func.isRequired,
    onSelectAllClick: PropTypes.func.isRequired,
    order: PropTypes.oneOf(['asc', 'desc']).isRequired,
    orderBy: PropTypes.string.isRequired,
    rowCount: PropTypes.number.isRequired,
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Paper sx={{ width: '100%', mb: 2 }}>
        <TableContainer>
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby='tableTitle'
            size={dense ? 'small' : 'medium'}
            options={{
              exportButton: true,
              exportAllData: true,
            }}
          >
            <CustomerTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={rows?.length}
            />
            <TableBody>
              {/* if you don't need to support IE11, you can replace the `stableSort` call with:
                 rows.sort(getComparator(order, orderBy)).slice() */}
              {rows
                ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const isItemSelected = isSelected(row);
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      hover
                      onClick={(event) => handleClick(event, row)}
                      role='checkbox'
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row.name}
                      selected={isItemSelected}
                    >
                      <TableCell padding='checkbox'>
                        <Checkbox
                          color='primary'
                          checked={isItemSelected}
                          inputProps={{
                            'aria-labelledby': labelId,
                          }}
                        />
                      </TableCell>
                      <TableCell
                        // component='th'
                        id={labelId}
                        scope='row'
                        // padding='none'
                        className='flex w-full items-center mx-8'
                      >
                        {' '}
                        <Avatar
                          // src={'assets/images/ecom/Photo.png'}
                          className='mr-8'
                        />
                        {row.name}
                      </TableCell>
                      <TableCell>{row.username}</TableCell>
                      <TableCell align='right'>{row.email}</TableCell>
                      <TableCell>{row.active}</TableCell>
                      <TableCell>{row.registered}</TableCell>
                      <TableCell>{row.orders}</TableCell>
                      <TableCell>{row.Spent}</TableCell>
                      <TableCell>{row.AOV}</TableCell>
                      <TableCell>{row.Region}</TableCell>
                      <TableCell>
                        <div className='flex'>
                          <FuseSvgIcon
                            className='text-48 cursor-pointer mr-4'
                            size={24}
                            color='action'
                            onClick={() => {
                              dispatch(setEditCustomerDialog(row));
                              dispatch(openEditCustomerDialog());
                            }}
                          >
                            feather:edit-2
                          </FuseSvgIcon>
                          <FuseSvgIcon
                            className='text-48 cursor-pointer'
                            size={24}
                            color='action'
                            onClick={() =>
                              dispatch(deleteCustomer(row._id)).then(() =>
                                dispatch(getCustomers())
                              )
                            }
                          >
                            material-twotone:delete
                          </FuseSvgIcon>
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: (dense ? 33 : 53) * emptyRows,
                  }}
                >
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component='div'
          count={rows?.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
        <EditCustomer dataObject={dataObject} key={selected} />
      </Paper>
    </Box>
  );
}
