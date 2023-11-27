"use client";
import {
  Box,
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  InputAdornment,
  InputLabel,
  MenuItem,
  Modal,
  Paper,
  Select,
  SelectChangeEvent,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { useRouter } from "next/navigation";

import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import React, { useEffect, useState } from "react";
import { Dayjs } from "dayjs";
import Navigation from "@/app/components/navigation2";
import Shortcut from "@/app/components/shortcut";
import { format } from "path";

interface Product {
  id: number;
  name: string;
}

interface Yields {
  id: number;
  productId: number;
  product: string;
  plantingTime: string;
  harvestTime: string;
  description: string;
  quantity: number;
}

export default function UpdatePertanian({
  params,
}: {
  params: { id: string };
}) {
  const router = useRouter();

  const [selectedProduct, setSelectedProduct] = useState("");
  const [products, setProducts] = useState<Product[]>([]);
  const [plantingTime, setPlantingTime] = useState("");
  const [selectedPlantingTime, setSelectedPlantingTime] = useState(
    new Date(plantingTime)
  );
  const [selectedHarvestTime, setSelectedHarvestTime] = useState("");
  const [harvestTime, setHarvestTime] = useState("");
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [yields, setYields] = useState<Yields[]>([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const handleDialogOpen = () => {
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  async function deleteYield() {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVICE_BASE}/yields/${params.id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );
      router.push(`/pertanian`);
    } catch (error) {
      console.log(error);
    }
  }

  async function getProducts() {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVICE_BASE}/yields/products`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.log(error);
    }
  }

  const handleChange = (event: SelectChangeEvent) => {
    setSelectedProduct(event.target.value as string);
  };

  async function getYields() {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVICE_BASE}/yields/${params.id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );
      const data = await response.json();
      setPlantingTime(data.plantingTime);
      setHarvestTime(data.harvestTime);
      setDescription(data.description);
      setQuantity(data.quantity);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getProducts();
    getYields();
  }, []);

  var isoDateplantsString = plantingTime;
  const isoDatePlats = new Date(isoDateplantsString);
  const options = { year: "numeric", month: "numeric", day: "numeric" };
  const formattedDatePlants = isoDatePlats.toLocaleDateString(
    "id-ID",
    options as Intl.DateTimeFormatOptions
  );

  console.log(formattedDatePlants);

  return (
    // <Box sx={{ display: "flex", alignItems: "center", flexDirection: "column" }}>
    // 	<Box
    // 		sx={{
    // 			bgcolor: "primary.main",
    // 			height: 45,
    // 			width: "100%",
    // 			alignItems: "center",
    // 			p: 0,
    // 			boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
    // 			zIndex: 2,
    // 			position: "fixed",
    // 		}}
    // 	>
    // 		<Button
    // 			variant="text"
    // 			startIcon={<ArrowBackIosNewIcon />}
    // 			sx={{ bgcolor: "primary.main", color: "white" }}
    // 			onClick={() => router.push("/home")}
    // 		>
    // 			Catat
    // 		</Button>
    // 	</Box>

    // 	<Box
    // 		sx={{
    // 			mt: 8,
    // 			width: 320,
    // 			display: "flex",
    // 			flexDirection: "column",
    // 			alignItems: "center",
    // 		}}
    // 	>
    // 		<Typography variant="h6" component="h6" sx={{ textAlign: "center", color: "primary.main" }}>
    // 			Ubah Data Pertanian
    // 		</Typography>

    // 		<Box
    // 			component="form"
    // 			sx={{
    // 				"& .MuiTextField-root": { width: 320, display: "flex", flexDirection: "column" },
    // 			}}
    // 			noValidate
    // 			autoComplete="off"
    // 		>
    // 			<TextField required sx={{ mt: 3 }} fullWidth label="Produk" id="produk" type="text" />

    // 			<LocalizationProvider dateAdapter={AdapterDayjs}>
    // 				<DemoContainer components={["DatePicker"]}>
    // 					<DatePicker
    // 						views={["year", "month", "day"]}
    // 						format="DD-MM-YYYY"
    // 						label="Tanggal Tanam"
    // 					/>
    // 				</DemoContainer>
    // 			</LocalizationProvider>

    // 			<LocalizationProvider dateAdapter={AdapterDayjs}>
    // 				<DemoContainer components={["DatePicker"]}>
    // 					<DatePicker
    // 						views={["year", "month", "day"]}
    // 						format="DD-MM-YYYY"
    // 						label="Tanggal Panen"
    // 					/>
    // 				</DemoContainer>
    // 			</LocalizationProvider>

    // 			<TextField sx={{ mt: 1 }} fullWidth label="Catatan" id="catatan" type="text" />

    // 			<TextField
    // 				label="Jumlah Panen (kosongkan jika belum  panen)"
    // 				id="jumlah panen"
    // 				sx={{ mt: 1 }}
    // 				InputProps={{
    // 					endAdornment: <InputAdornment position="end">kg</InputAdornment>,
    // 				}}
    // 			/>
    // 		</Box>

    // 		<Button fullWidth variant="contained" sx={{ mt: 2 }}>
    // 			Simpan
    // 		</Button>

    // 		<Button fullWidth color="error" variant="outlined" sx={{ mt: 1 }}>
    // 			Hapus Data
    // 		</Button>
    // 	</Box>

    // 	<Shortcut />
    // 	<Navigation />
    // </Box>

    <Stack
      display={"flex"}
      flexDirection={"column"}
      alignItems={"center"}
      sx={{ width: "100vw", height: "100vh" }}
    >
      {/* TOP BAR */}
      <Paper
        square
        sx={{
          bgcolor: "primary.main",

          width: "100vw",
          zIndex: 50,
        }}
      >
        <Container
          maxWidth={"sm"}
          sx={{ display: "flex", justifyContent: "space-between" }}
        >
          <Button
            onClick={() => router.push("/pertanian")}
            startIcon={<ArrowBackIosNewIcon />}
            variant="text"
            sx={{ color: "#ffffff" }}
          >
            Ubah Data Pertanian
          </Button>
        </Container>
      </Paper>

      {/* CONTENT */}
      <Typography
        variant="h6"
        component="h6"
        sx={{ textAlign: "center", color: "primary.main", my: 3 }}
      >
        Update Data Pertanian
      </Typography>
      <Box
        component="form"
        paddingX={4}
        paddingBottom={10}
        display={"flex"}
        flexDirection={"column"}
        justifyContent={"flex-start"}
        sx={{
          "& .MuiTextField-root": { width: "100%" },
        }}
        height={1}
        noValidate
        autoComplete="off"
        maxWidth={"sm"}
      >
        <FormControl sx={{ my: 1 }} fullWidth>
          <InputLabel id="produkSelected">Produk</InputLabel>
          <Select
            onChange={handleChange}
            value={selectedProduct}
            labelId="produkSelected"
            label="Produk"
          >
            {products?.map((product) => (
              <MenuItem key={product.id} value={product.name}>
                {product.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <Stack
          sx={{ my: 1 }}
          direction={"row"}
          justifyContent={"space-between"}
          gap={2}
        >
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker format="DD/MM/YYYY" label="Tanggal Tanam" />
          </LocalizationProvider>
          <Typography
            variant="h6"
            component="h6"
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            -
          </Typography>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker format="DD/MM/YYYY" label="Tanngal Panen" />
          </LocalizationProvider>
        </Stack>

        {/* <Typography>{formattedDatePlants}</Typography> */}

        <TextField
          sx={{ my: 1 }}
          fullWidth
          label="Catatan"
          id="catatan"
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        {/* <TextField
					sx={{ my: 1 }}
					label="Jumlah Panen (kosongkan jika belum  panen)"
					id="jumlah panen"
					value={quantity}
					onChange={(e) => setQuantity(Number(e.target.value))}
					inputProps={{
						endAdornment: <InputAdornment position="end">kg</InputAdornment>,
						inputMode: "numeric",
					}}
				/> */}

        <TextField
          sx={{ my: 1 }}
          label="Jumlah Panen (kosongkan jika belum  panen)"
          id="jumlah panen"
          value={quantity}
          InputProps={{
            endAdornment: <InputAdornment position="end">kg</InputAdornment>,
            inputMode: "numeric",
          }}
        />
        <Button
          type="submit"
          variant="contained"
          fullWidth
          sx={{ my: 1, marginTop: "auto" }}
        >
          Simpan
        </Button>
        <Button
          type="button"
          variant="outlined"
          color="error"
          fullWidth
          sx={{ my: 1 }}
          onClick={handleDialogOpen}
        >
          Hapus Data
        </Button>
      </Box>
      <Navigation />

      <Dialog
        open={dialogOpen}
        onClose={handleDialogClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Hapus data?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Apakah anda yakin ingin menghapus data ini? Data yang sudah dihapus
            tidak dapat dikembalikan.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose}>Batal</Button>
          <Button
            color="error"
            onClick={() => {
              deleteYield();
            }}
            autoFocus
          >
            Hapus
          </Button>
        </DialogActions>
      </Dialog>
    </Stack>
  );
}
