/* import React, { useState, useEffect } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  TextField,
  Pagination,
} from '@mui/material';
import ToggleOffIcon from '@mui/icons-material/ToggleOff';
import ToggleOnIcon from '@mui/icons-material/ToggleOn';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

export default function TablaMejorada({ data, SrcImagen, activarRegistros, inactivarRegistros, eliminarRegistros, setOpenConfirmDialog, handleEdit }) {
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [filteredData, setFilteredData] = useState([]);
  const [filterValue, setFilterValue] = useState('');

  useEffect(() => {
    if (data && data.rows) {
      setFilteredData(data.rows);
    }
  }, [data]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(1);
  };

  const handleFilterChange = (event) => {
    const value = event.target.value.toLowerCase();
    setFilterValue(value);
    if (data && data.rows) {
      const filtered = data.rows.filter(row =>
        Object.values(row).some(val =>
          val && val.toString().toLowerCase().includes(value)
        )
      );
      setFilteredData(filtered);
      setPage(1);
    }
  };

  const indexOfLastRow = page * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = filteredData.slice(indexOfFirstRow, indexOfLastRow);

  if (!data || !data.columns || !data.rows) {
    return <div>No hay datos disponibles</div>;
  }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
        <FormControl variant="outlined" style={{ minWidth: 120 }}>
          <InputLabel id="rows-per-page-label">Filas por página</InputLabel>
          <Select
            labelId="rows-per-page-label"
            id="rows-per-page"
            value={rowsPerPage}
            onChange={handleChangeRowsPerPage}
            label="Filas por página"
          >
            <MenuItem value={5}>5</MenuItem>
            <MenuItem value={10}>10</MenuItem>
            <MenuItem value={15}>15</MenuItem>
            <MenuItem value={20}>20</MenuItem>
            <MenuItem value={25}>25</MenuItem>
          </Select>
        </FormControl>
        <TextField
          label="Filtrar"
          variant="outlined"
          value={filterValue}
          onChange={handleFilterChange}
        />
      </div>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: "100%" }} aria-label="simple table">
          <TableHead>
            <TableRow>
              {data.columns.map((column) => {
                if (
                  column !== "createdAt" &&
                  column !== "updatedAt" &&
                  column !== "password"
                ) {
                  return <TableCell key={column}>{column}</TableCell>;
                }
                return null;
              })}
              <TableCell>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {currentRows.map((row) => (
              <TableRow
                key={row.id}
                sx={{
                  "&:last-child td, &:last-child th": { border: 0 },
                }}
              >
                {data.columns.map((column) => {
                  if (
                    column !== "createdAt" &&
                    column !== "updatedAt" &&
                    column !== "password"
                  ) {
                    return (
                      <TableCell key={column}>
                        {column === "estado" ? (
                          row[column].toString().trim() === "false" ? (
                            <span style={{ color: "white", background: "red", borderRadius: 25, padding: 8 }}>
                              Inactivo
                            </span>
                          ) : row[column].toString().trim() === "true" ? (
                            <span style={{ color: "white", background: "green", borderRadius: 25, padding: 8 }}>
                              Activo
                            </span>
                          ) : (
                            row[column]
                          )
                        ) : typeof row[column] === "string" &&
                          row[column].startsWith("/images/") ? (
                          <img
                            width={100}
                            height={100}
                            src={SrcImagen(row[column])}
                            alt={column}
                          />
                        ) : (
                          row[column]
                        )}
                      </TableCell>
                    );
                  }
                  return null;
                })}
                <TableCell>
                  <Button onClick={() => row.estado === false ? activarRegistros(row.id) : inactivarRegistros(row.id)}>
                    {row.estado === false ? <ToggleOffIcon sx={{ color: "gray" }} /> : <ToggleOnIcon />}
                  </Button>
                  <Button onClick={() => eliminarRegistros(row.id)}>
                    <DeleteIcon color="error" />
                  </Button>
                  <Button onClick={() => handleEdit(row)}>
                    <EditIcon sx={{ color: "#07575B" }} />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Pagination
        count={Math.ceil(filteredData.length / rowsPerPage)}
        page={page}
        onChange={handleChangePage}
        color="primary"
        style={{ marginTop: '1rem', display: 'flex', justifyContent: 'center' }}
      />
    </div>
  );
} */
  import React, { useState, useEffect } from 'react';
  import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Button,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
    TextField,
    Pagination,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
  } from '@mui/material';
  import ToggleOffIcon from '@mui/icons-material/ToggleOff';
  import ToggleOnIcon from '@mui/icons-material/ToggleOn';
  import DeleteIcon from '@mui/icons-material/Delete';
  import EditIcon from '@mui/icons-material/Edit';
  
  export default function TablaMejorada({ data, SrcImagen, activarRegistros, inactivarRegistros, eliminarRegistros, handleEdit }) {
    const [page, setPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [filteredData, setFilteredData] = useState([]);
    const [filterValue, setFilterValue] = useState('');
    const [confirmDialog, setConfirmDialog] = useState({ isOpen: false, title: '', content: '', onConfirm: null });
  
    useEffect(() => {
      if (data && data.rows) {
        setFilteredData(data.rows);
      }
    }, [data]);
  
    const handleChangePage = (event, newPage) => {
      setPage(newPage);
    };
  
    const handleChangeRowsPerPage = (event) => {
      setRowsPerPage(parseInt(event.target.value, 10));
      setPage(1);
    };
  
    const handleFilterChange = (event) => {
      const value = event.target.value.toLowerCase();
      setFilterValue(value);
      if (data && data.rows) {
        const filtered = data.rows.filter(row =>
          Object.values(row).some(val =>
            val && val.toString().toLowerCase().includes(value)
          )
        );
        setFilteredData(filtered);
        setPage(1);
      }
    };
  
    const openConfirmDialog = (title, content, onConfirm) => {
      setConfirmDialog({ isOpen: true, title, content, onConfirm });
    };
  
    const closeConfirmDialog = () => {
      setConfirmDialog({ ...confirmDialog, isOpen: false });
    };
  
    const handleConfirmedAction = async (action, successMessage) => {
      try {
        await action();
        alert(successMessage);
        // Actualizar los datos después de una acción exitosa
        if (data && data.rows) {
          setFilteredData([...data.rows]);
        }
      } catch (error) {
        console.error('Error:', error);
        alert('Ocurrió un error. Por favor, inténtalo de nuevo.');
      }
      closeConfirmDialog();
    };
  
    const indexOfLastRow = page * rowsPerPage;
    const indexOfFirstRow = indexOfLastRow - rowsPerPage;
    const currentRows = filteredData.slice(indexOfFirstRow, indexOfLastRow);
  
    if (!data || !data.columns || !data.rows) {
      return <div>No hay datos disponibles</div>;
    }
  
    return (
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
          <FormControl variant="outlined" style={{ minWidth: 120 }}>
            <InputLabel id="rows-per-page-label">Filas por página</InputLabel>
            <Select
              labelId="rows-per-page-label"
              id="rows-per-page"
              value={rowsPerPage}
              onChange={handleChangeRowsPerPage}
              label="Filas por página"
            >
              <MenuItem value={5}>5</MenuItem>
              <MenuItem value={10}>10</MenuItem>
              <MenuItem value={15}>15</MenuItem>
              <MenuItem value={20}>20</MenuItem>
              <MenuItem value={25}>25</MenuItem>
            </Select>
          </FormControl>
          <TextField
            label="Filtrar"
            variant="outlined"
            value={filterValue}
            onChange={handleFilterChange}
          />
        </div>
  
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: "100%" }} aria-label="simple table">
            <TableHead>
              <TableRow>
                {data.columns.map((column) => {
                  if (
                    column !== "createdAt" &&
                    column !== "updatedAt" &&
                    column !== "password"
                  ) {
                    return <TableCell key={column}>{column}</TableCell>;
                  }
                  return null;
                })}
                <TableCell>Acciones</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {currentRows.map((row) => (
                <TableRow
                  key={row.id}
                  sx={{
                    "&:last-child td, &:last-child th": { border: 0 },
                  }}
                >
                  {data.columns.map((column) => {
                    if (
                      column !== "createdAt" &&
                      column !== "updatedAt" &&
                      column !== "password"
                    ) {
                      return (
                        <TableCell key={column}>
                          {column === "estado" ? (
                            row[column].toString().trim() === "false" ? (
                              <span style={{ color: "white", background: "red", borderRadius: 25, padding: 8 }}>
                                Inactivo
                              </span>
                            ) : row[column].toString().trim() === "true" ? (
                              <span style={{ color: "white", background: "green", borderRadius: 25, padding: 8 }}>
                                Activo
                              </span>
                            ) : (
                              row[column]
                            )
                          ) : typeof row[column] === "string" &&
                            row[column].startsWith("/images/") ? (
                            <img
                              width={100}
                              height={100}
                              src={SrcImagen(row[column])}
                              alt={column}
                            />
                          ) : (
                            row[column]
                          )}
                        </TableCell>
                      );
                    }
                    return null;
                  })}
                  <TableCell>
                    <Button
                      onClick={() =>
                        openConfirmDialog(
                          row.estado ? 'Inactivar Registro' : 'Activar Registro',
                          `¿Estás seguro de que quieres ${row.estado ? 'inactivar' : 'activar'} este registro?`,
                          () => handleConfirmedAction(
                            () => row.estado ? inactivarRegistros(row.id) : activarRegistros(row.id),
                            `Registro ${row.estado ? 'inactivado' : 'activado'} exitosamente`
                          )
                        )
                      }
                    >
                      {row.estado === false ? <ToggleOffIcon sx={{ color: "gray" }} /> : <ToggleOnIcon />}
                    </Button>
                    <Button
                      onClick={() =>
                        openConfirmDialog(
                          'Eliminar Registro',
                          '¿Estás seguro de que quieres eliminar este registro?',
                          () => handleConfirmedAction(
                            () => eliminarRegistros(row.id),
                            'Registro eliminado exitosamente'
                          )
                        )
                      }
                    >
                      <DeleteIcon color="error" />
                    </Button>
                    <Button onClick={() => handleEdit(row)}>
                      <EditIcon sx={{ color: "#07575B" }} />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
  
        <Pagination
          count={Math.ceil(filteredData.length / rowsPerPage)}
          page={page}
          onChange={handleChangePage}
          color="primary"
          style={{ marginTop: '1rem', display: 'flex', justifyContent: 'center' }}
        />
  
        <Dialog
          open={confirmDialog.isOpen}
          onClose={closeConfirmDialog}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{confirmDialog.title}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              {confirmDialog.content}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={closeConfirmDialog} color="primary">
              Cancelar
            </Button>
            <Button onClick={() => confirmDialog.onConfirm()} color="primary" autoFocus>
              Confirmar
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }