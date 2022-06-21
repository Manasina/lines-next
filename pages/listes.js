import { Box, Badge, IconButton } from "@mui/material"
import Header from "../components/Header"
import { useEffect, useState } from "react"
import { DataGrid, GridColDef, GridRenderCellParams } from "@mui/x-data-grid"
import { ListItem, ListItemText, ListItemAvatar, Avatar } from "@mui/material"
import { Devices as DevicesIcon } from "@mui/icons-material"
import { blue } from "@mui/material/colors"
import LinearProgress from "@mui/material"
import { Movie } from "@mui/icons-material"
import LiveTvIcon from "@mui/icons-material/LiveTv"

const columns = [
  {
    field: "Characters",
    headerName: "Characters",
    minWidth: 500,
    maxWidth: 600,
    editable: false,
    renderCell: (params) => (
      <ListItem>
        <ListItemAvatar>
          <Avatar
            alt={params.row.name}
            src={params.row.imageUrl}
            sx={{
              width: 35,
              height: 35,
              bgcolor: blue[100],
              color: blue[600],
            }}
          ></Avatar>
        </ListItemAvatar>
        <ListItemText primary={params.row.name} secondary={"Disney"} />
      </ListItem>
    ),
  },
  {
    field: "films",
    headerName: "Films",
    width: 80,
    renderCell: (params) => (
      <Badge badgeContent={params.films}>
        <Movie />
      </Badge>
    ),
  },
  {
    field: "tvshows",
    headerName: "TvShows",
    width: 80,
    renderCell: (params) => (
      <Badge badgeContent={params.tv}>
        <LiveTvIcon />
      </Badge>
    ),
  },
  {
    field: "actions",
    headerName: "Actions",
    width: 80,
    alignSelf: "end",
    renderCell: (params) => (
      <>
        <IconButton></IconButton>
      </>
    ),
  },
]

function Listes() {
  const [characters, setCharacters] = useState([])
  const [datagridIsLoading, setDatagridIsLoading] = useState(true)
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(20)

  useEffect(() => {
    if (characters.length !== 0 && page === 1) {
      return
    }
    const disneyRequest = async () => {
      const disneyCharactereList = await fetch(
        `http://localhost:8000/listes?pagination=${page}`
      )
      const response = await disneyCharactereList.json()
      const res = response.map((disney) => {
        return {
          id: disney._id,
          imageUrl: disney.imageUrl,
          name: disney.name,
          films: disney.films.length,
          short: disney.shortFilms.length,
          tv: disney.tvShows.length,
        }
      })

      setCharacters(res)
      setDatagridIsLoading(false)
    }
    disneyRequest()
  }, [page, characters])
  return (
    <>
      <Header />
      <Box width="90%" height="90vh" margin="auto">
        <DataGrid
          components={{
            LoadingOverlay: LinearProgress,
          }}
          loading={datagridIsLoading}
          sx={{ mt: 2 }}
          rows={characters}
          columns={columns}
          pageSize={pageSize}
          onPageSizeChange={(pageSize) => {
            setPageSize(pageSize)
          }}
          headerHeight={40}
          rowsPerPageOptions={[10, 20, 50, 100]}
          disableSelectionOnClick
        />
      </Box>
    </>
  )
}

export default Listes
