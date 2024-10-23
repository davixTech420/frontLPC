import React, { useState } from 'react'
import { 
  Box, 
  Typography, 
  Card, 
  CardContent, 
  Avatar, 
  List, 
  ListItem, 
  ListItemText, 
  Divider, 
  Chip,
  useMediaQuery,
  useTheme,
  IconButton,
  Grid,
  Button,
  TextField,
  Paper
} from '@mui/material'
import { 
  Person as PersonIcon, 
  Work as WorkIcon,
  Email as EmailIcon,
  Phone as PhoneIcon,
  ExpandMore as ExpandMoreIcon,
  ExpandLess as ExpandLessIcon,
  Edit as EditIcon
} from '@mui/icons-material'
import { motion, AnimatePresence } from 'framer-motion'

const EmployeeDashboard = ({ employee, tasks }) => {
  const [expandedTask, setExpandedTask] = useState(null)
  const [showProfileForm, setShowProfileForm] = useState(false)
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))

  const toggleTask = (taskId) => {
    setExpandedTask(expandedTask === taskId ? null : taskId)
  }

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.4 }
  }

  return (
    <Box sx={{ maxWidth: 1200, margin: 'auto', padding: 2, bgcolor: 'background.default', minHeight: '100vh' }}>
      <Typography variant="h4" gutterBottom component={motion.h1} {...fadeInUp} sx={{ mb: 4, color: 'primary.main' }}>
        Dashboard del Empleado
      </Typography>
      
      <Grid container spacing={3}>
        {/* Perfil del Empleado */}
        <Grid item xs={12} md={4}>
          <Card component={motion.div} {...fadeInUp} elevation={3}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2, justifyContent: 'space-between' }}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Avatar sx={{ width: 60, height: 60, mr: 2, bgcolor: 'secondary.main' }}>
                    <PersonIcon />
                  </Avatar>
                  <Typography variant="h6">{employee.name}</Typography>
                </Box>
                <IconButton onClick={() => setShowProfileForm(!showProfileForm)} color="primary">
                  <EditIcon />
                </IconButton>
              </Box>
              <List>
                {[
                  { icon: <WorkIcon color="action" />, primary: "Cargo", secondary: employee.position },
                  { icon: <EmailIcon color="action" />, primary: "Email", secondary: employee.email },
                  { icon: <PhoneIcon color="action" />, primary: "Teléfono", secondary: employee.phone }
                ].map((item, index) => (
                  <ListItem key={index} disableGutters>
                    <ListItemText 
                      primary={item.primary} 
                      secondary={item.secondary}
                      primaryTypographyProps={{ variant: 'body2', color: 'text.secondary' }}
                      secondaryTypographyProps={{ variant: 'body2' }}
                    />
                    {item.icon}
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>

        {/* Tareas Asignadas */}
        <Grid item xs={12} md={8}>
          <Card component={motion.div} {...fadeInUp} transition={{ delay: 0.2 }} elevation={3}>
            <CardContent>
              <Typography variant="h6" gutterBottom sx={{ color: 'primary.main' }}>
                Tareas Asignadas
              </Typography>
              <List>
                {tasks.map((task, index) => (
                  <Paper key={task.id} elevation={1} sx={{ mb: 2, overflow: 'hidden' }}>
                    <ListItem 
                      component={motion.div}
                      layout
                      onClick={() => toggleTask(task.id)}
                      sx={{ 
                        cursor: 'pointer', 
                        flexDirection: 'column', 
                        alignItems: 'flex-start',
                        bgcolor: index % 2 === 0 ? 'background.default' : 'background.paper'
                      }}
                    >
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%', mb: 1 }}>
                        <Typography variant="subtitle1">{task.title}</Typography>
                        <Box>
                          <Chip 
                            label={task.status} 
                            color={task.status === 'Completada' ? 'success' : 'warning'} 
                            size="small" 
                            sx={{ mr: 1 }}
                          />
                          <IconButton size="small">
                            {expandedTask === task.id ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                          </IconButton>
                        </Box>
                      </Box>
                      <AnimatePresence>
                        {expandedTask === task.id && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.2 }}
                            style={{ width: '100%' }}
                          >
                            <Typography variant="body2" color="text.secondary">
                              {task.description}
                            </Typography>
                            <Box sx={{ mt: 1 }}>
                              <Typography variant="body2" color="text.secondary">
                                Fecha límite: {task.dueDate}
                              </Typography>
                            </Box>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </ListItem>
                  </Paper>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Formulario de Perfil */}
      <AnimatePresence>
        {showProfileForm && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            transition={{ duration: 0.3 }}
          >
            <Paper elevation={3} sx={{ mt: 3, p: 3 }}>
              <Typography variant="h6" gutterBottom sx={{ color: 'primary.main' }}>
                Editar Perfil
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField fullWidth label="Nombre" defaultValue={employee.name} variant="outlined" />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField fullWidth label="Cargo" defaultValue={employee.position} variant="outlined" />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField fullWidth label="Email" defaultValue={employee.email} variant="outlined" />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField fullWidth label="Teléfono" defaultValue={employee.phone} variant="outlined" />
                </Grid>
                <Grid item xs={12}>
                  <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
                    <Button variant="contained" color="primary">
                      Guardar Cambios
                    </Button>
                  </Box>
                </Grid>
              </Grid>
            </Paper>
          </motion.div>
        )}
      </AnimatePresence>
    </Box>
  )
}

// Datos de ejemplo
const employeeData = {
  name: "Juan Pérez",
  position: "Desarrollador Frontend",
  email: "juan.perez@empresa.com",
  phone: "+1 234 567 8900"
}

const tasksData = [
  {
    id: 1,
    title: "Implementar nueva funcionalidad",
    description: "Desarrollar e implementar la nueva funcionalidad de chat en tiempo real para la aplicación web.",
    status: "En progreso",
    dueDate: "2023-06-30"
  },
  {
    id: 2,
    title: "Corregir bug en la página de inicio",
    description: "Hay un problema de renderizado en la página de inicio cuando se accede desde dispositivos móviles. Investigar y corregir el issue.",
    status: "Pendiente",
    dueDate: "2023-06-25"
  },
  {
    id: 3,
    title: "Actualizar documentación",
    description: "Actualizar la documentación del proyecto con las últimas cambios y nuevas funcionalidades implementadas.",
    status: "Completada",
    dueDate: "2023-06-20"
  },
  {
    id: 4,
    title: "Optimizar rendimiento",
    description: "Realizar una auditoría de rendimiento y optimizar los puntos críticos identificados para mejorar la velocidad de carga de la aplicación.",
    status: "Pendiente",
    dueDate: "2023-07-05"
  }
]

export default function App() {
  return (
    <Box sx={{ bgcolor: '#f5f5f5', minHeight: '100vh' }}>
      <EmployeeDashboard employee={employeeData} tasks={tasksData} />
    </Box>
  )
}