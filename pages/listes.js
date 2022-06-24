import Header from "../components/Header"
import PropTypes from "prop-types"
import { useEffect, useState, useCallback } from "react"
import { write, utils } from "xlsx"
import SheetsModal from "../components/SheetsModals"
import { useRouter } from "next/router"
import { useTheme } from "@mui/material/styles"

import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarExportContainer,
  GridCsvExportMenuItem,
  useGridApiContext,
  gridFilteredSortedRowIdsSelector,
  gridVisibleColumnFieldsSelector,
  GridPrintExportMenuItem,
} from "@mui/x-data-grid"
import {
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Box,
  Badge,
  IconButton,
  Typography,
} from "@mui/material"
import { blue } from "@mui/material/colors"
import { LinearProgress, MenuItem } from "@mui/material"
import { Movie } from "@mui/icons-material"
import LiveTvIcon from "@mui/icons-material/LiveTv"
import ListAltIcon from "@mui/icons-material/ListAlt"
import { Download as DownloadIcon } from "@mui/icons-material"
import quotes from "../assets/quotes"
import useMediaQuery from "@mui/material/useMediaQuery"
const columns = [
  {
    field: "name",
    headerName: "Characters",
    minWidth: 300,
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
        <ListItemText
          primary={params.row.name}
          secondary={params.row.from}
          sx={{ cursor: "pointer" }}
        />
      </ListItem>
    ),
  },
  {
    field: "text",
    headerName: "Message",
    flex: 10,
    minWidth: 100,
    renderCell: (params) => (
      <Typography variant="body2">{params.row.text}</Typography>
    ),
  },
  {
    field: "films",
    headerName: "Films",
    width: 80,
    renderCell: (params) => (
      <Badge badgeContent={params.row.films} color="primary">
        <Movie />
      </Badge>
    ),
  },
  {
    field: "tv",
    headerName: "TvShows",
    renderCell: (params) => (
      <Badge badgeContent={params.row.tv} color="secondary">
        <LiveTvIcon />
      </Badge>
    ),
  },
  {
    field: "actions",
    headerName: "Actions",
    width: 100,

    renderCell: (params) => (
      <>
        <IconButton onClick={params.row.showTableModal(params.row)}>
          <ListAltIcon color="primary" />
        </IconButton>
        <IconButton onClick={params.row.downloadRow(params.row)}>
          <DownloadIcon color="success" />
        </IconButton>
      </>
    ),
  },
]

const getArrayOfData = (apiRef) => {
  const filteredSortedRowIds = gridFilteredSortedRowIdsSelector(apiRef)
  const visibleColumnsField = gridVisibleColumnFieldsSelector(apiRef)
  const data = filteredSortedRowIds.map((id) => {
    const row = {}
    visibleColumnsField.forEach((field) => {
      row[field] = apiRef.current.getCellParams(id, field).value
    })
    return row
  })

  return data
}

const exportBlob = (blob, filename) => {
  const url = URL.createObjectURL(blob)
  const a = document.createElement("a")
  a.href = url
  a.download = filename
  a.click()

  setTimeout(() => {
    URL.revokeObjectURL(url)
  })
}

const JsonExportMenuItem = (props) => {
  const apiRef = useGridApiContext()
  const { hideMenu } = props
  return (
    <MenuItem
      onClick={() => {
        const listOfdata = getArrayOfData(apiRef)
        const workSave = utils.json_to_sheet(listOfdata)
        const workBook = { Sheets: { data: workSave }, SheetNames: ["data"] }
        const excelBuffer = write(workBook, { bookType: "xlsx", type: "array" })
        const data = new Blob([excelBuffer], {
          type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8",
        })
        exportBlob(data, `Economie.xlsx`)
        hideMenu?.()
      }}
    >
      Download as XLSX
    </MenuItem>
  )
}

JsonExportMenuItem.propTypes = {
  hideMenu: PropTypes.func,
}

const csvOptions = { delimiter: ";" }

const CustomExportButton = (props) => (
  <GridToolbarExportContainer {...props}>
    <JsonExportMenuItem />
    <GridCsvExportMenuItem options={csvOptions} />
    <GridPrintExportMenuItem />
  </GridToolbarExportContainer>
)

const CustomToolbar = (props) => (
  <GridToolbarContainer {...props}>
    <CustomExportButton />
  </GridToolbarContainer>
)

function Listes() {
  const Router = useRouter()
  const theme = useTheme()
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"))
  const [characters, setCharacters] = useState([])
  const [datagridIsLoading, setDatagridIsLoading] = useState(true)
  const [watchedDisney, setWatchedDiesney] = useState({
    name: null,
    id: null,
    message: null,
  })
  const [page, setPage] = useState(0)
  const [pageSize, setPageSize] = useState(50)
  const [open, setOpen] = useState(false)
  const showTableModal = useCallback(
    (disney) => () => {
      Router.push(
        {
          pathname: "/listes",
          query: {
            title: disney.name.replace(" ", "+").replace(".", ""),
            disney_id: disney.id,
          },
        },
        undefined,
        { shallow: true }
      )
      setWatchedDiesney(disney)
      setOpen(true)
    },
    [Router]
  )

  const downloadRow = (rowId) => () => {
    console.log(rowId)
  }
  useEffect(() => {
    const disneyRequest = async () => {
      const disneyCharactereList = await fetch(
        `http://localhost:8000/listes?pagination=${page + 1}`
      )
      if (disneyRequest.ok) {
        setDatagridIsLoading(false)
      } else {
        setDatagridIsLoading(false)
      }
      const response = await disneyCharactereList.json()
      const res = response.map((disney, index) => {
        let idx = page * 50 + index
        if (idx > 325) {
          idx -= 325
        }
        return {
          id: disney._id,
          imageUrl: disney.imageUrl,
          name: disney.name,
          films: disney.films.length,
          short: disney.shortFilms.length,
          tv: disney.tvShows.length,
          from: quotes[idx].from,
          text: quotes[idx].text,
          showTableModal,
          downloadRow,
        }
      })

      setCharacters(res)
    }
    disneyRequest()
  }, [page, showTableModal])

  const handlePageChange = (newPage) => {
    setDatagridIsLoading(true)
    setPage(newPage)
  }
  return (
    <>
      <Header />
      <Box width="90%" height="90vh" margin="auto">
        <DataGrid
          onCellDoubleClick={(params, event) => {
            if (!event.ctrlKey) {
              event.defaultMuiPrevented = true
            }
            showTableModal(params)
          }}
          page={page}
          display="flex"
          components={{
            LoadingOverlay: LinearProgress,
            Toolbar: CustomToolbar,
          }}
          loading={datagridIsLoading}
          sx={{ mt: 2 }}
          rows={characters}
          columns={columns}
          pageSize={pageSize}
          onPageSizeChange={(pageSize) => {
            setPageSize(pageSize)
          }}
          onPageChange={handlePageChange}
          headerHeight={40}
          rowsPerPageOptions={[50]}
          disableSelectionOnClick
          paginationMode="server"
          rowCount={1000}
          getRowHeight={() => (fullScreen ? 60 : "auto")}
          pagination
        />
      </Box>
      <SheetsModal
        open={open}
        resources={watchedDisney}
        handleClose={() => {
          Router.push(
            {
              pathname: "/listes",
            },
            undefined,
            { shallow: true }
          )
          setOpen(false)
        }}
      />
    </>
  )
}

export default Listes
